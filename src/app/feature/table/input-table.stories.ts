import { TableBasicComponent } from './input-table.component';
import { moduleMetadata, storiesOf } from '@storybook/angular';
import { TableMode } from './interfaces/table-data.interface';

import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { TableModule } from './input-table.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// export default {
//     title: 'Input Table'
// };

// export const TestInputTable = () => ({
//     moduleMetadata: {
//         imports: [CommonModule, MatTableModule, MatIconModule, MatInputModule, MatTooltipModule, FormsModule]
//     },
//     components: TableBasicComponent,
//     props: {
//         mode: TableMode.ReadOnly
//     }
// });

storiesOf('Table', module).add('single', () => ({
    template: `
    
    <div>

    <input-table></input-table>
    
    </div>`,
    moduleMetadata: {
        imports: [
            CommonModule,
            BrowserAnimationsModule,
            MatTableModule,
            MatIconModule,
            MatInputModule,
            MatTooltipModule,
            FormsModule,
            TableModule
        ]
    }
    // ,
    // parameters: {
    //     jest: ['table.datasource']
    // }
}));
