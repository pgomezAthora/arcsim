import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './core/components/menu/menu.component';
import { ErrorModule } from './feature/error/error.module';
import { PageNotFoundModule } from './feature/page-not-found/page-not-found.module';

const routes: Routes = [
    {
        path: '',
        component: MenuComponent,
        children: [
            { path: '', loadChildren: () => import('./feature/home/home.module').then((mod) => mod.HomeModule) },
            { path: 'home', loadChildren: () => import('./feature/home/home.module').then((mod) => mod.HomeModule) }
        ]
    },
    // {
    //     path: '',
    //     loadChildren: () => import('./feature/home/home.module').then((m) => m.HomeModule)
    // },
    {
        path: 'demo-input-table',
        loadChildren: () =>
            import('./shared/components/input-table/demo/demo-input-table.module').then((m) => m.DemoInputTableModule)
    },
    { path: 'error', loadChildren: () => ErrorModule },
    { path: '404', loadChildren: () => PageNotFoundModule },
    { path: '**', redirectTo: '404' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
