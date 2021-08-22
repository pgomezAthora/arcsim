import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app.module.routing';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TableModule } from './feature/table/table.module';

// import { LayoutModule } from './core/components/layout/layout.module';
import { TableBasicComponent } from './feature/table/table.component';
import { DemoMaterialModule } from './material.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        TableModule,
        // LayoutModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        DemoMaterialModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}