import { Component, Input, OnInit } from '@angular/core';
import { IInputProductTable, CellType, TableMode } from './interfaces/table-data.interface';
import { ITableHeader } from './interfaces/table-header.interface';
import { ITableConfig } from './interfaces/table.config';
import { ProductDataSource } from './input-table.datasource';
import { InputTableService } from './services/input-table.service';
import { DemoTableService } from './demo/demo-table.service';
import { IProductDto } from './entitites/product.dto';
import { IInputDto } from './entitites/input.dto';
import { ICellDto } from './entitites/cell.dto';
import { ICellCompareDto } from './entitites/cell-compare.dto';

@Component({
    selector: 'input-table',
    templateUrl: './input-table.component.html',
    styleUrls: ['./input-table.component.scss']
})
export class InputTableComponent implements OnInit {
    modes = TableMode;
    @Input() mode: TableMode;
    @Input('run-type-id') runTypeId: number;
    @Input() inputs: IInputDto[];
    @Input() products: IProductDto[];
    @Input() cells: ICellDto[];
    @Input('cells-compare') cellsCompare: ICellCompareDto[];

    dataSource: ProductDataSource;
    searchValue: string;
    cellType = CellType;

    constructor(private inputTableService: InputTableService) {
        this.mode = this.modes.Edit;

        // const tableConfig: ITableConfig = {
        //     stickyColumns: ['input_category', 'input_name']
        // };

        // const inputs = this.demoTableService.getInput();
        // const products = this.demoTableService.getProduct();
        // const cells = this.demoTableService.getCell();
        // const cellsCompare = this.demoTableService.getCellCompare();

        // this.dataSource = new ProductDataSource(
        //     this.runTypeId,
        //     this.mode,
        //     inputs,
        //     products,
        //     cells,
        //     cellsCompare,
        //     tableConfig,
        //     this.tableService
        // );
    }

    ngOnInit(): void {
        const tableConfig: ITableConfig = {
            stickyColumns: ['input_category', 'input_name']
        };
        this.dataSource = new ProductDataSource(
            this.runTypeId,
            this.mode,
            this.inputs,
            this.products,
            this.cells,
            this.cellsCompare,
            tableConfig,
            this.inputTableService
        );

        this.dataSource.load();
    }

    isSticky(): boolean {
        return true;
    }

    filter(): void {
        this.dataSource.filter(this.searchValue);
    }

    getRowClassName(row: IInputProductTable): string {
        if (row.input_category.text !== '') {
            return 'border-split-category-section';
        }
        return '';
    }

    getDynamicWidth(column: ITableHeader): any {
        const witdh: number = 100 * column.colspan;

        return witdh + 'px';
    }

    getHeaderClassName(column: string): string {
        if (column.includes('_empty')) {
            return 'table-border-right';
        }

        const header = this.dataSource._tableHeader.find((x) => x.products.findIndex((y) => y.name === column));
        if (!header) {
            return '';
        }
        const index = header.products.findIndex((x) => x.name === column);
        if (index === -1) {
            return '';
        }

        if (header.products.length === index + 1) {
            return 'table-border-right';
        }

        return '';
    }
}
