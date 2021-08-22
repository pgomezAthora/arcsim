import { Component } from '@angular/core';

@Component({
    selector: 'table-header',
    templateUrl: './table-header.component.html'
    // styleUrls: ['./table.component.scss']
})
export class TableHeaderComponent {
    original: string[] = ['position', 'name', 'weight', 'symbol'];
    cambio = ['position', 'symbol'];
    mostrar = true;
    displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
    ocultar() {
        console.log('test');
        if (this.mostrar) {
            this.displayedColumns = this.cambio;
        } else {
            this.displayedColumns = this.original;
        }

        this.mostrar = !this.mostrar;
    }
}
