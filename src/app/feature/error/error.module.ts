import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { ErrorComponent } from './error.component';
import { ErrorRoutingModule } from './error.routing';

@NgModule({
    imports:[CommonModule, ErrorRoutingModule],
    declarations:[ErrorComponent]
})
export class ErrorModule{}