import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InputTableComponent } from './input-table.component';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { TooltipIfTruncatedDirective } from './directives/tooltip-if-truncated.directive';

@NgModule({
    imports: [CommonModule, MatTableModule, MatIconModule, MatInputModule, MatTooltipModule, FormsModule],
    declarations: [InputTableComponent, TooltipIfTruncatedDirective],
    exports: [InputTableComponent]
})
export class InputTableModule {}
