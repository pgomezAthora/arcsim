import { Route, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ErrorComponent } from './error.component';

export const ErrorRoutes: Route[] = [{ path: '', component: ErrorComponent }];

@NgModule({
    imports: [RouterModule.forChild(ErrorRoutes)],
    exports: [RouterModule]
})
export class ErrorRoutingModule {}
