export interface Cell {
    productId: number;
    inputId: number;
    modelParamId: number;
}

export interface CellSelection {
    inputId: number;
    runTypeId: number;
    cell: Cell[];
}
