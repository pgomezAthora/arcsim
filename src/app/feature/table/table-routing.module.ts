import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableBasicComponent } from './table.component';

const routes: Routes = [
    {
        path: '',
        component: TableBasicComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TableRoutingModule {}
