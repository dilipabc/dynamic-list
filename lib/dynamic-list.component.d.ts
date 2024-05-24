import { OnInit, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicKeyInterface, ActionMenus, ItemTitles, PaginationItems } from './dataType';
import * as i0 from "@angular/core";
export declare class DynamicListComponent implements OnInit, OnChanges {
    private fb;
    title: string;
    itemTitles: Array<ItemTitles>;
    paginationItems: PaginationItems | any;
    actionMenus: Array<ActionMenus>;
    items: Array<DynamicKeyInterface>;
    onGoPage: EventEmitter<number>;
    next: EventEmitter<number>;
    prev: EventEmitter<number>;
    toDel: EventEmitter<number>;
    toSort: EventEmitter<number>;
    toSearch: EventEmitter<number>;
    toReset: EventEmitter<number>;
    searchForm: FormGroup;
    currentPage: number;
    itemsPerPage: number;
    totalPages: number;
    sortOrder: string;
    sortBy: string;
    constructor(fb: FormBuilder);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    sort(sortedData: any): void;
    search(): void;
    reset(): void;
    returnLength(items: any): any;
    goToPage(pageNo: number): void;
    nextPage(pageNo: number): void;
    prevPage(pageNo: number): void;
    get searchTerm(): import("@angular/forms").AbstractControl<any, any> | null;
    get searchBy(): import("@angular/forms").AbstractControl<any, any> | null;
    deleteItems(delId: number): void;
    returnDeleteItemsId(item: any, key: any): any;
    printTdValues(item: any, key: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DynamicListComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DynamicListComponent, "lib-dynamic-list", never, { "title": { "alias": "title"; "required": false; }; "itemTitles": { "alias": "itemTitles"; "required": false; }; "paginationItems": { "alias": "paginationItems"; "required": false; }; "actionMenus": { "alias": "actionMenus"; "required": false; }; "items": { "alias": "items"; "required": false; }; }, { "onGoPage": "onGoPage"; "next": "next"; "prev": "prev"; "toDel": "toDel"; "toSort": "toSort"; "toSearch": "toSearch"; "toReset": "toReset"; }, never, never, false, never>;
}
