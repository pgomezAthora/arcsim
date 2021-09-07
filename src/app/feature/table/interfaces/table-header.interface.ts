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
