import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Observable } from 'rxjs';
import { IInputDto } from './entitites/input.dto';
import { IProductDto } from './entitites/product.dto';
import { ITableHeader, ProductHeader } from './interfaces/table-header.interface';
import { ITableConfig } from './interfaces/table.config';

import { ICellDefinition, IInputProductTable, CellType, TableMode } from './interfaces/table-data.interface';
import { ICellDto } from './entitites/cell.dto';
import { ICellCompareDto } from './entitites/cell-compare.dto';
import { InputTableService, TableSpreedData } from './services/input-table.service';
import { Cell, CellSelection } from './interfaces/cell-selection.interface';

export class ProductDataSource extends DataSource<IInputProductTable> {
    tableHeader: {
        stickyColumns: string[];
        dynamicColumns?: { name: string; text: string }[];
        displayColumns?: string[];
        categoriesColumns?: ITableHeader[];
        displayCategoriesColumns?: string[];
        expandCategories: boolean;
        expandInputs: boolean;
    };

    private lessonsSubject = new BehaviorSubject<IInputProductTable[]>([]);
    public _tableHeader: ITableHeader[] = [];

    private _runTypeId: number;
    private _allInputs: IInputDto[] = [];
    private _allProducts: IProductDto[] = [];
    private _allCells: ICellDto[] = [];
    private _allCompareCells: ICellCompareDto[] = [];
    private _allData: IInputProductTable[] = [];
    private _filterInputs: string = '';
    private _mode: TableMode;

    // Store the Input Row where we select Cells.
    public _selectedInput: { inputId: number; productIds: number[] } = { inputId: 0, productIds: [] };
    private _rowShow: number = 0;

    private config: ITableConfig;
    private displayHideCategories: number[] = [];

    constructor(
        runTypeId: number,
        mode: TableMode,
        inputs: IInputDto[],
        products: IProductDto[],
        cells: ICellDto[],
        compareCells: ICellCompareDto[],
        config: ITableConfig,
        public inputTableService: InputTableService
    ) {
        super();

        this._runTypeId = runTypeId;
        this._allInputs = inputs;
        this._allProducts = products;
        this._allCells = cells;
        this._allCompareCells = compareCells;
        this._mode = mode;
        this.config = config;

        this.tableHeader = {
            stickyColumns: this.config.stickyColumns,
            expandCategories: false,
            expandInputs: false
        };

        this._rowShow = 20;
    }

    connect(): Observable<readonly IInputProductTable[]> {
        return this.lessonsSubject.asObservable();
    }

    disconnect(): void {
        this.lessonsSubject.complete();
    }

    load(): void {
        this.loadHeader();
        this.loadData();
    }

    filter(val: string): void {
        this._filterInputs = val;
        this.searchData();
    }

    onTableScroll(e: any): void {
        const tableViewHeight = e.target.offsetHeight; // viewport: ~500px
        const tableScrollHeight = e.target.scrollHeight; // length of all table
        const scrollLocation = e.target.scrollTop; // how far user scrolled

        // If the user has scrolled within 200px of the bottom, add more data
        const buffer = 300;
        const limit = tableScrollHeight - tableViewHeight - buffer;
        if (scrollLocation > limit) {
            this._rowShow += 20;
            this.searchData();
        }
    }

    toggleCategory(id: number, type: string): void {
        if (type === 'header') {
            this.toggleHeader(id);
        } else if (type === 'column') {
            this.toggleColumn(id);
        }
    }

    expand(type: string): void {
        if (type === 'categories') {
            this.expandCategories();
        } else if (type === 'inputs') {
            this.expandInputs();
        }
    }

    onClickCell(inputId: number, productId: number): void {
        const item = this._allData.find((x) => x.id === inputId);
        if (!item) {
            return;
        }

        if (this._mode === TableMode.Edit) {
            this.onSelectCell(item, productId);
        }
    }

