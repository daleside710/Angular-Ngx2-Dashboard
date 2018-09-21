import { Directive, Input, Output, EventEmitter, SimpleChange, DoCheck, OnInit, OnChanges } from "@angular/core";
import * as _ from "lodash";
import { StateManager } from "./StateManager";

export interface SortEvent {
    sortBy: string;
    sortOrder: string
}

export interface PageEvent {
    activePage: number;
    rowsOnPage: number;
    dataLength: number;
}

export interface DataEvent {
    length: number;
}

export interface SelectEvent {

}

@Directive({
    selector: 'table[mfData]',
    exportAs: 'mfDataTable'
})
export class DataTable implements OnInit, DoCheck, OnChanges {

    @Input("mfData") public inputData: any[] = [];
    private inputDataLength: number;

    private sortBy = "";
    private sortOrder = "asc";

    @Input("mfRowsOnPage") public rowsOnPage = 1000;
    @Input("mfSaveRowsOnPage") public saveRowsOnPage = false;
    @Input("mfActivePage") public activePage = 1;

    @Output("mfSelectedEntities") public selectedEntitiesEmitter = new EventEmitter();
    public selectedEntities: any[] = [];

    private mustRecalculateData = false;

    public data: any[];

    public onDataChange = new EventEmitter<DataEvent>();
    public onSortChange = new EventEmitter<SortEvent>();
    public onPageChange = new EventEmitter<PageEvent>();
    public onSelectChange = new EventEmitter<SelectEvent>();

    constructor(private stateManager: StateManager) { }

    public addRemoveSelectedEntity($event: any) {
        this.onSelectChange.emit({});
        this.updateSelectedEntities();
        this.selectedEntitiesEmitter.emit(this.selectedEntities);
    }

    public updateSelectedEntities() {
        this.selectedEntities = this.inputData.filter(x => x.__isSelected__);
    }

    public selectAllRows() {
        this.inputData.forEach((data) => {
            if (data.hasOwnProperty('mfIsSelectable') == false
                || data.hasOwnProperty('mfIsSelectable') && data.mfIsSelectable) {
                data.__isSelected__ = true;
            }
        })
        this.updateSelectedEntities();
        this.selectedEntitiesEmitter.emit(this.selectedEntities);
    }

    public deselectAllRows() {
        this.inputData.forEach((data) => {
            data.__isSelected__ = false;
        })
        this.updateSelectedEntities();
        this.selectedEntitiesEmitter.emit(this.selectedEntities);
    }

    public getSort(): SortEvent {
        return { sortBy: this.sortBy, sortOrder: this.sortOrder };
    }

    public setSort(sortBy: string, sortOrder: string): void {
        if (this.sortBy !== sortBy || this.sortOrder !== sortOrder) {
            this.sortBy = sortBy;
            this.sortOrder = sortOrder;
            this.mustRecalculateData = true;
            this.onSortChange.emit({ sortBy: sortBy, sortOrder: sortOrder });
        }
    }

    public getPage(): PageEvent {
        return { activePage: this.activePage, rowsOnPage: this.rowsOnPage, dataLength: this.inputData.length };
    }

    public setPage(activePage: number, rowsOnPage: number): void {
        if (this.rowsOnPage !== rowsOnPage || this.activePage !== activePage) {
            this.activePage = this.activePage !== activePage ? activePage : this.calculateNewActivePage(this.rowsOnPage, rowsOnPage);
            if (this.saveRowsOnPage && (this.rowsOnPage != rowsOnPage)) {
                this.stateManager.setPagination(rowsOnPage.toString());
            }            
            this.rowsOnPage = rowsOnPage;
            this.mustRecalculateData = true;
            this.onPageChange.emit({ activePage: this.activePage, rowsOnPage: this.rowsOnPage, dataLength: this.inputData.length });
        }
    }

    private calculateNewActivePage(previousRowsOnPage: number, currentRowsOnPage: number): number {
        let firstRowOnPage = (this.activePage - 1) * previousRowsOnPage + 1;
        let newActivePage = Math.ceil(firstRowOnPage / currentRowsOnPage);
        return newActivePage;
    }

    public ngOnInit() {
        this.inputDataLength = this.inputData.length;
        if (this.saveRowsOnPage) {
            let rowsOnPage = this.stateManager.getPagination(this.rowsOnPage);
            this.setPage(1, rowsOnPage);
        }
    }

    public ngOnChanges(changes: { [key: string]: SimpleChange }): any {
        if (changes["inputData"]) {
            this.mustRecalculateData = true;
            this.ngDoCheck();
        }
    }

    private addIsSelectedProperty() {
        this.inputData.forEach(x => {
            if (x.__isSelected__ == null) {
                Object.defineProperty(x, "__isSelected__", { value: false, writable: true })
            }
        });
    }

    public ngDoCheck(): any {
        if (this.mustRecalculateData
            || this.isInputDataChanged() ) {
            this.addIsSelectedProperty();
            this.inputData = this.inputData || [];
            this.onPageChange.emit({
                activePage: this.activePage,
                rowsOnPage: this.rowsOnPage,
                dataLength: this.inputData.length
            });
            this.onDataChange.emit({
                length: this.inputData.length
            });
            this.fillData();
            this.mustRecalculateData = false;
        }
    }

    private isInputDataChanged(): boolean {
        let isDataLengthChanged = this.inputDataLength != this.inputData.length;
        this.inputDataLength = this.inputData.length;

        return isDataLengthChanged;
    }

    private fillData(): void {
        this.activePage = this.activePage;
        this.rowsOnPage = this.rowsOnPage;

        let offset = (this.activePage - 1) * this.rowsOnPage;
        let data = this.inputData;
        data = _.orderBy(data, (row)=>{
            var value = row[this.sortBy];
            if(value && typeof value === 'string' || value instanceof String) {
                return value.toLowerCase();
            }
            return value;
        }, [this.sortOrder]);
        data = _.slice(data, offset, offset + this.rowsOnPage);
        this.data = data;
    }
}
