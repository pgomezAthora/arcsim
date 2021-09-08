import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InputTableModule } from '../input-table.module';
import { DemoInputTableRoutingModule } from './demo-input-table-routing.module';
import { DemoInputTableComponent } from './demo-input-table.component';

@NgModule({
    imports: [CommonModule, DemoInputTableRoutingModule, InputTableModule],
    declarations: [DemoInputTableComponent],
    exports: []
})
export class DemoInputTableModule {}
