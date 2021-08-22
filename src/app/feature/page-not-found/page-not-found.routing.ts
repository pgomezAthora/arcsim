import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found.component';

export const PageNotFoundRoutes: Route[] = [
    { path: '', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forChild(PageNotFoundRoutes)],
    exports: [RouterModule]
})
export class PageNotFoundRoutingModule {}
