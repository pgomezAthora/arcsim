import { ProductDto } from './entitites/product.dto';
import { CollectionViewer } from '@angular/cdk/collections';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Observable } from 'rxjs';
import { InputDto } from './entitites/input.dto';
import { ITableHeader, ProductHeader } from './interfaces/table-header.interface';
import { ITableConfig } from './interfaces/table.config';

import { ICellDefinition, IInputProductTable, CellType, ICellData } from './interfaces/table-data.interface';

export class ProductDataSource extends DataSource<IInputProductTable> {
    tableHeader: {
        stickyColumns: string[];
        dynamicColumns?: string[];
        displayColumns?: string[];
        categoriesColumns?: ITableHeader[];
        displayCategoriesColumns?: string[];
        expandCategories: boolean;
        expandInputs: boolean;
    };

    private lessonsSubject = new BehaviorSubject<IInputProductTable[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();

    // private _allProducts: { id: number; name: string }[] = [];
    private _allInputs: InputDto[] = [];
    private _allProducts: ProductDto[] = [];
    private _allCells: ICellData[] = [];
    private _allData: IInputProductTable[] = [];
    private _tableHeader: ITableHeader[] = [];
    private _filterInputs: string = '';
    private config: ITableConfig;
    private displayHideCategories: number[] = [];

    constructor(inputs: InputDto[], products: ProductDto[], cells: ICellData[], config: ITableConfig) {
        super();

        this._allInputs = inputs;
        this._allProducts = products;
        this._allCells = cells;
        this.config = config;

        this.tableHeader = {
            stickyColumns: this.config.stickyColumns,
            expandCategories: false,
            expandInputs: false
        };
    }

    connect(collectionViewer: CollectionViewer): Observable<readonly IInputProductTable[]> {
        console.log('Connecting data source');
        return this.lessonsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.lessonsSubject.complete();
        this.loadingSubject.complete();
    }

    load(): void {
        this.loadHeader();
        this.loadData();
    }

    filter(val: string): void {
        this._filterInputs = val;
        this.searchData();
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

    private displayColumns(): void {
        const columns = [];
        for (const item of this._tableHeader) {
            if (item.hide) {
                columns.push(`${item.category}_empty`);
            } else {
                columns.push(...item.products.map((y) => y.col));
            }
        }

        this.tableHeader.dynamicColumns = columns;
        this.tableHeader.displayColumns = [...this.tableHeader.stickyColumns, ...this.tableHeader.dynamicColumns];

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
                    text: input.name,
                    className: 'table-border-right align-right',
                    type: CellType.Input
                },
                input_category: {
                    productId: 0,
                    inputId: 0,
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
                    className: 'align-center',
                    type: CellType.Cell,
                    active: this._allCells.findIndex((x) => x.productId === product.id && x.inputId === input.id) !== -1
                };

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
                    type: CellType.EmptyCell
                };
            }

            body.push(item);
        }

        body[body.length - 1].className = 'table-border-right';

        // Sort Elements
        this.sort(body);

        this._allData = body.map((x) => Object.assign({}, x));
        this.removeCategoriesName(body);

        this.lessonsSubject.next(body);
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

    //#region Seccion to Show/hide Columns/Rows and filter
    private toggleHeader(id: number): void {
        const category = this._tableHeader.find((x) => x.id === id);
        if (!category) {
            return;
        }
        category.colspan = category.hide ? category.products.length : 1;
        category.hide = !category.hide;
        this.displayColumns();
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
        this.lessonsSubject.next(alldata);
    }

    private removeCategoriesName(data: IInputProductTable[]): void {
        // Remove Category Name
        const categories: string[] = [];
        for (const item of data) {
            if (categories.indexOf(item.category) === -1) {
                categories.push(item.category);
            } else {
                item.input_category.text = '';
            }
        }
    }

    private generateEmptyRow(row: IInputProductTable) {
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
                    type: CellType.EmptyCell
                };
            }
        }
        return tmp;
    }

    private sort(collection: IInputProductTable[] | null = null) {
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
    private expandCategories() {
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
    private expandInputs() {
        if (this.displayHideCategories.length === 0) {
            const ids = this._allData.filter((x) => x.input_category.text !== '').map((x) => x.id);
            this.displayHideCategories.push(...ids);
        } else {
            this.displayHideCategories = [];
        }

        this.searchData();
    }
    //#endregion
}
