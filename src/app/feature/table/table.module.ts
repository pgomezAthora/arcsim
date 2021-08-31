import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TableBasicComponent } from './table.component';
import { MatTableModule } from '@angular/material/table';
import { TableRoutingModule } from './table-routing.module';
import { TableHeaderComponent } from './header/table-header.component';
import { FormsModule } from '@angular/forms';
import { TooltipIfTruncatedDirective } from './tooltip-if-truncated.directive';

@NgModule({
    imports: [
        CommonModule,
        TableRoutingModule,
        MatTableModule,
        MatIconModule,
        MatInputModule,
        MatTooltipModule,
        FormsModule
    ],
    declarations: [TableBasicComponent, TableHeaderComponent, TooltipIfTruncatedDirective]
})
export class TableModule {}
