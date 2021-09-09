import { Component, OnInit } from '@angular/core';

interface IDashboardElements {
    imgSrc: string;
    title: string;
    text: string;
    route: string;
}

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    data: IDashboardElements[] = [];

    ngOnInit(): void {
        this.data = [
            {
                imgSrc: './assets/images/reporting.svg',
                title: 'Reporting',
                text: 'Create and manage run groups to aid in reporting tasks',
                route: '/'
            },
            {
                imgSrc: './assets/images/sba.svg',
                title: 'SBA Modelling',
                text: 'Manage scenario based approach',
                route: '/'
            },
            {
                imgSrc: './assets/images/queue.svg',
                title: 'Queue',
                text: 'View and manage all live tasks that are currently running on the platform',
                route: '/'
            }
        ];
    }
}
