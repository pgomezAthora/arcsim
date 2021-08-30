import { ICellCompareDto } from './entitites/cell-compare.dto';
import { ICellDto } from './entitites/cell.dto';
import { InputDto } from './entitites/input.dto';
import { ProductDto } from './entitites/product.dto';
import { TableMode } from './interfaces/table-data.interface';
import { ITableConfig } from './interfaces/table.config';
import { ProductDataSource } from './table.datasource';
import { TableService } from './table.service';

describe('Table DataSource', () => {
    let fixture: ProductDataSource;
    let tableService: TableService;
    let mode: TableMode;
    let mockInput: InputDto[];
    let products: ProductDto[];
    let cells: ICellDto[];
    let compareCells: ICellCompareDto[];
    let config: ITableConfig;

    beforeEach(() => {
        tableService = new TableService();

        // fixture = new ProductDataSource();
    });

    function createFixture() {
        // fixture = new ProductDataSource()
    }

    it('', () => {
        mode = TableMode.ReadOnly;
    });
});
