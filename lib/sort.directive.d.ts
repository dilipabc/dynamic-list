import { ElementRef, EventEmitter, Renderer2 } from '@angular/core';
import * as i0 from "@angular/core";
export declare class SortDirective {
    private el;
    private renderer;
    sortKey: string;
    sorted: EventEmitter<any[]>;
    private sortDirection;
    constructor(el: ElementRef, renderer: Renderer2);
    sortData(): void;
    private setArrowIcon;
    static ɵfac: i0.ɵɵFactoryDeclaration<SortDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<SortDirective, "[appSort]", never, { "sortKey": { "alias": "sortKey"; "required": false; }; }, { "sorted": "sorted"; }, never, never, false, never>;
}
