export interface IStickyColumns {
    [key: string]: string;
}

export interface IProductColumns {
    [key: string]: string;
}

export interface ITableConfig {
    stickyColumns: string[]; // IStickyColumns;
    // productColumns: IProductColumns;
}
