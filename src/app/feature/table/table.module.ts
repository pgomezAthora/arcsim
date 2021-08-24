import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TableBasicComponent } from './table.component';
import { MatTableModule } from '@angular/material/table';
import { TableRoutingModule } from './table-routing.module';
import { TableHeaderComponent } from './header/table-header.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, TableRoutingModule, MatTableModule, MatIconModule, MatInputModule, FormsModule],
    declarations: [TableBasicComponent, TableHeaderComponent]
})
export class TableModule {}
