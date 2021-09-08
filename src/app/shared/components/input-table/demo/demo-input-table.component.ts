import { TableMode } from '../interfaces/table-data.interface';
import { Component, OnInit } from '@angular/core';
import { DemoTableService } from './demo-table.service';
import { InputTableService } from '../services/input-table.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'demo-input-table',
    templateUrl: './demo-input-table.component.html',
    styleUrls: ['./demo-input-table.component.scss']
})
export class DemoInputTableComponent implements OnInit {
    data: { runTypeId: number; inputs: any[]; products: any[]; cells: any[]; cellCompare: any[]; mode: TableMode };
    responseIcon: string = '';
    responseValue: any = '';
    constructor(
        private demoTableService: DemoTableService,
        private inputTableService: InputTableService,
        private route: ActivatedRoute
    ) {
        this.data = {
            runTypeId: 1,
            inputs: this.demoTableService.getInput(),
            products: this.demoTableService.getProduct(),
            cells: this.demoTableService.getCell(),
            cellCompare: this.demoTableService.getCellCompare(),
            mode: TableMode.Edit
        };

        switch (this.route.snapshot.paramMap.get('id')) {
            case 'validate':
                this.data.mode = TableMode.Validate;
                break;
            case 'readonly':
                this.data.mode = TableMode.ReadOnly;
                break;
            case 'edit':
                this.data.mode = TableMode.Edit;
                break;

            default:
                break;
        }
    }
    ngOnInit(): void {
        this.inputTableService._editCellSubject$.subscribe((x) => {
            this.responseIcon = 'edit';
            this.responseValue = x;
        });
        this.inputTableService._insertCellSubject$.subscribe((x) => {
            this.responseIcon = 'insert';
            this.responseValue = x;
        });
        this.inputTableService._viewCellSubject$.subscribe((x) => {
            this.responseIcon = 'view';
            this.responseValue = x;
        });
        this.inputTableService._viewDifferencesSubject$.subscribe((x) => {
            this.responseIcon = 'validate';
            this.responseValue = x;
        });
    }
}
