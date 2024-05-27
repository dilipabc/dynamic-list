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
                return item[myArray[0]][0][myArray[1]];
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
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: DynamicListComponent, selector: "lib-dynamic-list", inputs: { title: "title", itemTitles: "itemTitles", paginationItems: "paginationItems", actionMenus: "actionMenus", items: "items" }, outputs: { onGoPage: "onGoPage", next: "next", prev: "prev", toDel: "toDel", toSort: "toSort", toSearch: "toSearch", toReset: "toReset" }, usesOnChanges: true, ngImport: i0, template: `
    <div>
      <h2 class="mb-4">{{title}}</h2>
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
      <div class="table-responsive">
          <table class="table table-striped" #container>
              <thead>
                  <tr>
                      <th scope="col" *ngFor="let itemTitle of itemTitles">
                          <span appSort sortKey="{{itemTitle.key}}" (sorted)="sort($event)" class="tableHead">
                            {{itemTitle?.value}}
                          </span>
                      </th>
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
          <div>
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
      <div class="table-responsive">
          <table class="table table-striped" #container>
              <thead>
                  <tr>
                      <th scope="col" *ngFor="let itemTitle of itemTitles">
                          <span appSort sortKey="{{itemTitle.key}}" (sorted)="sort($event)" class="tableHead">
                            {{itemTitle?.value}}
                          </span>
                      </th>
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
          <div>
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2R5bmFtaWMtbGlzdC9zcmMvbGliL2R5bmFtaWMtbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsWUFBWSxFQUFFLE1BQU0sRUFBNEIsTUFBTSxlQUFlLENBQUM7QUFDekcsT0FBTyxFQUEwQixVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7OztBQWlKcEUsTUFBTSxPQUFPLG9CQUFvQjtJQThCL0IsWUFBb0IsRUFBZTtRQUFmLE9BQUUsR0FBRixFQUFFLENBQWE7UUExQjFCLFVBQUssR0FBVyxjQUFjLENBQUM7UUFFL0IsZUFBVSxHQUFzQixFQUFFLENBQUM7UUFFbkMsZ0JBQVcsR0FBdUIsRUFBRSxDQUFDO1FBQ3JDLFVBQUssR0FBK0IsRUFBRSxDQUFDO1FBR3RDLGFBQVEsR0FBeUIsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUM1RCxTQUFJLEdBQXlCLElBQUksWUFBWSxFQUFVLENBQUM7UUFDeEQsU0FBSSxHQUF5QixJQUFJLFlBQVksRUFBVSxDQUFDO1FBRXhELFVBQUssR0FBeUIsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUN6RCxXQUFNLEdBQXlCLElBQUksWUFBWSxFQUFVLENBQUM7UUFDMUQsYUFBUSxHQUF5QixJQUFJLFlBQVksRUFBVSxDQUFDO1FBQzVELFlBQU8sR0FBeUIsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUlyRSxnQkFBVyxHQUFXLENBQUMsQ0FBQztRQUN4QixpQkFBWSxHQUFXLEVBQUUsQ0FBQztRQUMxQixlQUFVLEdBQVcsQ0FBQyxDQUFDO1FBRXZCLGNBQVMsR0FBVyxLQUFLLENBQUM7UUFDMUIsV0FBTSxHQUFXLEVBQUUsQ0FBQztRQUdsQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxFQUFFLENB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QixNQUFNO2dCQUNHLElBQUk7c0JBQWIsTUFBTTtnQkFDRyxJQUFJO3NCQUFiLE1BQU07Z0JBRUcsS0FBSztzQkFBZCxNQUFNO2dCQUNHLE1BQU07c0JBQWYsTUFBTTtnQkFDRyxRQUFRO3NCQUFqQixNQUFNO2dCQUNHLE9BQU87c0JBQWhCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIEV2ZW50RW1pdHRlciwgT3V0cHV0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1CdWlsZGVyLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEeW5hbWljS2V5SW50ZXJmYWNlLCBBY3Rpb25NZW51cywgSXRlbVRpdGxlcywgUGFnaW5hdGlvbkl0ZW1zIH0gZnJvbSAnLi9kYXRhVHlwZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpYi1keW5hbWljLWxpc3QnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXY+XG4gICAgICA8aDIgY2xhc3M9XCJtYi00XCI+e3t0aXRsZX19PC9oMj5cbiAgICAgIDxmb3JtIFtmb3JtR3JvdXBdPVwic2VhcmNoRm9ybVwiIChuZ1N1Ym1pdCk9XCJzZWFyY2goKVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93IG0tMlwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1sZy0zXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJzZWFyY2hCeVwiIGNsYXNzPVwiaW5wdXQtZ3JvdXAtYWRkb24gbXQtMSBtLTFcIiA+U2VhcmNoIEJ5IDogPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBpZD1cInNlYXJjaEJ5XCIgZm9ybUNvbnRyb2xOYW1lPVwic2VhcmNoQnlcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlwiPlNlbGVjdDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgaXRlbVRpdGxlIG9mIGl0ZW1UaXRsZXNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiAqbmdJZj1cIml0ZW1UaXRsZS5pc1NlYXJjaCA9PSB0cnVlXCIgIHZhbHVlPVwie3tpdGVtVGl0bGUua2V5fX1cIj57e2l0ZW1UaXRsZS52YWx1ZX19PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ2YWxpZGF0aW9uXCIgKm5nSWY9XCJzZWFyY2hCeT8uaW52YWxpZCAmJiAoc2VhcmNoQnk/LmRpcnR5IHx8IHNlYXJjaEJ5Py50b3VjaGVkKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNtYWxsICpuZ0lmPVwic2VhcmNoQnk/LmVycm9ycz8uWydyZXF1aXJlZCddXCI+U2VhcmNoIGJ5IGlzIHJlcXVpcmVkLjwvc21hbGw+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLWxnLTZcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInNlYXJjaFRlcm1cIiBjbGFzcz1cImlucHV0LWdyb3VwLWFkZG9uIG10LTEgbS0xXCI+U2VhcmNoIEtleSA6IDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cInNlYXJjaFRlcm1cIiBmb3JtQ29udHJvbE5hbWU9XCJzZWFyY2hUZXJtXCIgcGxhY2Vob2xkZXI9XCJTZWFyY2hcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiLz5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInZhbGlkYXRpb25cIiAqbmdJZj1cInNlYXJjaFRlcm0/LmludmFsaWQgJiYgKHNlYXJjaFRlcm0/LmRpcnR5IHx8IHNlYXJjaFRlcm0/LnRvdWNoZWQpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c21hbGwgKm5nSWY9XCJzZWFyY2hUZXJtPy5lcnJvcnM/LlsncmVxdWlyZWQnXVwiPlNlYXJjaCBrZXkgaXMgcmVxdWlyZWQuPC9zbWFsbD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbGctM1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIG10LTFcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIiBbZGlzYWJsZWRdPVwic2VhcmNoRm9ybS5pbnZhbGlkXCI+U2VhcmNoPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICZuYnNwOyZuYnNwO1xuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tc2Vjb25kYXJ5XCIgKGNsaWNrKT1cInJlc2V0KClcIj5SZXNldDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+ICAgIFxuICAgICAgPC9mb3JtPlxuICAgICAgPGRpdiBjbGFzcz1cInRhYmxlLXJlc3BvbnNpdmVcIj5cbiAgICAgICAgICA8dGFibGUgY2xhc3M9XCJ0YWJsZSB0YWJsZS1zdHJpcGVkXCIgI2NvbnRhaW5lcj5cbiAgICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgIDx0aCBzY29wZT1cImNvbFwiICpuZ0Zvcj1cImxldCBpdGVtVGl0bGUgb2YgaXRlbVRpdGxlc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBhcHBTb3J0IHNvcnRLZXk9XCJ7e2l0ZW1UaXRsZS5rZXl9fVwiIChzb3J0ZWQpPVwic29ydCgkZXZlbnQpXCIgY2xhc3M9XCJ0YWJsZUhlYWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7e2l0ZW1UaXRsZT8udmFsdWV9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICA8dGggc2NvcGU9XCJjb2xcIiBzdHlsZT1cInRleHQtYWxpZ246Y2VudGVyXCI+QWN0aW9uczwvdGg+XG4gICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgICA8dHIgKm5nRm9yPVwibGV0IGl0ZW0gb2YgaXRlbXM7IGxldCAgaSA9IGluZGV4XCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHRkICpuZ0Zvcj1cImxldCBpdGVtVGl0bGUgb2YgaXRlbVRpdGxlc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7e3ByaW50VGRWYWx1ZXMoaXRlbSwgaXRlbVRpdGxlLmtleSl9fVxuICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8bmF2IGNsYXNzPVwibmF2XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBhY3Rpb25NZW51IG9mIGFjdGlvbk1lbnVzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImFjdGlvbk1lbnUuaXNDb25maXJtID09IHRydWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJuYXYtbGlua1wiIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMCk7XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJkZWxldGVJdGVtcyhyZXR1cm5EZWxldGVJdGVtc0lkKGl0ZW0sIGFjdGlvbk1lbnUuZmllbGROYW1lKSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU9XCIge3thY3Rpb25NZW51Lm5hbWV9fVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3thY3Rpb25NZW51Lm5hbWV9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiYWN0aW9uTWVudS5pc0NvbmZpcm0gPT0gZmFsc2VcIj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cIm5hdi1saW5rXCIgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKTtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm91dGVyTGluaz1cInt7YWN0aW9uTWVudS5yaWRpcmVjdFVybH19e3tyZXR1cm5EZWxldGVJdGVtc0lkKGl0ZW0sIGFjdGlvbk1lbnUuZmllbGROYW1lKX19XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPVwiIHt7YWN0aW9uTWVudS5uYW1lfX1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7YWN0aW9uTWVudS5uYW1lfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmF2PlxuICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgPHRyICpuZ0lmPVwiaXRlbXMubGVuZ3RoID09IDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJub3JlY29yZFwiIFthdHRyLmNvbHNwYW5dPXJldHVybkxlbmd0aChpdGVtVGl0bGVzKT5ObyByZWNvcmQgZm91bmQuPC90ZD5cbiAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFnaW5hdGlvblwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJwYWdpbmF0aW9uSXRlbXMudG90YWxQYWdlcyA+IDFcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8YXBwLXBhZ2luYXRpb24gW2N1cnJlbnRdPVwicGFnaW5hdGlvbkl0ZW1zLmN1cnJlbnRQYWdlXCIgW3RvdGFsXT1cInBhZ2luYXRpb25JdGVtcy50b3RhbFBhZ2VzXCIgKGdvVG8pPVwiZ29Ub1BhZ2UoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChuZXh0KT1cIm5leHRQYWdlKCRldmVudClcIiAocHJldmlvdXMpPVwicHJldlBhZ2UoJGV2ZW50KVwiPjwvYXBwLXBhZ2luYXRpb24+XG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gIDwvZGl2PlxuICBgLFxuICBzdHlsZXM6IFtcbiAgICBgXG4gICAgLnZhbGlkYXRpb24ge1xuICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICB0ZXh0LWFsaWduOiBlbmQ7XG4gICAgICBjb2xvcjogI2YwMDtcbiAgICB9XG5cbiAgICAubm9yZWNvcmQge1xuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgaGVpZ2h0OiAxMDBweDtcbiAgICAgIHBhZGRpbmctdG9wOiAzNXB4O1xuICAgIH1cblxuICAgIHRhYmxlIHtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcbiAgICB9XG5cbiAgICB0aCwgdGQge1xuICAgICAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcbiAgICAgIHBhZGRpbmc6IDhweDtcbiAgICB9XG5cbiAgICB0aCB7XG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjJmMmYyO1xuICAgICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgfVxuXG4gICAgdGg6aG92ZXIge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2RkZDtcbiAgICB9XG5cbiAgICAucGFnaW5hdGlvbiB7XG4gICAgICBkaXNwbGF5OiBibG9jaztcbiAgICB9XG4gICAgLnRhYmxlSGVhZCAge1xuICAgICAgd2lkdGg6IDEwMCUgISBpbXBvcnRhbnQ7ICAgICAgXG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgfVxuXG5cbiAgICBgXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRHluYW1pY0xpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG5cblxuXG4gIEBJbnB1dCgpIHRpdGxlOiBzdHJpbmcgPSAnRHluYW1pYyBMaXN0JztcblxuICBASW5wdXQoKSBpdGVtVGl0bGVzOiBBcnJheTxJdGVtVGl0bGVzPiA9IFtdO1xuICBASW5wdXQoKSBwYWdpbmF0aW9uSXRlbXM6IFBhZ2luYXRpb25JdGVtcyB8IGFueTtcbiAgQElucHV0KCkgYWN0aW9uTWVudXM6IEFycmF5PEFjdGlvbk1lbnVzPiA9IFtdO1xuICBASW5wdXQoKSBpdGVtczogQXJyYXk8RHluYW1pY0tleUludGVyZmFjZT4gPSBbXTtcblxuXG4gIEBPdXRwdXQoKSBvbkdvUGFnZTogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcbiAgQE91dHB1dCgpIG5leHQ6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG4gIEBPdXRwdXQoKSBwcmV2OiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG4gIEBPdXRwdXQoKSB0b0RlbDogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcbiAgQE91dHB1dCgpIHRvU29ydDogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcbiAgQE91dHB1dCgpIHRvU2VhcmNoOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuICBAT3V0cHV0KCkgdG9SZXNldDogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICBzZWFyY2hGb3JtOiBGb3JtR3JvdXA7XG5cbiAgY3VycmVudFBhZ2U6IG51bWJlciA9IDE7XG4gIGl0ZW1zUGVyUGFnZTogbnVtYmVyID0gMTA7XG4gIHRvdGFsUGFnZXM6IG51bWJlciA9IDA7XG5cbiAgc29ydE9yZGVyOiBzdHJpbmcgPSAnYXNjJztcbiAgc29ydEJ5OiBzdHJpbmcgPSAnJztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZiOiBGb3JtQnVpbGRlcikge1xuICAgIHRoaXMuc2VhcmNoRm9ybSA9IHRoaXMuZmIuZ3JvdXAoe1xuICAgICAgc2VhcmNoVGVybTogWycnLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgIHNlYXJjaEJ5OiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdXG4gICAgfSk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICAvL2NvbnNvbGUubG9nKHRoaXMuaXRlbXMpXG5cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcblxuICAgIC8vY29uc29sZS5sb2coY2hhbmdlcyk7XG4gIH1cblxuICBzb3J0KHNvcnRlZERhdGE6IGFueSkge1xuICAgIHRoaXMudG9Tb3J0LmVtaXQoc29ydGVkRGF0YSk7XG4gIH1cblxuICBzZWFyY2goKSB7XG4gICAgdGhpcy50b1NlYXJjaC5lbWl0KHRoaXMuc2VhcmNoRm9ybS52YWx1ZSk7XG4gIH1cblxuICByZXNldCgpIHtcbiAgICB0aGlzLnNlYXJjaEZvcm0ucmVzZXQoKTtcbiAgICB0aGlzLnRvUmVzZXQuZW1pdCh0aGlzLnNlYXJjaEZvcm0udmFsdWUpO1xuICB9XG5cbiAgcmV0dXJuTGVuZ3RoKGl0ZW1zOiBhbnkpIHtcbiAgICByZXR1cm4gaXRlbXMubGVuZ3RoICsgMTtcbiAgfVxuXG4gIGdvVG9QYWdlKHBhZ2VObzogbnVtYmVyKSB7XG4gICAgdGhpcy5vbkdvUGFnZS5lbWl0KHBhZ2VObyk7XG4gIH1cblxuICBuZXh0UGFnZShwYWdlTm86IG51bWJlcikge1xuICAgIHRoaXMubmV4dC5lbWl0KHBhZ2VObyk7XG4gIH1cblxuICBwcmV2UGFnZShwYWdlTm86IG51bWJlcikge1xuICAgIHRoaXMucHJldi5lbWl0KHBhZ2VObyk7XG4gIH1cblxuXG4gIGdldCBzZWFyY2hUZXJtKCkge1xuICAgIHJldHVybiB0aGlzLnNlYXJjaEZvcm0uZ2V0KCdzZWFyY2hUZXJtJyk7XG4gIH1cblxuICBnZXQgc2VhcmNoQnkoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VhcmNoRm9ybS5nZXQoJ3NlYXJjaEJ5Jyk7XG4gIH1cblxuXG4gIHB1YmxpYyBkZWxldGVJdGVtcyhkZWxJZDogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKHdpbmRvdy5jb25maXJtKCdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgdXNlcj8nKSkge1xuICAgICAgdGhpcy50b0RlbC5lbWl0KGRlbElkKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm5EZWxldGVJdGVtc0lkKGl0ZW06IGFueSwga2V5OiBhbnkpIHtcbiAgICBpZiAoaXRlbVtrZXldKSB7XG4gICAgICByZXR1cm4gaXRlbVtrZXldO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG5cbiAgcHJpbnRUZFZhbHVlcyhpdGVtOiBhbnksIGtleTogc3RyaW5nKTogdm9pZCB7XG5cbiAgICBsZXQgcG9zaXRpb24gPSBrZXkuaW5kZXhPZihcIi5cIik7IFxuICAgIGlmIChwb3NpdGlvbiA9PSAtMSkge1xuICAgICAgaWYgKGl0ZW1ba2V5XSkge1xuICAgICAgICByZXR1cm4gaXRlbVtrZXldO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1lbHNle1xuICAgICAgY29uc3QgbXlBcnJheSA9IGtleS5zcGxpdChcIi5cIik7XG4gICAgICBsZXQgcmVzdWx0ID0gIEFycmF5LmlzQXJyYXkoaXRlbVtteUFycmF5WzBdXSk7XG4gICAgICBpZihyZXN1bHQgPT0gdHJ1ZSl7XG4gICAgICAgIHJldHVybiBpdGVtW215QXJyYXlbMF1dWzBdW215QXJyYXlbMV1dO1xuICAgICAgfWVsc2V7XG4gICAgICAgIGlmKG15QXJyYXkubGVuZ3RoID09IDIpe1xuICAgICAgICAgIHJldHVybiBpdGVtW215QXJyYXlbMF1dW215QXJyYXlbMV1dO1xuICAgICAgICB9ZWxzZSBpZihteUFycmF5Lmxlbmd0aCA9PSAzKXtcbiAgICAgICAgICByZXR1cm4gaXRlbVtteUFycmF5WzBdXVtteUFycmF5WzFdXVtteUFycmF5WzJdXTtcbiAgICAgICAgfWVsc2UgaWYobXlBcnJheS5sZW5ndGggPT0gNCl7XG4gICAgICAgICAgcmV0dXJuIGl0ZW1bbXlBcnJheVswXV1bbXlBcnJheVsxXV1bbXlBcnJheVsyXV1bbXlBcnJheVszXV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuXG59Il19