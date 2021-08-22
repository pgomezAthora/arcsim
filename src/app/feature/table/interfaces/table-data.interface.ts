export interface TableData {}

export enum ColumnType {
    String,
    Category
}
export interface IColumnDefinition {
    type: ColumnType;
    name: string;
}