    onClickCellIcon(event: any, type: string): void {
        event.stopPropagation();

        const inputId: number = +event.target.attributes.inputId.value;
        const productId: number = +event.target.attributes.productId.value;

        const cellSelection: CellSelection = {
            inputId: this._selectedInput.inputId,
            runTypeId: this._runTypeId,
            cell: []
        };
        const arrCell: Cell[] = [];

        const generateCell = (pId: number | null = null): Cell => {
            const cellData = this._allCells.find(
                (x) => x.productId === (pId ? pId : productId) && x.inputId === inputId
            );

            return {
                inputId: inputId,
                productId: pId ?? productId,
                modelParamId: cellData?.modelParamId ?? 0
            };
        };

        if (this._selectedInput.inputId === inputId) {
            for (const pId of this._selectedInput.productIds) {
                arrCell.push(generateCell(pId));
            }

            if (!arrCell.some((x) => x.productId === productId)) {
                arrCell.push(generateCell());
            }

            cellSelection.cell = arrCell;
        } else {
            cellSelection.cell.push(generateCell());
            cellSelection.inputId = inputId;

            // unselect Cells if you click in a different row.
            this.onUnselectCells(inputId);

            this._selectedInput.productIds = [productId];

            this.onSelectCellProcess();
        }

        switch (type) {
            case 'insert':
                this.onClickInsert(cellSelection);
                break;
            case 'edit':
                this.onClickEdit(cellSelection);
                break;
            case 'readonly':
                this.onClickView(cellSelection);
                break;
            case 'validate':
                this.onClickViewDifference(cellSelection);
                break;
            default:
                break;
        }
    }

    onClickSelectRow(inputId: number): void {
        this.onSelecteRow(inputId);
    }

    private displayColumns(): void {
        const columns = [];
        for (const item of this._tableHeader) {
            if (item.hide) {
                columns.push({ name: `${item.category}_empty`, text: '' });
            } else {
                columns.push(
                    ...item.products.map((y) => {
                        return { name: y.col, text: y.col };
                    })
                );
            }
        }

        this.tableHeader.dynamicColumns = columns;
        this.tableHeader.displayColumns = [
            ...this.tableHeader.stickyColumns,
            ...this.tableHeader.dynamicColumns?.map((x) => x.name)
        ];

        this.tableHeader.categoriesColumns = this._tableHeader;
        this.tableHeader.displayCategoriesColumns = [
            'header-row-first-group',
            ...this._tableHeader.map((x) => x.categoryIdentifier)
        ];

        // Manage Expand Categories Icon
        this.tableHeader.expandCategories =
            this._tableHeader.filter((x) => x.hide === false).length !== this._tableHeader.length;
    }

    //#region Section to Load Data
    private loadData(): void {
        const body: IInputProductTable[] = [];

        let order = 1;
        let lastOrder = 1;
        for (const input of this._allInputs) {
            if (body.length > 0) {
                const item = body.find((x) => x.category === input.categoryName);
                if (item) {
                    order = item.order;
                } else {
                    lastOrder++;
                    order = lastOrder;
                }
            }

            const item: IInputProductTable = {
                id: input.id,
                order: order,
                category: input.categoryName,
                group: input.categoryName,
                input_name: {
                    productId: 0,
                    inputId: 0,
                    inputTypeId: 0,
                    text: input.name,
                    className: 'table-border-right align-right',
                    type: CellType.Input
                },
                input_category: {
                    productId: 0,
                    inputId: 0,
                    inputTypeId: 0,
                    text: input.categoryName,
                    className: 'align-left',
                    type: CellType.Category
                }
            };

            let productCategoryName = this._allProducts[0].categoryName;
            let previousProduct = '';

            for (const product of this._allProducts) {
                const field = product.name.replace(' ', '_');

                item[field] = {
                    productId: product.id,
                    inputId: input.id,
                    inputTypeId: input.typeId,
                    className: 'align-center',
                    type: CellType.Cell,
                    select: false,
                    validate: null,
                    active: this._allCells.findIndex((x) => x.productId === product.id && x.inputId === input.id) !== -1
                };

                if (this._mode === TableMode.Validate) {
                    const validateItem = this._allCompareCells.find(
                        (x) => x.inputId === input.id && x.productId === product.id
                    );
                    if (validateItem) {
                        (item[field] as ICellDefinition).validate =
                            validateItem.sourceModelParamId === validateItem.targetModelParamId;
                    }
                }

                if (productCategoryName !== product.categoryName) {
                    (item[previousProduct] as ICellDefinition).className = 'align-center table-border-right';
                    productCategoryName = product.categoryName;
                }

                previousProduct = product.name;
            }

            // Generate Empty Column Product
            for (const header of this._tableHeader) {
                item[`${header.category}_empty`] = {
                    productId: 0,
                    inputId: 0,
                    className: 'table-border-right',
                    inputTypeId: 0,
                    type: CellType.EmptyCell
                };
            }

            body.push(item);
        }

        body[body.length - 1].className = 'table-border-right';

        // Sort Elements
        this.sort(body);
        this._allData = body.map((x) => Object.assign({}, x));
        this.nextRows(body);
    }

