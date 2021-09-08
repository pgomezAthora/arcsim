import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app.module.routing';
import { AppComponent } from './app.component';
import { MaterialModule } from './shared/material/material.module';
// import { MenuModule } from './core/components/menu/menu.module';
import { CoreModule } from './core/core.module';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, MaterialModule, CoreModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
