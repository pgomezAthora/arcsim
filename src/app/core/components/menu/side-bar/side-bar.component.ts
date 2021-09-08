import { Component } from '@angular/core';
import { NavItem, NavRoutes } from '../routes';

@Component({
    selector: 'app-side-bar',
    templateUrl: 'side-bar.component.html',
    styleUrls: ['side-bar.component.scss']
})
export class SideBarComponent {
    pages: NavItem[] = NavRoutes;
}
