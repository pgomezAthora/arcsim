import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TableBasicComponent } from './table.component';
import { MatTableModule } from '@angular/material/table';
import { TableRoutingModule } from './table-routing.module';
import { TableHeaderComponent } from './header/table-header.component';

@NgModule({
    imports: [CommonModule, TableRoutingModule, MatTableModule],
    declarations: [TableBasicComponent, TableHeaderComponent]
})
export class TableModule {}
