import { ICellCompareDto } from './entitites/cell-compare.dto';
import { ICellDto } from './entitites/cell.dto';
import { InputDto } from './entitites/input.dto';
import { ProductDto } from './entitites/product.dto';
import { TableMode } from './interfaces/table-data.interface';
import { ITableConfig } from './interfaces/table.config';
import { ProductDataSource } from './table.datasource';
import { TableService } from './table.service';

import * as mockData from './mock-data';

describe('Table DataSource', () => {
    let fixture: ProductDataSource;
    let tableService: TableService;
    let mode: TableMode;
    let mockInputs: InputDto[];
    let mockProducts: ProductDto[];
    let mockCells: ICellDto[];
    let mockCompareCells: ICellCompareDto[];
    let config: ITableConfig;

    beforeEach(() => {
        tableService = new TableService();
    });

    function createFixture() {
        fixture = new ProductDataSource(
            mode,
            mockInputs,
            mockProducts,
            mockCells,
            mockCompareCells,
            config,
            tableService
        );
    }

    describe('General Functionality', () => {
        beforeEach(() => {
            mockInputs = mockData.mockInputs;
            mockProducts = mockData.mockProducts;
            mockCells = mockData.mockCells;
            mockCompareCells = mockData.mockCellCompare;
            mode = TableMode.ReadOnly;
            config = mockData.mockTableConfig;
            createFixture();
        });

        it('', () => {
            expect('123').toBe('123');
        });
    });
});
