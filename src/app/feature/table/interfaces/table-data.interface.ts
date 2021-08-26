export interface TableData {}

export enum TableMode {
    ReadOnly,
    Edit,
    Validate
}

export enum CellType {
    Category,
    Input,
    EmptyCell,
    Cell
}

export interface ICellDefinition {
    productId: number;
    runTypeId?: number;
    inputId: number;
    modelParamId?: number;
    className: string;
    text?: string;
    type: CellType;
    inputTypeId: number;
    active?: boolean;
    select?: boolean;
    validate?: boolean | null;
}

export interface IInputProductTable {
    id: number;
    group: string;
    category: string;
    order: number;
    input_name: ICellDefinition;
    input_category: ICellDefinition;
    [key: string]: ICellDefinition | string | number;
}