    private loadHeader(): void {
        for (const header of this._allProducts) {
            let item = this._tableHeader.find((y) => y.category === header.categoryName);
            if (!item) {
                const d: ITableHeader = {
                    id: header.id,
                    hide: false,
                    category: header.categoryName,
                    categoryIdentifier: header.categoryName.replace(' ', '_'),
                    colspan: 1,
                    products: []
                };
                item = d;
                this._tableHeader.push(d);
            }

            const p: ProductHeader = {
                id: header.id,
                name: header.name,
                col: header.name.replace(' ', '_')
            };
            item.products.push(p);

            item.colspan = item?.products.length;
        }

        this.displayColumns();
    }
    //#endregion

    //#region Manage Lazy Row Loading
    private nextRows(data: IInputProductTable[]): void {
        const rows = data.slice(0, this._rowShow);
        this.removeCategoriesName(rows);

        this.lessonsSubject.next(rows);
    }
    //#endregion

    //#region Seccion to Show/hide Columns/Rows and filter
    private toggleHeader(id: number): void {
        const category = this._tableHeader.find((x) => x.id === id);
        if (!category) {
            return;
        }
        category.colspan = category.hide ? category.products.length : 1;
        category.hide = !category.hide;
        this.displayColumns();

        this.onSelecteCellHideCategoryHeader();
        this.onSelectCellProcess();
    }

    private toggleColumn(id: number): void {
        const index = this.displayHideCategories.indexOf(id);
        if (index === -1) {
            this.displayHideCategories.push(id);
        } else {
            this.displayHideCategories.splice(index, 1);
        }

        this.searchData();
    }

    private searchData(): void {
        var alldata = this._allData.map((x) => Object.assign({}, x));

        alldata = alldata.filter((x) => x['input_name'].text?.toLowerCase().includes(this._filterInputs.toLowerCase()));
        if (this.displayHideCategories.length === 0) {
            this.lessonsSubject.next(alldata);
        }

        const categories = alldata.filter((x) => this.displayHideCategories.includes(x.id));
        if (categories.length === 0) {
            this.lessonsSubject.next(alldata);
        }

        const filterByCategory = (arr1: IInputProductTable[], arr2: IInputProductTable[]) => {
            let res = [];
            res = arr1.filter((el) => {
                return !arr2.find((element) => {
                    return element.category === el.category;
                });
            });
            return res;
        };
        alldata = filterByCategory(alldata, categories);

        for (const row of categories) {
            const emptyItem = this.generateEmptyRow(row);
            alldata.push(emptyItem);
        }

        this.sort(alldata);

        this.removeCategoriesName(alldata);
        this.tableHeader.expandInputs = this.displayHideCategories.length > 0;
        // this.lessonsSubject.next(alldata);

        this.nextRows(alldata);
    }

    private removeCategoriesName(data: IInputProductTable[]): void {
        // Remove Category Name
        const categories: string[] = [];
        for (const item of data) {
            if (categories.indexOf(item.category) === -1) {
                item.input_category.text = item.category;
                categories.push(item.category);
            } else {
                item.input_category.text = '';
            }
        }
    }

    private generateEmptyRow(row: IInputProductTable): IInputProductTable {
        const tmp: IInputProductTable = {
            id: row.id,
            order: row.order,
            category: row.category,
            group: row.group,
            input_name: {
                productId: 0,
                inputId: 0,
                text: '',
                className: 'table-border-right',
                inputTypeId: 0,
                type: CellType.EmptyCell
            },
            input_category: row.input_category
        };

        for (let key in row) {
            if (!tmp.hasOwnProperty(key)) {
                tmp[key] = {
                    productId: 0,
                    inputId: 0,
                    text: '',
                    className: (row[key] as ICellDefinition).className,
                    inputTypeId: (row[key] as ICellDefinition).inputTypeId,
                    type: CellType.EmptyCell
                };
            }
        }
        return tmp;
    }

    private sort(collection: IInputProductTable[] | null = null): void {
        if (!collection) {
            collection = this._allData;
        }

        collection.sort((a, b) => {
            const inputName1: string = a.input_name.text as string;
            const inputName2: string = b.input_name.text as string;

            return a.category.localeCompare(b.category) || inputName1.localeCompare(inputName2);
        });
    }
    //#endregion

    //#region Expand/Collapse Categories and Inputs
    /**
     * Expand/Collapse All Liability Categories
     */
    private expandCategories(): void {
        const item = this._tableHeader.find((x) => x.hide === true);

        if (item) {
            // Hide All Liability Categories
            this._tableHeader.map((x) => {
                x.hide = false;
                x.colspan = x.products.length;
            });
        } else {
            // Show All Liability Categories
            this._tableHeader.map((x) => {
                x.hide = true;
                x.colspan = 1;
            });
        }

        this.displayColumns();
    }

