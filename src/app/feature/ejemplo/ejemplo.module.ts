import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InputTableModule } from '../table/input-table.module';
import { EjemploRoutingModule } from './ejemplo-routing.module';
import { EjemploComponent } from './ejemplo.component';

@NgModule({
    imports: [CommonModule, EjemploRoutingModule, InputTableModule],
    declarations: [EjemploComponent]
})
export class EjemploModule {}
