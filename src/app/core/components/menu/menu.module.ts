import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideBarComponent } from './side-bar/side-bar.component';
import { MenuComponent } from './menu.component';
import { MaterialModule } from '@shared/material/material.module';

@NgModule({
    imports: [CommonModule, RouterModule, BrowserModule, BrowserAnimationsModule, MaterialModule],
    declarations: [SideBarComponent, MenuComponent],
    entryComponents: []
})
export class MenuModule {}