    /**
     * Expand/Collapse All Inputs Categories
     */
    private expandInputs(): void {
        if (this.displayHideCategories.length === 0) {
            var alldata = this._allData.map((x) => Object.assign({}, x));
            this.removeCategoriesName(alldata);
            const ids = alldata.filter((x) => x.input_category.text !== '').map((x) => x.id);
            this.displayHideCategories = ids;
        } else {
            this.displayHideCategories = [];
        }

        this.searchData();
    }
    //#endregion

    //#region Cell Actions
    /**
     * Modify Value of Cell Selected property
     */
    private onSelectCell(item: IInputProductTable, productId: number): void {
        const product = this._allProducts.find((x) => x.id === productId);
        if (!product) {
            return;
        }

        if (this._selectedInput.inputId === 0) {
            this._selectedInput.inputId = item.id;
        }
        // UnSelect Cells
        this.onUnselectCells(item.id);

        if ((item[product.name] as ICellDefinition).select) {
            this._selectedInput.productIds = this._selectedInput.productIds.filter((x) => x !== productId);
        } else {
            this._selectedInput.productIds.push(productId);
        }

        this.onSelectCellProcess();
    }

    /**
     * Select All Row Cells
     */
    private onSelecteRow(inputId: number): void {
        if (this._mode !== TableMode.Edit) {
            return;
        }

        const item = this._allData.find((x) => x.id === inputId);
        if (!item) {
            return;
        }

        // UnSelect Cells
        this.onUnselectCells(inputId);
        const newValue = item.input_name.select ? false : true;
        item.input_name.select = newValue;
        if (!newValue) {
            this.onUnselectCells(0);
            this._selectedInput = { inputId: 0, productIds: [] };
            this.onSelectCellProcess();
            return;
        }
        this._selectedInput.inputId = item.id;
        this._selectedInput.productIds = [];

        const categories = this.tableHeader.categoriesColumns?.filter((x) => x.hide === false);
        if (!categories) {
            return;
        }

        categories.map((x) => x.products.map((y) => this._selectedInput.productIds.push(y.id)));

        this.onSelectCellProcess();
    }

    /**
     * Unselect cells inside the Category Headerss
     */
    private onSelecteCellHideCategoryHeader(): void {
        const categories = this.tableHeader.categoriesColumns?.filter((x) => x.hide === false);
        if (!categories) {
            return;
        }
        const availableProductIds: number[] = [];
        categories.map((x) => x.products.map((y) => availableProductIds.push(y.id)));

        this._selectedInput.productIds = this._selectedInput.productIds.filter((x) => availableProductIds.includes(x));
    }

    /**
     * Select cells selected previously
     */
    private onSelectCellProcess(): void {
        const item = this._allData.find((x) => x.id === this._selectedInput.inputId);
        if (!item) {
            return;
        }

        const categories = this.tableHeader.categoriesColumns?.filter((x) => !x.hide);
        if (!categories) {
            return;
        }

        let isAllCellSelected = true;
        for (const category of categories) {
            for (const product of category.products) {
                if (this._selectedInput.productIds.includes(product.id)) {
                    (item[product.name] as ICellDefinition).select = true;
                } else {
                    (item[product.name] as ICellDefinition).select = false;
                    isAllCellSelected = false;
                }
            }
        }

        item.input_name.select = isAllCellSelected;
    }

    /**
     * Un-select all cells when you click a cell from a different Input
     */
    private onUnselectCells(newInputId: number): void {
        // Compare the previous input row selected with the new input row
        if (this._selectedInput.inputId === newInputId) {
            return;
        }

        const row = this._allData.find((x) => x.id === this._selectedInput.inputId);
        if (!row) {
            return;
        }

        for (const product of this._allProducts) {
            (row[product.name] as ICellDefinition).select = false;
        }

        row.input_name.select = false;
        this._selectedInput.inputId = newInputId;
        this._selectedInput.productIds = [];
    }

    private onClickEdit(data: CellSelection): void {
        this.inputTableService.spreedData(data, TableSpreedData.Edit);
    }

    private onClickInsert(data: CellSelection): void {
        this.inputTableService.spreedData(data, TableSpreedData.Insert);
    }

    private onClickView(data: CellSelection): void {
        this.inputTableService.spreedData(data, TableSpreedData.View);
    }

    private onClickViewDifference(data: CellSelection): void {
        this.inputTableService.spreedData(data, TableSpreedData.Validate);
    }
    //#endregion
}
