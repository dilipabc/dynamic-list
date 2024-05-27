import * as i0 from '@angular/core';
import { Injectable, EventEmitter, Component, Input, Output, Directive, HostListener, NgModule } from '@angular/core';
import * as i1$1 from '@angular/forms';
import { Validators, ReactiveFormsModule } from '@angular/forms';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i3 from '@angular/router';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

class DynamicListService {
    constructor() { }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: DynamicListService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: DynamicListService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: DynamicListService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });

class PaginationComponent {
    constructor() {
        this.current = 0;
        this.total = 0;
        this.goTo = new EventEmitter();
        this.next = new EventEmitter();
        this.previous = new EventEmitter();
        this.pages = [];
    }
    ngOnInit() { }
    onGoTo(page) {
        this.goTo.emit(page);
    }
    onNext() {
        this.next.emit(this.current);
    }
    onPrevious() {
        this.previous.next(this.current);
    }
    ngOnChanges(changes) {
        if ((changes['current'] && changes['current'].currentValue) ||
            (changes['total'] && changes['total'].currentValue)) {
            this.pages = this.getPages(this.current, this.total);
        }
    }
    getPages(current, total) {
        if (total <= 7) {
            return [...Array(total).keys()].map(x => ++x);
        }
        if (current > 5) {
            if (current >= total - 4) {
                return [1, total - 5, total - 4, total - 3, total - 2, total - 1, total];
            }
            else {
                return [1, current - 2, current - 1, current, current + 1, current + 2, total];
            }
        }
        return [1, 2, 3, 4, 5, 6, total];
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: PaginationComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: PaginationComponent, selector: "app-pagination", inputs: { current: "current", total: "total" }, outputs: { goTo: "goTo", next: "next", previous: "previous" }, usesOnChanges: true, ngImport: i0, template: "<div class=\"container\">\n  <div class=\"pagination\">\n    <li *ngIf=\"current > 1\"><a href=\"javascript:void(0)\" [attr.aria-disabled]=\"current === 1\"\n        (click)=\"onPrevious()\">&laquo;</a></li>\n\n    <li *ngFor=\"let page of pages;\"><a href=\"javascript:void(0)\" [attr.aria-current]=\"page === current ? 'page' : null\"\n        [attr.aria-label]=\"\n          page === current ? 'Current Page, Page ' + page : 'Go to Page ' + page\n        \" [class.active]=\"page == current\" tabindex=\"0\" (click)=\"onGoTo(page)\"\n        (keyup.enter)=\"onGoTo(page)\">{{page}}</a></li>\n\n    <li *ngIf=\"current < total\"><a href=\"javascript:void(0)\" aria-label=\"Go To Next Page\"\n        [attr.aria-disabled]=\"current === total\" (click)=\"onNext()\">&raquo;</a></li>\n  </div>", styles: [".container{align-items:center;justify-content:center}.container .pagination{position:relative;height:60px;background:#ffffff0d;display:flex;align-items:center;justify-content:center;-webkit-backdrop-filter:blur(3px);backdrop-filter:blur(3px);border-radius:2px}.container .pagination li{list-style-type:none;display:inline-block}.container .pagination li a{position:relative;padding:20px 25px;text-decoration:none;color:#000;font-weight:400;font-size:18px}.container .pagination li a:hover,.container .pagination li.active a,.active{background:#fff3}\n"], dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: PaginationComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-pagination', template: "<div class=\"container\">\n  <div class=\"pagination\">\n    <li *ngIf=\"current > 1\"><a href=\"javascript:void(0)\" [attr.aria-disabled]=\"current === 1\"\n        (click)=\"onPrevious()\">&laquo;</a></li>\n\n    <li *ngFor=\"let page of pages;\"><a href=\"javascript:void(0)\" [attr.aria-current]=\"page === current ? 'page' : null\"\n        [attr.aria-label]=\"\n          page === current ? 'Current Page, Page ' + page : 'Go to Page ' + page\n        \" [class.active]=\"page == current\" tabindex=\"0\" (click)=\"onGoTo(page)\"\n        (keyup.enter)=\"onGoTo(page)\">{{page}}</a></li>\n\n    <li *ngIf=\"current < total\"><a href=\"javascript:void(0)\" aria-label=\"Go To Next Page\"\n        [attr.aria-disabled]=\"current === total\" (click)=\"onNext()\">&raquo;</a></li>\n  </div>", styles: [".container{align-items:center;justify-content:center}.container .pagination{position:relative;height:60px;background:#ffffff0d;display:flex;align-items:center;justify-content:center;-webkit-backdrop-filter:blur(3px);backdrop-filter:blur(3px);border-radius:2px}.container .pagination li{list-style-type:none;display:inline-block}.container .pagination li a{position:relative;padding:20px 25px;text-decoration:none;color:#000;font-weight:400;font-size:18px}.container .pagination li a:hover,.container .pagination li.active a,.active{background:#fff3}\n"] }]
        }], ctorParameters: function () { return []; }, propDecorators: { current: [{
                type: Input
            }], total: [{
                type: Input
            }], goTo: [{
                type: Output
            }], next: [{
                type: Output
            }], previous: [{
                type: Output
            }] } });

