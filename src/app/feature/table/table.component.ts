import { Component, Input, OnInit } from '@angular/core';
import { DemoTableService } from './demo-table.service';
import { IInputProductTable, CellType, TableMode } from './interfaces/table-data.interface';
import { ITableHeader } from './interfaces/table-header.interface';
import { ITableConfig } from './interfaces/table.config';
import { ProductDataSource } from './table.datasource';
import { TableService } from './table.service';

@Component({
    selector: 'table-example',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableBasicComponent implements OnInit {
    modes = TableMode;
    @Input() mode: TableMode;

    dataSource: ProductDataSource;
    searchValue: string;
    cellType = CellType;

    constructor(private demoTableService: DemoTableService, private tableService: TableService) {
        const tableConfig: ITableConfig = {
            stickyColumns: ['input_category', 'input_name']
        };
        this.mode = this.modes.Edit;

        const inputs = this.demoTableService.getInput();
        const products = this.demoTableService.getProduct();
        const cells = this.demoTableService.getCell();
        const cellsCompare = this.demoTableService.getCellCompare();

        this.dataSource = new ProductDataSource(
            this.mode,
            inputs,
            products,
            cells,
            cellsCompare,
            tableConfig,
            this.tableService
        );
        this.dataSource.load();
    }

    ngOnInit(): void {}

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
