import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemoInputTableComponent } from './demo-input-table.component';

const routes: Routes = [
    {
        path: ':id',
        component: DemoInputTableComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DemoInputTableRoutingModule {}