class SortDirective {
    constructor(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.sortKey = '';
        this.sorted = new EventEmitter();
        this.sortDirection = true; // true for ascending, false for descending
    }
    sortData() {
        this.sortDirection = !this.sortDirection; // toggle the direction
        let returnData = {
            sortKey: this.sortKey,
            sortDirection: this.sortDirection
        };
        this.sorted.emit(returnData);
        this.setArrowIcon();
    }
    setArrowIcon() {
        const upArrow = '\u25B2'; // Unicode for up arrow
        const downArrow = '\u25BC'; // Unicode for down arrow
        //console.log(this.el.nativeElement);
        // Remove existing arrow
        this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.el.nativeElement.innerHTML.replace(upArrow, '').replace(downArrow, ''));
        // Add new arrow
        this.renderer.appendChild(this.el.nativeElement, this.renderer.createText(this.sortDirection ? downArrow : upArrow));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: SortDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.2.12", type: SortDirective, selector: "[appSort]", inputs: { sortKey: "sortKey" }, outputs: { sorted: "sorted" }, host: { listeners: { "click": "sortData()" } }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: SortDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[appSort]'
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { sortKey: [{
                type: Input
            }], sorted: [{
                type: Output
            }], sortData: [{
                type: HostListener,
                args: ['click']
            }] } });

