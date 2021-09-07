import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { LayoutComponent } from './core/components/layout/layout.component';
import { ErrorModule } from './feature/error/error.module';
import { PageNotFoundModule } from './feature/page-not-found/page-not-found.module';
// import { TableBasicExample } from './feature/table/table.component';

const routes: Routes = [
    {
        // path: '',
        // loadChildren: () =>
        //     import('./feature/table/table.module').then((m) => m.TableModule)
        // component: LayoutComponent,
        // children: [
        //     { path: '', redirectTo: 'table', pathMatch: 'full' },
        //     {

        //     }
        // ]
        path: 'demo-input-table',
        loadChildren: () => import('./feature/table/demo/demo-input-table.module').then((m) => m.DemoInputTableModule)
    },
    { path: 'ejemplo', loadChildren: () => import('./feature/ejemplo/ejemplo.module').then((m) => m.EjemploModule) },
    { path: 'error', loadChildren: () => ErrorModule },
    { path: '404', loadChildren: () => PageNotFoundModule },
    { path: '**', redirectTo: '404' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
