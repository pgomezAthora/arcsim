export interface ProductHeader {
    id: number;
    name: string;
    col: string;
}

export interface ITableHeader {
    id: number;
    category: string;
    categoryIdentifier: string;
    hide: boolean;
    colspan: number;
    products: ProductHeader[];
}

export interface RowTable {
    input: string;
}

export class TableHeader implements ITableHeader {
    id: number;
    category: string;
    hide: boolean;
    colspan: number;
    products: ProductHeader[];
    constructor() {}
    categoryIdentifier: string;
}

// export class ITableData {
//     hide: boolean;
//     group: string;
//     agrupar: boolean;
//     [key: string]: IColumnDefinition | string | boolean;
// }
