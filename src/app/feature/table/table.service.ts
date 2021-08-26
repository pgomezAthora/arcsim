import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export enum TableSpreedData {
    Edit,
    Insert,
    View
}

@Injectable({ providedIn: 'root' })
export class TableService {
    private _editCellSubject = new BehaviorSubject<any[]>([]);
    private _insertCellSubject = new BehaviorSubject<any[]>([]);
    private _viewCellSubject = new BehaviorSubject<any[]>([]);

    editCellSubject = this._editCellSubject.asObservable();
    insertCellSubject = this._insertCellSubject.asObservable();
    viewCellSubject = this._viewCellSubject.asObservable();

    constructor() {}

    spreedData(data: any, type: TableSpreedData) {
        switch (type) {
            case TableSpreedData.View:
                this.communicateView(data);
                break;
            case TableSpreedData.Edit:
                this.communicateEdit(data);
                break;
            case TableSpreedData.Insert:
                this.communicateInsert(data);
                break;
            default:
                break;
        }
    }

    private communicateView(data: any) {
        this._viewCellSubject.next(data);
    }

    private communicateEdit(data: any) {
        this._editCellSubject.next(data);
    }

    private communicateInsert(data: any) {
        this._insertCellSubject.next(data);
    }
}
