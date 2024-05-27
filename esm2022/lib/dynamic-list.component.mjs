import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Validators } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@angular/common";
import * as i3 from "@angular/router";
import * as i4 from "./pagination/pagination.component";
import * as i5 from "./sort.directive";
export class DynamicListComponent {
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: DynamicListComponent, deps: [{ token: i1.FormBuilder }], target: i0.ɵɵFactoryTarget.Component }); }
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
                                          {{actionMenu.name}}
                                      </a>
                                  </ng-container>

                                  <ng-container *ngIf="actionMenu.isConfirm == false">

                                      <a class="nav-link" href="javascript:void(0);"
                                          routerLink="{{actionMenu.ridirectUrl}}{{returnDeleteItemsId(item, actionMenu.fieldName)}}"
                                          title=" {{actionMenu.name}}">
                                          {{actionMenu.name}}
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
  `, isInline: true, styles: [".validation{width:100%;text-align:end;color:red}.norecord{text-align:center;height:100px;padding-top:35px}table{width:100%;border-collapse:collapse}th,td{border:1px solid #ddd;padding:8px}th{cursor:pointer;background-color:#f2f2f2;-webkit-user-select:none;user-select:none}th:hover{background-color:#ddd}.pagination{display:block}.tableHead{width:100%!important;display:inline-block}\n"], dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i1.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1.SelectControlValueAccessor, selector: "select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]", inputs: ["compareWith"] }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "directive", type: i3.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: i4.PaginationComponent, selector: "app-pagination", inputs: ["current", "total"], outputs: ["goTo", "next", "previous"] }, { kind: "directive", type: i5.SortDirective, selector: "[appSort]", inputs: ["sortKey"], outputs: ["sorted"] }] }); }
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
                                          {{actionMenu.name}}
                                      </a>
                                  </ng-container>

                                  <ng-container *ngIf="actionMenu.isConfirm == false">

                                      <a class="nav-link" href="javascript:void(0);"
                                          routerLink="{{actionMenu.ridirectUrl}}{{returnDeleteItemsId(item, actionMenu.fieldName)}}"
                                          title=" {{actionMenu.name}}">
                                          {{actionMenu.name}}
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
        }], ctorParameters: function () { return [{ type: i1.FormBuilder }]; }, propDecorators: { title: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2R5bmFtaWMtbGlzdC9zcmMvbGliL2R5bmFtaWMtbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsWUFBWSxFQUFFLE1BQU0sRUFBNEIsTUFBTSxlQUFlLENBQUM7QUFDekcsT0FBTyxFQUEwQixVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7OztBQTRKcEUsTUFBTSxPQUFPLG9CQUFvQjtJQStCL0IsWUFBb0IsRUFBZTtRQUFmLE9BQUUsR0FBRixFQUFFLENBQWE7UUEzQjFCLFVBQUssR0FBVyxjQUFjLENBQUM7UUFFL0IsZUFBVSxHQUFzQixFQUFFLENBQUM7UUFFbkMsZ0JBQVcsR0FBdUIsRUFBRSxDQUFDO1FBQ3JDLFVBQUssR0FBK0IsRUFBRSxDQUFDO1FBQ3ZDLGNBQVMsR0FBMkIsRUFBRSxDQUFDO1FBR3RDLGFBQVEsR0FBeUIsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUM1RCxTQUFJLEdBQXlCLElBQUksWUFBWSxFQUFVLENBQUM7UUFDeEQsU0FBSSxHQUF5QixJQUFJLFlBQVksRUFBVSxDQUFDO1FBRXhELFVBQUssR0FBeUIsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUN6RCxXQUFNLEdBQXlCLElBQUksWUFBWSxFQUFVLENBQUM7UUFDMUQsYUFBUSxHQUF5QixJQUFJLFlBQVksRUFBVSxDQUFDO1FBQzVELFlBQU8sR0FBeUIsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUlyRSxnQkFBVyxHQUFXLENBQUMsQ0FBQztRQUN4QixpQkFBWSxHQUFXLEVBQUUsQ0FBQztRQUMxQixlQUFVLEdBQVcsQ0FBQyxDQUFDO1FBRXZCLGNBQVMsR0FBVyxLQUFLLENBQUM7UUFDMUIsV0FBTSxHQUFXLEVBQUUsQ0FBQztRQUdsQixJQUFJLENBQUMs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QUFDLENBQUMsQ0FBQyxDQUFDO2lCQUM3RDthQUNGO1NBQ0Y7SUFDSCxDQUFDOytHQXBJVSxvQkFBb0I7bUdBQXBCLG9CQUFvQixzWEF2SnJCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdHVDs7NEZBK0NVLG9CQUFvQjtrQkF6SmhDLFNBQVM7K0JBQ0Usa0JBQWtCLFlBQ2xCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdHVDtrR0FtRFEsS0FBSztzQkFBYixLQUFLO2dCQUVHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBQ0csZUFBZTtzQkFBdkIsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLEtBQUs7c0JBQWIsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUdJLFFBQVE7c0JBQWpCLE1BQU07Z0JBQ0csSUFBSTtzQkFBYixNQUFNO2dCQUNHLElBQUk7c0JBQWIsTUFBTTtnQkFFRyxLQUFLO3NCQUFkLE1BQU07Z0JBQ0csTUFBTTtzQkFBZixNQUFNO2dCQUNHLFFBQVE7c0JBQWpCLE1BQU07Z0JBQ0csT0FBTztzQkFBaEIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgRXZlbnRFbWl0dGVyLCBPdXRwdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IER5bmFtaWNLZXlJbnRlcmZhY2UsIEFjdGlvbk1lbnVzLCBJdGVtVGl0bGVzLCBQYWdpbmF0aW9uSXRlbXMsIEZ1bmN0aW9uRW5hYmxlIH0gZnJvbSAnLi9kYXRhVHlwZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpYi1keW5hbWljLWxpc3QnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXY+XG4gICAgICA8aDIgY2xhc3M9XCJtYi00XCI+e3t0aXRsZX19PC9oMj5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJmdW5FbmFibGVbMF0uc2VhcmNoaW5nID09IHRydWVcIj5cbiAgICAgICAgPGZvcm0gW2Zvcm1Hcm91cF09XCJzZWFyY2hGb3JtXCIgKG5nU3VibWl0KT1cInNlYXJjaCgpXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBtLTJcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1sZy0zXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwic2VhcmNoQnlcIiBjbGFzcz1cImlucHV0LWdyb3VwLWFkZG9uIG10LTEgbS0xXCIgPlNlYXJjaCBCeSA6IDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBpZD1cInNlYXJjaEJ5XCIgZm9ybUNvbnRyb2xOYW1lPVwic2VhcmNoQnlcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiXCI+U2VsZWN0PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGl0ZW1UaXRsZSBvZiBpdGVtVGl0bGVzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiAqbmdJZj1cIml0ZW1UaXRsZS5pc1NlYXJjaCA9PSB0cnVlXCIgIHZhbHVlPVwie3tpdGVtVGl0bGUua2V5fX1cIj57e2l0ZW1UaXRsZS52YWx1ZX19PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ2YWxpZGF0aW9uXCIgKm5nSWY9XCJzZWFyY2hCeT8uaW52YWxpZCAmJiAoc2VhcmNoQnk/LmRpcnR5IHx8IHNlYXJjaEJ5Py50b3VjaGVkKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c21hbGwgKm5nSWY9XCJzZWFyY2hCeT8uZXJyb3JzPy5bJ3JlcXVpcmVkJ11cIj5TZWFyY2ggYnkgaXMgcmVxdWlyZWQuPC9zbWFsbD5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1sZy02XCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwic2VhcmNoVGVybVwiIGNsYXNzPVwiaW5wdXQtZ3JvdXAtYWRkb24gbXQtMSBtLTFcIj5TZWFyY2ggS2V5IDogPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9XCJzZWFyY2hUZXJtXCIgZm9ybUNvbnRyb2xOYW1lPVwic2VhcmNoVGVybVwiIHBsYWNlaG9sZGVyPVwiU2VhcmNoXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIi8+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInZhbGlkYXRpb25cIiAqbmdJZj1cInNlYXJjaFRlcm0/LmludmFsaWQgJiYgKHNlYXJjaFRlcm0/LmRpcnR5IHx8IHNlYXJjaFRlcm0/LnRvdWNoZWQpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzbWFsbCAqbmdJZj1cInNlYXJjaFRlcm0/LmVycm9ycz8uWydyZXF1aXJlZCddXCI+U2VhcmNoIGtleSBpcyByZXF1aXJlZC48L3NtYWxsPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLWxnLTNcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIG10LTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiIFtkaXNhYmxlZF09XCJzZWFyY2hGb3JtLmludmFsaWRcIj5TZWFyY2g8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAmbmJzcDsmbmJzcDtcbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tc2Vjb25kYXJ5XCIgKGNsaWNrKT1cInJlc2V0KClcIj5SZXNldDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+ICAgIFxuICAgICAgICA8L2Zvcm0+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZS1yZXNwb25zaXZlXCI+XG4gICAgICAgICAgPHRhYmxlIGNsYXNzPVwidGFibGUgdGFibGUtc3RyaXBlZFwiICNjb250YWluZXI+XG4gICAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiZnVuRW5hYmxlWzBdLnNvcnRpbmcgPT0gdHJ1ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoIHNjb3BlPVwiY29sXCIgKm5nRm9yPVwibGV0IGl0ZW1UaXRsZSBvZiBpdGVtVGl0bGVzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gYXBwU29ydCBzb3J0S2V5PVwie3tpdGVtVGl0bGUua2V5fX1cIiAoc29ydGVkKT1cInNvcnQoJGV2ZW50KVwiIGNsYXNzPVwidGFibGVIZWFkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7e2l0ZW1UaXRsZT8udmFsdWV9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImZ1bkVuYWJsZVswXS5zb3J0aW5nID09IGZhbHNlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGggc2NvcGU9XCJjb2xcIiAqbmdGb3I9XCJsZXQgaXRlbVRpdGxlIG9mIGl0ZW1UaXRsZXNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGFibGVIZWFkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7aXRlbVRpdGxlPy52YWx1ZX19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgPHRoIHNjb3BlPVwiY29sXCIgc3R5bGU9XCJ0ZXh0LWFsaWduOmNlbnRlclwiPkFjdGlvbnM8L3RoPlxuICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgICAgPHRyICpuZ0Zvcj1cImxldCBpdGVtIG9mIGl0ZW1zOyBsZXQgIGkgPSBpbmRleFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDx0ZCAqbmdGb3I9XCJsZXQgaXRlbVRpdGxlIG9mIGl0ZW1UaXRsZXNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge3twcmludFRkVmFsdWVzKGl0ZW0sIGl0ZW1UaXRsZS5rZXkpfX1cbiAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPG5hdiBjbGFzcz1cIm5hdlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgYWN0aW9uTWVudSBvZiBhY3Rpb25NZW51c1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJhY3Rpb25NZW51LmlzQ29uZmlybSA9PSB0cnVlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwibmF2LWxpbmtcIiBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApO1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwiZGVsZXRlSXRlbXMocmV0dXJuRGVsZXRlSXRlbXNJZChpdGVtLCBhY3Rpb25NZW51LmZpZWxkTmFtZSkpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPVwiIHt7YWN0aW9uTWVudS5uYW1lfX1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7YWN0aW9uTWVudS5uYW1lfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImFjdGlvbk1lbnUuaXNDb25maXJtID09IGZhbHNlXCI+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJuYXYtbGlua1wiIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMCk7XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdXRlckxpbms9XCJ7e2FjdGlvbk1lbnUucmlkaXJlY3RVcmx9fXt7cmV0dXJuRGVsZXRlSXRlbXNJZChpdGVtLCBhY3Rpb25NZW51LmZpZWxkTmFtZSl9fVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZT1cIiB7e2FjdGlvbk1lbnUubmFtZX19XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7e2FjdGlvbk1lbnUubmFtZX19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L25hdj5cbiAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgIDx0ciAqbmdJZj1cIml0ZW1zLmxlbmd0aCA9PSAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwibm9yZWNvcmRcIiBbYXR0ci5jb2xzcGFuXT1yZXR1cm5MZW5ndGgoaXRlbVRpdGxlcyk+Tm8gcmVjb3JkIGZvdW5kLjwvdGQ+XG4gICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgPGRpdiAqbmdJZj1cImZ1bkVuYWJsZVswXS5wYWdpbmF0aW9uID09IHRydWVcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBhZ2luYXRpb25cIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwicGFnaW5hdGlvbkl0ZW1zLnRvdGFsUGFnZXMgPiAxXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGFwcC1wYWdpbmF0aW9uIFtjdXJyZW50XT1cInBhZ2luYXRpb25JdGVtcy5jdXJyZW50UGFnZVwiIFt0b3RhbF09XCJwYWdpbmF0aW9uSXRlbXMudG90YWxQYWdlc1wiIChnb1RvKT1cImdvVG9QYWdlKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAobmV4dCk9XCJuZXh0UGFnZSgkZXZlbnQpXCIgKHByZXZpb3VzKT1cInByZXZQYWdlKCRldmVudClcIj48L2FwcC1wYWdpbmF0aW9uPlxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICA8L2Rpdj5cbiAgYCxcbiAgc3R5bGVzOiBbXG4gICAgYFxuICAgIC52YWxpZGF0aW9uIHtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgdGV4dC1hbGlnbjogZW5kO1xuICAgICAgY29sb3I6ICNmMDA7XG4gICAgfVxuXG4gICAgLm5vcmVjb3JkIHtcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgIGhlaWdodDogMTAwcHg7XG4gICAgICBwYWRkaW5nLXRvcDogMzVweDtcbiAgICB9XG5cbiAgICB0YWJsZSB7XG4gICAgICB3aWR0aDogMTAwJTtcbiAgICAgIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XG4gICAgfVxuXG4gICAgdGgsIHRkIHtcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7XG4gICAgICBwYWRkaW5nOiA4cHg7XG4gICAgfVxuXG4gICAgdGgge1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2YyZjJmMjtcbiAgICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgIH1cblxuICAgIHRoOmhvdmVyIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNkZGQ7XG4gICAgfVxuXG4gICAgLnBhZ2luYXRpb24ge1xuICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgfVxuICAgIC50YWJsZUhlYWQgIHtcbiAgICAgIHdpZHRoOiAxMDAlICEgaW1wb3J0YW50OyAgICAgIFxuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIH1cblxuXG4gICAgYFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIER5bmFtaWNMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuXG5cblxuICBASW5wdXQoKSB0aXRsZTogc3RyaW5nID0gJ0R5bmFtaWMgTGlzdCc7XG5cbiAgQElucHV0KCkgaXRlbVRpdGxlczogQXJyYXk8SXRlbVRpdGxlcz4gPSBbXTtcbiAgQElucHV0KCkgcGFnaW5hdGlvbkl0ZW1zOiBQYWdpbmF0aW9uSXRlbXMgfCBhbnk7XG4gIEBJbnB1dCgpIGFjdGlvbk1lbnVzOiBBcnJheTxBY3Rpb25NZW51cz4gPSBbXTtcbiAgQElucHV0KCkgaXRlbXM6IEFycmF5PER5bmFtaWNLZXlJbnRlcmZhY2U+ID0gW107XG4gIEBJbnB1dCgpIGZ1bkVuYWJsZSA6IEFycmF5PEZ1bmN0aW9uRW5hYmxlPiA9IFtdO1xuXG5cbiAgQE91dHB1dCgpIG9uR29QYWdlOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuICBAT3V0cHV0KCkgbmV4dDogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcbiAgQE91dHB1dCgpIHByZXY6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG5cbiAgQE91dHB1dCgpIHRvRGVsOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuICBAT3V0cHV0KCkgdG9Tb3J0OiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuICBAT3V0cHV0KCkgdG9TZWFyY2g6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG4gIEBPdXRwdXQoKSB0b1Jlc2V0OiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG4gIHNlYXJjaEZvcm06IEZvcm1Hcm91cDtcblxuICBjdXJyZW50UGFnZTogbnVtYmVyID0gMTtcbiAgaXRlbXNQZXJQYWdlOiBudW1iZXIgPSAxMDtcbiAgdG90YWxQYWdlczogbnVtYmVyID0gMDtcblxuICBzb3J0T3JkZXI6IHN0cmluZyA9ICdhc2MnO1xuICBzb3J0Qnk6IHN0cmluZyA9ICcnO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZmI6IEZvcm1CdWlsZGVyKSB7XG4gICAgdGhpcy5zZWFyY2hGb3JtID0gdGhpcy5mYi5ncm91cCh7XG4gICAgICBzZWFyY2hUZXJtOiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxuICAgICAgc2VhcmNoQnk6IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF1cbiAgICB9KTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIC8vY29uc29sZS5sb2codGhpcy5pdGVtcylcblxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuXG4gICAgLy9jb25zb2xlLmxvZyhjaGFuZ2VzKTtcbiAgfVxuXG4gIHNvcnQoc29ydGVkRGF0YTogYW55KSB7XG4gICAgdGhpcy50b1NvcnQuZW1pdChzb3J0ZWREYXRhKTtcbiAgfVxuXG4gIHNlYXJjaCgpIHtcbiAgICB0aGlzLnRvU2VhcmNoLmVtaXQodGhpcy5zZWFyY2hGb3JtLnZhbHVlKTtcbiAgfVxuXG4gIHJlc2V0KCkge1xuICAgIHRoaXMuc2VhcmNoRm9ybS5yZXNldCgpO1xuICAgIHRoaXMudG9SZXNldC5lbWl0KHRoaXMuc2VhcmNoRm9ybS52YWx1ZSk7XG4gIH1cblxuICByZXR1cm5MZW5ndGgoaXRlbXM6IGFueSkge1xuICAgIHJldHVybiBpdGVtcy5sZW5ndGggKyAxO1xuICB9XG5cbiAgZ29Ub1BhZ2UocGFnZU5vOiBudW1iZXIpIHtcbiAgICB0aGlzLm9uR29QYWdlLmVtaXQocGFnZU5vKTtcbiAgfVxuXG4gIG5leHRQYWdlKHBhZ2VObzogbnVtYmVyKSB7XG4gICAgdGhpcy5uZXh0LmVtaXQocGFnZU5vKTtcbiAgfVxuXG4gIHByZXZQYWdlKHBhZ2VObzogbnVtYmVyKSB7XG4gICAgdGhpcy5wcmV2LmVtaXQocGFnZU5vKTtcbiAgfVxuXG5cbiAgZ2V0IHNlYXJjaFRlcm0oKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VhcmNoRm9ybS5nZXQoJ3NlYXJjaFRlcm0nKTtcbiAgfVxuXG4gIGdldCBzZWFyY2hCeSgpIHtcbiAgICByZXR1cm4gdGhpcy5zZWFyY2hGb3JtLmdldCgnc2VhcmNoQnknKTtcbiAgfVxuXG5cbiAgcHVibGljIGRlbGV0ZUl0ZW1zKGRlbElkOiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAod2luZG93LmNvbmZpcm0oJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgdGhpcyB1c2VyPycpKSB7XG4gICAgICB0aGlzLnRvRGVsLmVtaXQoZGVsSWQpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybkRlbGV0ZUl0ZW1zSWQoaXRlbTogYW55LCBrZXk6IGFueSkge1xuICAgIGlmIChpdGVtW2tleV0pIHtcbiAgICAgIHJldHVybiBpdGVtW2tleV07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cblxuICBwcmludFRkVmFsdWVzKGl0ZW06IGFueSwga2V5OiBzdHJpbmcpOiB2b2lkIHtcblxuICAgIGxldCBwb3NpdGlvbiA9IGtleS5pbmRleE9mKFwiLlwiKTsgXG4gICAgaWYgKHBvc2l0aW9uID09IC0xKSB7XG4gICAgICBpZiAoaXRlbVtrZXldKSB7XG4gICAgICAgIHJldHVybiBpdGVtW2tleV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfWVsc2V7XG4gICAgICBjb25zdCBteUFycmF5ID0ga2V5LnNwbGl0KFwiLlwiKTtcbiAgICAgIGxldCByZXN1bHQgPSAgQXJyYXkuaXNBcnJheShpdGVtW215QXJyYXlbMF1dKTtcbiAgICAgIGlmKHJlc3VsdCA9PSB0cnVlKXtcbiAgICAgICAgXG4gICAgICAgIGlmKG15QXJyYXkubGVuZ3RoID09IDIpe1xuICAgICAgICAgIHJldHVybiBpdGVtW215QXJyYXlbMF1dWzBdW215QXJyYXlbMV1dO1xuICAgICAgICB9ZWxzZSBpZihteUFycmF5Lmxlbmd0aCA9PSAzKXtcbiAgICAgICAgICByZXR1cm4gaXRlbVtteUFycmF5WzBdXVswXVtteUFycmF5WzFdXVtteUFycmF5WzJdXTtcbiAgICAgICAgfWVsc2UgaWYobXlBcnJheS5sZW5ndGggPT0gNCl7XG4gICAgICAgICAgcmV0dXJuIGl0ZW1bbXlBcnJheVswXV1bMF1bbXlBcnJheVsxXV1bbXlBcnJheVsyXV1bbXlBcnJheVszXV07XG4gICAgICAgIH1cbiAgICAgIH1lbHNle1xuICAgICAgICBpZihteUFycmF5Lmxlbmd0aCA9PSAyKXtcbiAgICAgICAgICByZXR1cm4gaXRlbVtteUFycmF5WzBdXVtteUFycmF5WzFdXTtcbiAgICAgICAgfWVsc2UgaWYobXlBcnJheS5sZW5ndGggPT0gMyl7XG4gICAgICAgICAgcmV0dXJuIGl0ZW1bbXlBcnJheVswXV1bbXlBcnJheVsxXV1bbXlBcnJheVsyXV07XG4gICAgICAgIH1lbHNlIGlmKG15QXJyYXkubGVuZ3RoID09IDQpe1xuICAgICAgICAgIHJldHVybiBpdGVtW215QXJyYXlbMF1dW215QXJyYXlbMV1dW215QXJyYXlbMl1dW215QXJyYXlbM11dO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cblxufSJdfQ==