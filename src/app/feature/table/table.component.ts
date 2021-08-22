import { Component, OnInit } from '@angular/core';
import { DemoTableService } from './demo-table.service';
import { ITableConfig } from './interfaces/table.config';
import { ProductDataSource } from './table.datasource';

@Component({
    selector: 'table-example',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableBasicComponent implements OnInit {
    dataSource: ProductDataSource;

    constructor(private demoTableService: DemoTableService) {
        const tableConfig: ITableConfig = {
            stickyColumns: ['input_category', 'input_name']
        };

        this.dataSource = new ProductDataSource(demoTableService, tableConfig);
        this.dataSource.load();
    }

    ngOnInit(): void {}
}
