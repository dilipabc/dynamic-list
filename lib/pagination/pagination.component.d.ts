import { OnInit, EventEmitter, SimpleChanges } from '@angular/core';
import * as i0 from "@angular/core";
export declare class PaginationComponent implements OnInit {
    current: number;
    total: number;
    goTo: EventEmitter<number>;
    next: EventEmitter<number>;
    previous: EventEmitter<number>;
    pages: number[];
    constructor();
    ngOnInit(): void;
    onGoTo(page: number): void;
    onNext(): void;
    onPrevious(): void;
    ngOnChanges(changes: SimpleChanges): void;
    private getPages;
    static ɵfac: i0.ɵɵFactoryDeclaration<PaginationComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PaginationComponent, "app-pagination", never, { "current": { "alias": "current"; "required": false; }; "total": { "alias": "total"; "required": false; }; }, { "goTo": "goTo"; "next": "next"; "previous": "previous"; }, never, never, false, never>;
}
