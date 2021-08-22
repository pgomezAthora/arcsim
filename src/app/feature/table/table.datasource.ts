import { CollectionViewer } from '@angular/cdk/collections';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Observable } from 'rxjs';
import { DemoTableService } from './demo-table.service';
import { InputDto } from './entitites/input.dto';
import { ITableHeader, ProductHeader } from './interfaces/table-header.interface';
import { ITableConfig } from './interfaces/table.config';

export class ProductDataSource extends DataSource<IInputProductTable> {
    tableHeader: {
        stickyColumns: string[];
        dynamicColumns?: string[];
        displayColumns?: string[];
        categoriesColumns?: ITableHeader[];
        displayCategoriesColumns?: string[];
    };

    private lessonsSubject = new BehaviorSubject<IInputProductTable[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();

    private _allProducts: { id: number; name: string }[] = [];
    private _allInputs: InputDto[] = [];
    private _allData: IInputProductTable[] = [];
    private _tableHeader: ITableHeader[] = [];
    private config: ITableConfig;
    private displayHideCategories: number[] = [];

    constructor(private demoTableService: DemoTableService, config: ITableConfig) {
        super();

        this._allInputs = demoTableService.getInput();
        this.config = config;

        this.tableHeader = { stickyColumns: this.config.stickyColumns };
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

    toggleCategory(id: number, type: string): void {
        if (type === 'header') {
            this.toggleHeader(id);
        } else if (type === 'column') {
            this.toggleColumn(id);
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
    }

    //#region Section to Load Data
    private loadData(): void {
        const productsDto = this.demoTableService.getProduct();
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

            const i: IInputProductTable = {
                id: input.id,
                order: order,
                category: input.categoryName,
                group: input.categoryName,
                input_name: input.name,
                input_category: input.categoryName
            };

            for (const product of productsDto) {
                const field = product.name.replace(' ', '_');
                i[field] = product.name;
            }

            body.push(i);
        }

        // Order Elements
        this.orderElements(body);

        // Remove Category Name
        const categories: string[] = [];
        for (const item of body) {
            if (categories.indexOf(item.category) === -1) {
                categories.push(item.category);
            } else {
                item.input_category = '';
            }
        }

        this._allData = body;
        this.lessonsSubject.next(body);
    }

    private loadHeader(): void {
        const data = this.demoTableService.getProduct();

        for (const header of data) {
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

            this._allProducts.push(p);
            item.colspan = item?.products.length;
        }

        this.displayColumns();
    }
    //#endregion

    private orderElements(data: IInputProductTable[]): void {
        data.sort((a, b) => {
            return a.order - b.order || a.input_name.localeCompare(b['input_name']);
        });
    }

    private sort(collection: IInputProductTable[] | null = null) {
        if (!collection) {
            collection = this._allData;
        }

        collection.sort((a, b) => {
            return a.order - b.order || a.input_name.localeCompare(b['input_name']);
        });
    }

    //#region Seccion to Show/hide Columns/Rows
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

        if (this.displayHideCategories.length === 0) {
            this.lessonsSubject.next(this._allData);
        }

        var alldata = this._allData.map((x) => Object.assign({}, x));
        const categories = alldata.filter((x) => this.displayHideCategories.includes(x.id));
        if (categories.length === 0) {
            this.lessonsSubject.next(this._allData);
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

        this.lessonsSubject.next(alldata);
    }

    private generateEmptyRow(row: IInputProductTable) {
        const tmp: IInputProductTable = {
            id: row.id,
            order: row.order,
            category: row.category,
            group: row.group,
            input_name: '',
            input_category: row.input_category
        };

        for (let key in row) {
            if (!tmp.hasOwnProperty(key)) {
                tmp[key] = '';
            }
        }
        return tmp;
    }
    //#endregion
}

interface IInputProductTable {
    id: number;
    group: string;
    category: string;
    order: number;
    input_name: string;
    input_category: string;
    [key: string]: string | number;
}
