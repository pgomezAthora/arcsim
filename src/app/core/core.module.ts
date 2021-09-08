import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@shared/material/material.module';
import { MenuModule } from './components/menu/menu.module';

@NgModule({
    imports: [CommonModule, RouterModule, MaterialModule],
    declarations: [],
    exports: [MenuModule]
})
export class CoreModule {}
