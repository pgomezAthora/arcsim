import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavItem, NavRoutes } from '../routes';

@Component({
    selector: 'app-side-bar',
    templateUrl: 'side-bar.component.html',
    styleUrls: ['side-bar.component.scss']
})
export class SideBarComponent {
    pages: NavItem[] = NavRoutes;

    constructor(private router: Router) {}

    isActive(route: string): boolean {
        return this.router.isActive(route, true);
    }
}