class DynamicListComponent {
    constructor(fb) {
        this.fb = fb;
        this.title = 'Dynamic List';
        this.itemTitles = [];
        this.actionMenus = [];
        this.items = [];
        this.funEnable = [];
        this.onGoPage = new EventEmitter();
        this.next = new EventEmitter();
        this.prev = new EventEmitter();
        this.toDel = new EventEmitter();
        this.toSort = new EventEmitter();
        this.toSearch = new EventEmitter();
        this.toReset = new EventEmitter();
        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.totalPages = 0;
        this.sortOrder = 'asc';
        this.sortBy = '';
        this.searchForm = this.fb.group({
            searchTerm: ['', Validators.required],
            searchBy: ['', Validators.required]
        });
    }
    ngOnInit() {
        //console.log(this.items)
    }
    ngOnChanges(changes) {
        //console.log(changes);
    }
    sort(sortedData) {
        this.toSort.emit(sortedData);
    }
    search() {
        this.toSearch.emit(this.searchForm.value);
    }
    reset() {
        this.searchForm.reset();
        this.toReset.emit(this.searchForm.value);
    }
    returnLength(items) {
        return items.length + 1;
    }
    goToPage(pageNo) {
        this.onGoPage.emit(pageNo);
    }
    nextPage(pageNo) {
        this.next.emit(pageNo);
    }
    prevPage(pageNo) {
        this.prev.emit(pageNo);
    }
    get searchTerm() {
        return this.searchForm.get('searchTerm');
    }
    get searchBy() {
        return this.searchForm.get('searchBy');
    }
    deleteItems(delId) {
        if (window.confirm('Are you sure you want to delete this user?')) {
            this.toDel.emit(delId);
        }
    }
    returnDeleteItemsId(item, key) {
        if (item[key]) {
            return item[key];
        }
        else {
            return;
        }
    }
    printTdValues(item, key) {
        let position = key.indexOf(".");
        if (position == -1) {
            if (item[key]) {
                return item[key];
            }
            else {
                return;
            }
        }
        else {
            const myArray = key.split(".");
            let result = Array.isArray(item[myArray[0]]);
            if (result == true) {
                if (myArray.length == 2) {
                    return item[myArray[0]][0][myArray[1]];
                }
                else if (myArray.length == 3) {
                    return item[myArray[0]][0][myArray[1]][myArray[2]];
                }
                else if (myArray.length == 4) {
                    return item[myArray[0]][0][myArray[1]][myArray[2]][myArray[3]];
                }
            }
            else {
                if (myArray.length == 2) {
                    return item[myArray[0]][myArray[1]];
                }
                else if (myArray.length == 3) {
                    return item[myArray[0]][myArray[1]][myArray[2]];
                }
                else if (myArray.length == 4) {
                    return item[myArray[0]][myArray[1]][myArray[2]][myArray[3]];
                }
            }
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: DynamicListComponent, deps: [{ token: i1$1.FormBuilder }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: DynamicListComponent, selector: "lib-dynamic-list", inputs: { title: "title", itemTitles: "itemTitles", paginationItems: "paginationItems", actionMenus: "actionMenus", items: "items", funEnable: "funEnable" }, outputs: { onGoPage: "onGoPage", next: "next", prev: "prev", toDel: "toDel", toSort: "toSort", toSearch: "toSearch", toReset: "toReset" }, usesOnChanges: true, ngImport: i0, template: `
    <div>
      <h2 class="mb-4">{{title}}</h2>
      <ng-container *ngIf="funEnable[0].searching == true">
        <form [formGroup]="searchForm" (ngSubmit)="search()">
          <div class="row m-2">
              <div class="col-lg-3">
                  <div class="input-group">
                      <label for="searchBy" class="input-group-addon mt-1 m-1" >Search By : </label>
                      <select id="searchBy" formControlName="searchBy" class="form-control">
                          <option value="">Select</option>
                          <ng-container *ngFor="let itemTitle of itemTitles">
                            <option *ngIf="itemTitle.isSearch == true"  value="{{itemTitle.key}}">{{itemTitle.value}}</option>
                          </ng-container>                        
                      </select>
                      <div class="validation" *ngIf="searchBy?.invalid && (searchBy?.dirty || searchBy?.touched)">
                          <small *ngIf="searchBy?.errors?.['required']">Search by is required.</small>
                      </div>
                  </div>
              </div>
              <div class="col-lg-6">
                  <div class="input-group">
                      <label for="searchTerm" class="input-group-addon mt-1 m-1">Search Key : </label>
                      <input id="searchTerm" formControlName="searchTerm" placeholder="Search" class="form-control"/>
                      <div class="validation" *ngIf="searchTerm?.invalid && (searchTerm?.dirty || searchTerm?.touched)">
                          <small *ngIf="searchTerm?.errors?.['required']">Search key is required.</small>
                      </div>
                  </div>
              </div>
              <div class="col-lg-3">
                  <div class="form-group mt-1">
                      <button type="submit" class="btn btn-primary" [disabled]="searchForm.invalid">Search</button>
                      &nbsp;&nbsp;
                      <button type="button" class="btn btn-secondary" (click)="reset()">Reset</button>

                  </div>
              </div>
          </div>    
        </form>
      </ng-container>
      <div class="table-responsive">
          <table class="table table-striped" #container>
              <thead>
                  <tr>
                      <ng-container *ngIf="funEnable[0].sorting == true">
                        <th scope="col" *ngFor="let itemTitle of itemTitles">
                            <span appSort sortKey="{{itemTitle.key}}" (sorted)="sort($event)" class="tableHead">
                              {{itemTitle?.value}}
                            </span>
                        </th>
                      </ng-container>
                      <ng-container *ngIf="funEnable[0].sorting == false">
                        <th scope="col" *ngFor="let itemTitle of itemTitles">
                              <span class="tableHead">
                                {{itemTitle?.value}}
                              </span>
                          </th>
                      </ng-container>
                      <th scope="col" style="text-align:center">Actions</th>
                  </tr>
              </thead>
              <tbody>
                  <tr *ngFor="let item of items; let  i = index">
                      <td *ngFor="let itemTitle of itemTitles">
                          {{printTdValues(item, itemTitle.key)}}
                      </td>
                      <td>
                          <nav class="nav">
                              <ng-container *ngFor="let actionMenu of actionMenus">
                                  <ng-container *ngIf="actionMenu.isConfirm == true">
                                      <a class="nav-link" href="javascript:void(0);"
                                          (click)="deleteItems(returnDeleteItemsId(item, actionMenu.fieldName))"
                                          title=" {{actionMenu.name}}">
                                          <ng-container *ngIf="actionMenu.iconUrl">
                                          <img src="{{actionMenu.iconUrl}}" width="50px" height="50px" alt="{{actionMenu.name}}"/>
                                          </ng-container>
                                          <ng-container  *ngIf="actionMenu.iconUrl == ''" >
                                            {{actionMenu.name}}
                                          </ng-container>
                                      </a>
                                  </ng-container>

                                  <ng-container *ngIf="actionMenu.isConfirm == false">
                                      <a class="nav-link" href="javascript:void(0);"
                                          routerLink="{{actionMenu.redirectUrl}}{{returnDeleteItemsId(item, actionMenu.fieldName)}}"
                                          title=" {{actionMenu.name}}">
                                          <ng-container *ngIf="actionMenu.iconUrl">
                                          <img src="{{actionMenu.iconUrl}}" width="50px" height="50px" alt="{{actionMenu.name}}"/>
                                          </ng-container>
                                          <ng-container  *ngIf="actionMenu.iconUrl == ''" >
                                            {{actionMenu.name}}
                                          </ng-container>

                                      </a>
                                  </ng-container>
                              </ng-container>
                          </nav>
                      </td>
                  </tr>
                  <tr *ngIf="items.length == 0">
                      <td class="norecord" [attr.colspan]=returnLength(itemTitles)>No record found.</td>
                  </tr>
              </tbody>
          </table>
          <div *ngIf="funEnable[0].pagination == true">
              <div class="pagination">
                  <span *ngIf="paginationItems.totalPages > 1">
                      <app-pagination [current]="paginationItems.currentPage" [total]="paginationItems.totalPages" (goTo)="goToPage($event)"
                          (next)="nextPage($event)" (previous)="prevPage($event)"></app-pagination>
                  </span>
              </div>
          </div>
      </div>
  </div>
  `, isInline: true, styles: [".validation{width:100%;text-align:end;color:red}.norecord{text-align:center;height:100px;padding-top:35px}table{width:100%;border-collapse:collapse}th,td{border:1px solid #ddd;padding:8px}th{cursor:pointer;background-color:#f2f2f2;-webkit-user-select:none;user-select:none}th:hover{background-color:#ddd}.pagination{display:block}.tableHead{width:100%!important;display:inline-block}\n"], dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1$1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1$1.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i1$1.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i1$1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1$1.SelectControlValueAccessor, selector: "select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]", inputs: ["compareWith"] }, { kind: "directive", type: i1$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1$1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1$1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1$1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "directive", type: i3.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: PaginationComponent, selector: "app-pagination", inputs: ["current", "total"], outputs: ["goTo", "next", "previous"] }, { kind: "directive", type: SortDirective, selector: "[appSort]", inputs: ["sortKey"], outputs: ["sorted"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: DynamicListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-dynamic-list', template: `
    <div>
      <h2 class="mb-4">{{title}}</h2>
      <ng-container *ngIf="funEnable[0].searching == true">
        <form [formGroup]="searchForm" (ngSubmit)="search()">
          <div class="row m-2">
              <div class="col-lg-3">
                  <div class="input-group">
                      <label for="searchBy" class="input-group-addon mt-1 m-1" >Search By : </label>
                      <select id="searchBy" formControlName="searchBy" class="form-control">
                          <option value="">Select</option>
                          <ng-container *ngFor="let itemTitle of itemTitles">
                            <option *ngIf="itemTitle.isSearch == true"  value="{{itemTitle.key}}">{{itemTitle.value}}</option>
                          </ng-container>                        
                      </select>
                      <div class="validation" *ngIf="searchBy?.invalid && (searchBy?.dirty || searchBy?.touched)">
                          <small *ngIf="searchBy?.errors?.['required']">Search by is required.</small>
                      </div>
                  </div>
              </div>
              <div class="col-lg-6">
                  <div class="input-group">
                      <label for="searchTerm" class="input-group-addon mt-1 m-1">Search Key : </label>
                      <input id="searchTerm" formControlName="searchTerm" placeholder="Search" class="form-control"/>
                      <div class="validation" *ngIf="searchTerm?.invalid && (searchTerm?.dirty || searchTerm?.touched)">
                          <small *ngIf="searchTerm?.errors?.['required']">Search key is required.</small>
                      </div>
                  </div>
              </div>
              <div class="col-lg-3">
                  <div class="form-group mt-1">
                      <button type="submit" class="btn btn-primary" [disabled]="searchForm.invalid">Search</button>
                      &nbsp;&nbsp;
                      <button type="button" class="btn btn-secondary" (click)="reset()">Reset</button>

                  </div>
              </div>
          </div>    
        </form>
      </ng-container>
      <div class="table-responsive">
          <table class="table table-striped" #container>
              <thead>
                  <tr>
                      <ng-container *ngIf="funEnable[0].sorting == true">
                        <th scope="col" *ngFor="let itemTitle of itemTitles">
                            <span appSort sortKey="{{itemTitle.key}}" (sorted)="sort($event)" class="tableHead">
                              {{itemTitle?.value}}
                            </span>
                        </th>
                      </ng-container>
                      <ng-container *ngIf="funEnable[0].sorting == false">
                        <th scope="col" *ngFor="let itemTitle of itemTitles">
                              <span class="tableHead">
                                {{itemTitle?.value}}
                              </span>
                          </th>
                      </ng-container>
                      <th scope="col" style="text-align:center">Actions</th>
                  </tr>
              </thead>
              <tbody>
                  <tr *ngFor="let item of items; let  i = index">
                      <td *ngFor="let itemTitle of itemTitles">
                          {{printTdValues(item, itemTitle.key)}}
                      </td>
                      <td>
                          <nav class="nav">
                              <ng-container *ngFor="let actionMenu of actionMenus">
                                  <ng-container *ngIf="actionMenu.isConfirm == true">
                                      <a class="nav-link" href="javascript:void(0);"
                                          (click)="deleteItems(returnDeleteItemsId(item, actionMenu.fieldName))"
                                          title=" {{actionMenu.name}}">
                                          <ng-container *ngIf="actionMenu.iconUrl">
                                          <img src="{{actionMenu.iconUrl}}" width="50px" height="50px" alt="{{actionMenu.name}}"/>
                                          </ng-container>
                                          <ng-container  *ngIf="actionMenu.iconUrl == ''" >
                                            {{actionMenu.name}}
                                          </ng-container>
                                      </a>
                                  </ng-container>

                                  <ng-container *ngIf="actionMenu.isConfirm == false">
                                      <a class="nav-link" href="javascript:void(0);"
                                          routerLink="{{actionMenu.redirectUrl}}{{returnDeleteItemsId(item, actionMenu.fieldName)}}"
                                          title=" {{actionMenu.name}}">
                                          <ng-container *ngIf="actionMenu.iconUrl">
                                          <img src="{{actionMenu.iconUrl}}" width="50px" height="50px" alt="{{actionMenu.name}}"/>
                                          </ng-container>
                                          <ng-container  *ngIf="actionMenu.iconUrl == ''" >
                                            {{actionMenu.name}}
                                          </ng-container>

                                      </a>
                                  </ng-container>
                              </ng-container>
                          </nav>
                      </td>
                  </tr>
                  <tr *ngIf="items.length == 0">
                      <td class="norecord" [attr.colspan]=returnLength(itemTitles)>No record found.</td>
                  </tr>
              </tbody>
          </table>
          <div *ngIf="funEnable[0].pagination == true">
              <div class="pagination">
                  <span *ngIf="paginationItems.totalPages > 1">
                      <app-pagination [current]="paginationItems.currentPage" [total]="paginationItems.totalPages" (goTo)="goToPage($event)"
                          (next)="nextPage($event)" (previous)="prevPage($event)"></app-pagination>
                  </span>
              </div>
          </div>
      </div>
  </div>
  `, styles: [".validation{width:100%;text-align:end;color:red}.norecord{text-align:center;height:100px;padding-top:35px}table{width:100%;border-collapse:collapse}th,td{border:1px solid #ddd;padding:8px}th{cursor:pointer;background-color:#f2f2f2;-webkit-user-select:none;user-select:none}th:hover{background-color:#ddd}.pagination{display:block}.tableHead{width:100%!important;display:inline-block}\n"] }]
        }], ctorParameters: function () { return [{ type: i1$1.FormBuilder }]; }, propDecorators: { title: [{
                type: Input
            }], itemTitles: [{
                type: Input
            }], paginationItems: [{
                type: Input
            }], actionMenus: [{
                type: Input
            }], items: [{
                type: Input
            }], funEnable: [{
                type: Input
            }], onGoPage: [{
                type: Output
            }], next: [{
                type: Output
            }], prev: [{
                type: Output
            }], toDel: [{
                type: Output
            }], toSort: [{
                type: Output
            }], toSearch: [{
                type: Output
            }], toReset: [{
                type: Output
            }] } });

class DynamicListModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: DynamicListModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: DynamicListModule, declarations: [DynamicListComponent, PaginationComponent, SortDirective], imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule], exports: [DynamicListComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: DynamicListModule, imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: DynamicListModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [DynamicListComponent, PaginationComponent, SortDirective],
                    imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule],
                    exports: [DynamicListComponent]
                }]
        }] });

/*
 * Public API Surface of dynamic-list
 */

/**
 * Generated bundle index. Do not edit.
 */

export { DynamicListComponent, DynamicListModule, DynamicListService };
//# sourceMappingURL=dynamic-list-page.mjs.map
