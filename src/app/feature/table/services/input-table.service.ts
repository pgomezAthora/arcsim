import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CellSelection } from '../interfaces/cell-selection.interface';

export enum TableSpreedData {
    Edit,
    Insert,
    View,
    Validate
}

@Injectable({ providedIn: 'root' })
export class InputTableService {
    _editCellSubject$: BehaviorSubject<CellSelection | null>;
    _insertCellSubject$: BehaviorSubject<CellSelection | null>;
    _viewCellSubject$: BehaviorSubject<CellSelection | null>;
    _viewDifferencesSubject$: BehaviorSubject<CellSelection | null>;

    constructor() {
        this._editCellSubject$ = new BehaviorSubject<CellSelection | null>(null);
        this._insertCellSubject$ = new BehaviorSubject<CellSelection | null>(null);
        this._viewCellSubject$ = new BehaviorSubject<CellSelection | null>(null);
        this._viewDifferencesSubject$ = new BehaviorSubject<CellSelection | null>(null);
    }

    spreedData(data: CellSelection, type: TableSpreedData) {
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
            case TableSpreedData.Validate:
                this.communicateValidate(data);
                break;
            default:
                break;
        }
    }

    private communicateView(data: CellSelection): void {
        this._viewCellSubject$.next(data);
    }

    private communicateEdit(data: CellSelection): void {
        this._editCellSubject$.next(data);
    }

    private communicateInsert(data: CellSelection): void {
        this._insertCellSubject$.next(data);
    }

    private communicateValidate(data: CellSelection): void {
        this._viewDifferencesSubject$.next(data);
    }
}
