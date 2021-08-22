import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from './page-not-found.component';
import { PageNotFoundRoutingModule } from './page-not-found.routing';

@NgModule({
    imports: [CommonModule, PageNotFoundRoutingModule],
    exports: [],
    declarations: [PageNotFoundComponent],
    providers: []
})
export class PageNotFoundModule {}
