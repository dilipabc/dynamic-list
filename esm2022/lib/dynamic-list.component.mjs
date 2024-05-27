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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2R5bmFtaWMtbGlzdC9zcmMvbGliL2R5bmFtaWMtbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsWUFBWSxFQUFFLE1BQU0sRUFBNEIsTUFBTSxlQUFlLENBQUM7QUFDekcsT0FBTyxFQUEwQixVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7OztBQXNLcEUsTUFBTSxPQUFPLG9CQUFvQjtJQStCL0IsWUFBb0IsRUFBZTtRQUFmLE9BQUUsR0FBRixFQUFFLENBQWE7UUEzQjFCLFVBQUssR0FBVyxjQUFjLENBQUM7UUFFL0IsZUFBVSxHQUFzQixFQUFFLENBQUM7UUFFbkMsZ0JBQVcsR0FBdUIsRUFBRSxDQUFDO1FBQ3JDLFVBQUssR0FBK0IsRUFBRSxDQUFDO1FBQ3ZDLGNBQVMsR0FBMkIsRUFBRSxDQUFDO1FBR3RDLGFBQVEsR0FBeUIsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUM1RCxTQUFJLEdBQXlCLElBQUksWUFBWSxFQUFVLENBQUM7UUFDeEQsU0FBSSxHQUF5QixJQUFJLFlBQVksRUFBVSxDQUFDO1FBRXhELFVBQUssR0FBeUIsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUN6RCxXQUFNLEdBQXlCLElBQUksWUFBWSxFQUFVLENBQUM7UUFDMUQsYUFBUSxHQUF5QixJQUFJLFlBQVksRUFBVSxDQUFDO1FBQzVELFlBQU8sR0FBeUIsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUlyRSxnQkFBVyxHQUFXLENBQUMsQ0FBQztRQUN4QixpQkFBWSxHQUFXLEVBQUUsQ0FBQztRQUMxQixlQUFVLEdBQVcsQ0FBQyxDQUFDO1FBRXZCLGNBQVMsR0FBVyxLQUFLLENBQUM7UUFDMUIsV0FBTSxHQUFXLEVBQUUsQ0FBQztRQUdsQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO1lBQzlCLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxVQUFVLENBQUMsUUFBUSxDQUFDO1lBQ3JDLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRSxVQUFVLENBQUMsUUFBUSxDQUFDO1NBQ3BDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxRQUFRO1FBQ04seUJBQXlCO0lBRTNCLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFFaEMsdUJBQXVCO0lBQ3pCLENBQUM7SUFFRCxJQUFJLENBQUMsVUFBZTtRQUNsQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsTUFBTTtRQUNKLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVELEtBQUs7UUFDSCxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVELFlBQVksQ0FBQyxLQUFVO1FBQ3JCLE9BQU8sS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVELFFBQVEsQ0FBQyxNQUFjO1FBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRCxRQUFRLENBQUMsTUFBYztRQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBRUQsUUFBUSxDQUFDLE1BQWM7UUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUdELElBQUksVUFBVTtRQUNaLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVELElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUdNLFdBQVcsQ0FBQyxLQUFhO1FBQzlCLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyw0Q0FBNEMsQ0FBQyxFQUFFO1lBQ2hFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3hCO0lBQ0gsQ0FBQztJQUVELG1CQUFtQixDQUFDLElBQVMsRUFBRSxHQUFRO1FBQ3JDLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ2IsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDbEI7YUFBTTtZQUNMLE9BQU87U0FDUjtJQUNILENBQUM7SUFFRCxhQUFhLENBQUMsSUFBUyxFQUFFLEdBQVc7UUFFbEMsSUFBSSxRQUFRLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoQyxJQUFJLFFBQVEsSUFBSSxDQUFDLENBQUMsRUFBRTtZQUNsQixJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDYixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNsQjtpQkFBTTtnQkFDTCxPQUFPO2FBQ1I7U0FDRjthQUFJO1lBQ0gsTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMvQixJQUFJLE1BQU0sR0FBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlDLElBQUcsTUFBTSxJQUFJLElBQUksRUFBQztnQkFFaEIsSUFBRyxPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBQztvQkFDckIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ3hDO3FCQUFLLElBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUM7b0JBQzNCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNwRDtxQkFBSyxJQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFDO29CQUMzQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDaEU7YUFDRjtpQkFBSTtnQkFDSCxJQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFDO29CQUNyQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDckM7cUJBQUssSUFBRyxPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBQztvQkFDM0IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ2pEO3FCQUFLLElBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUM7b0JBQzNCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUM3RDthQUNGO1NBQ0Y7SUFDSCxDQUFDOytHQXBJVSxvQkFBb0I7bUdBQXBCLG9CQUFvQixzWEFqS3JCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrSFQ7OzRGQStDVSxvQkFBb0I7a0JBbktoQyxTQUFTOytCQUNFLGtCQUFrQixZQUNsQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0hUO2tHQW1EUSxLQUFLO3NCQUFiLEtBQUs7Z0JBRUcsVUFBVTtzQkFBbEIsS0FBSztnQkFDRyxlQUFlO3NCQUF2QixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csS0FBSztzQkFBYixLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBR0ksUUFBUTtzQkFBakIsTUFBTTtnQkFDRyxJQUFJO3NCQUFiLE1BQU07Z0JBQ0csSUFBSTtzQkFBYixNQUFNO2dCQUVHLEtBQUs7c0JBQWQsTUFBTTtnQkFDRyxNQUFNO3NCQUFmLE1BQU07Z0JBQ0csUUFBUTtzQkFBakIsTUFBTTtnQkFDRyxPQUFPO3NCQUFoQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBFdmVudEVtaXR0ZXIsIE91dHB1dCwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQnVpbGRlciwgRm9ybUdyb3VwLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRHluYW1pY0tleUludGVyZmFjZSwgQWN0aW9uTWVudXMsIEl0ZW1UaXRsZXMsIFBhZ2luYXRpb25JdGVtcywgRnVuY3Rpb25FbmFibGUgfSBmcm9tICcuL2RhdGFUeXBlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGliLWR5bmFtaWMtbGlzdCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdj5cbiAgICAgIDxoMiBjbGFzcz1cIm1iLTRcIj57e3RpdGxlfX08L2gyPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImZ1bkVuYWJsZVswXS5zZWFyY2hpbmcgPT0gdHJ1ZVwiPlxuICAgICAgICA8Zm9ybSBbZm9ybUdyb3VwXT1cInNlYXJjaEZvcm1cIiAobmdTdWJtaXQpPVwic2VhcmNoKClcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IG0tMlwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLWxnLTNcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJzZWFyY2hCeVwiIGNsYXNzPVwiaW5wdXQtZ3JvdXAtYWRkb24gbXQtMSBtLTFcIiA+U2VhcmNoIEJ5IDogPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICA8c2VsZWN0IGlkPVwic2VhcmNoQnlcIiBmb3JtQ29udHJvbE5hbWU9XCJzZWFyY2hCeVwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJcIj5TZWxlY3Q8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgaXRlbVRpdGxlIG9mIGl0ZW1UaXRsZXNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uICpuZ0lmPVwiaXRlbVRpdGxlLmlzU2VhcmNoID09IHRydWVcIiAgdmFsdWU9XCJ7e2l0ZW1UaXRsZS5rZXl9fVwiPnt7aXRlbVRpdGxlLnZhbHVlfX08L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+ICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInZhbGlkYXRpb25cIiAqbmdJZj1cInNlYXJjaEJ5Py5pbnZhbGlkICYmIChzZWFyY2hCeT8uZGlydHkgfHwgc2VhcmNoQnk/LnRvdWNoZWQpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzbWFsbCAqbmdJZj1cInNlYXJjaEJ5Py5lcnJvcnM/LlsncmVxdWlyZWQnXVwiPlNlYXJjaCBieSBpcyByZXF1aXJlZC48L3NtYWxsPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLWxnLTZcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJzZWFyY2hUZXJtXCIgY2xhc3M9XCJpbnB1dC1ncm91cC1hZGRvbiBtdC0xIG0tMVwiPlNlYXJjaCBLZXkgOiA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cInNlYXJjaFRlcm1cIiBmb3JtQ29udHJvbE5hbWU9XCJzZWFyY2hUZXJtXCIgcGxhY2Vob2xkZXI9XCJTZWFyY2hcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiLz5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidmFsaWRhdGlvblwiICpuZ0lmPVwic2VhcmNoVGVybT8uaW52YWxpZCAmJiAoc2VhcmNoVGVybT8uZGlydHkgfHwgc2VhcmNoVGVybT8udG91Y2hlZClcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNtYWxsICpuZ0lmPVwic2VhcmNoVGVybT8uZXJyb3JzPy5bJ3JlcXVpcmVkJ11cIj5TZWFyY2gga2V5IGlzIHJlcXVpcmVkLjwvc21hbGw+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbGctM1wiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgbXQtMVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCIgW2Rpc2FibGVkXT1cInNlYXJjaEZvcm0uaW52YWxpZFwiPlNlYXJjaDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICZuYnNwOyZuYnNwO1xuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1zZWNvbmRhcnlcIiAoY2xpY2spPVwicmVzZXQoKVwiPlJlc2V0PC9idXR0b24+XG5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj4gICAgXG4gICAgICAgIDwvZm9ybT5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPGRpdiBjbGFzcz1cInRhYmxlLXJlc3BvbnNpdmVcIj5cbiAgICAgICAgICA8dGFibGUgY2xhc3M9XCJ0YWJsZSB0YWJsZS1zdHJpcGVkXCIgI2NvbnRhaW5lcj5cbiAgICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJmdW5FbmFibGVbMF0uc29ydGluZyA9PSB0cnVlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGggc2NvcGU9XCJjb2xcIiAqbmdGb3I9XCJsZXQgaXRlbVRpdGxlIG9mIGl0ZW1UaXRsZXNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBhcHBTb3J0IHNvcnRLZXk9XCJ7e2l0ZW1UaXRsZS5rZXl9fVwiIChzb3J0ZWQpPVwic29ydCgkZXZlbnQpXCIgY2xhc3M9XCJ0YWJsZUhlYWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7aXRlbVRpdGxlPy52YWx1ZX19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiZnVuRW5hYmxlWzBdLnNvcnRpbmcgPT0gZmFsc2VcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBzY29wZT1cImNvbFwiICpuZ0Zvcj1cImxldCBpdGVtVGl0bGUgb2YgaXRlbVRpdGxlc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0YWJsZUhlYWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3tpdGVtVGl0bGU/LnZhbHVlfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICA8dGggc2NvcGU9XCJjb2xcIiBzdHlsZT1cInRleHQtYWxpZ246Y2VudGVyXCI+QWN0aW9uczwvdGg+XG4gICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgICA8dHIgKm5nRm9yPVwibGV0IGl0ZW0gb2YgaXRlbXM7IGxldCAgaSA9IGluZGV4XCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHRkICpuZ0Zvcj1cImxldCBpdGVtVGl0bGUgb2YgaXRlbVRpdGxlc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7e3ByaW50VGRWYWx1ZXMoaXRlbSwgaXRlbVRpdGxlLmtleSl9fVxuICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8bmF2IGNsYXNzPVwibmF2XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBhY3Rpb25NZW51IG9mIGFjdGlvbk1lbnVzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImFjdGlvbk1lbnUuaXNDb25maXJtID09IHRydWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJuYXYtbGlua1wiIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMCk7XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJkZWxldGVJdGVtcyhyZXR1cm5EZWxldGVJdGVtc0lkKGl0ZW0sIGFjdGlvbk1lbnUuZmllbGROYW1lKSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU9XCIge3thY3Rpb25NZW51Lm5hbWV9fVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImFjdGlvbk1lbnUuaWNvblVybFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCJ7e2FjdGlvbk1lbnUuaWNvblVybH19XCIgd2lkdGg9XCI1MHB4XCIgaGVpZ2h0PVwiNTBweFwiIGFsdD1cInt7YWN0aW9uTWVudS5uYW1lfX1cIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgICpuZ0lmPVwiYWN0aW9uTWVudS5pY29uVXJsID09ICcnXCIgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7e2FjdGlvbk1lbnUubmFtZX19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImFjdGlvbk1lbnUuaXNDb25maXJtID09IGZhbHNlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwibmF2LWxpbmtcIiBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApO1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3V0ZXJMaW5rPVwie3thY3Rpb25NZW51LnJlZGlyZWN0VXJsfX17e3JldHVybkRlbGV0ZUl0ZW1zSWQoaXRlbSwgYWN0aW9uTWVudS5maWVsZE5hbWUpfX1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU9XCIge3thY3Rpb25NZW51Lm5hbWV9fVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImFjdGlvbk1lbnUuaWNvblVybFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCJ7e2FjdGlvbk1lbnUuaWNvblVybH19XCIgd2lkdGg9XCI1MHB4XCIgaGVpZ2h0PVwiNTBweFwiIGFsdD1cInt7YWN0aW9uTWVudS5uYW1lfX1cIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgICpuZ0lmPVwiYWN0aW9uTWVudS5pY29uVXJsID09ICcnXCIgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7e2FjdGlvbk1lbnUubmFtZX19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uYXY+XG4gICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICA8dHIgKm5nSWY9XCJpdGVtcy5sZW5ndGggPT0gMFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cIm5vcmVjb3JkXCIgW2F0dHIuY29sc3Bhbl09cmV0dXJuTGVuZ3RoKGl0ZW1UaXRsZXMpPk5vIHJlY29yZCBmb3VuZC48L3RkPlxuICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgIDxkaXYgKm5nSWY9XCJmdW5FbmFibGVbMF0ucGFnaW5hdGlvbiA9PSB0cnVlXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYWdpbmF0aW9uXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cInBhZ2luYXRpb25JdGVtcy50b3RhbFBhZ2VzID4gMVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxhcHAtcGFnaW5hdGlvbiBbY3VycmVudF09XCJwYWdpbmF0aW9uSXRlbXMuY3VycmVudFBhZ2VcIiBbdG90YWxdPVwicGFnaW5hdGlvbkl0ZW1zLnRvdGFsUGFnZXNcIiAoZ29Ubyk9XCJnb1RvUGFnZSgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKG5leHQpPVwibmV4dFBhZ2UoJGV2ZW50KVwiIChwcmV2aW91cyk9XCJwcmV2UGFnZSgkZXZlbnQpXCI+PC9hcHAtcGFnaW5hdGlvbj5cbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgPC9kaXY+XG4gIGAsXG4gIHN0eWxlczogW1xuICAgIGBcbiAgICAudmFsaWRhdGlvbiB7XG4gICAgICB3aWR0aDogMTAwJTtcbiAgICAgIHRleHQtYWxpZ246IGVuZDtcbiAgICAgIGNvbG9yOiAjZjAwO1xuICAgIH1cblxuICAgIC5ub3JlY29yZCB7XG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICBoZWlnaHQ6IDEwMHB4O1xuICAgICAgcGFkZGluZy10b3A6IDM1cHg7XG4gICAgfVxuXG4gICAgdGFibGUge1xuICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xuICAgIH1cblxuICAgIHRoLCB0ZCB7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xuICAgICAgcGFkZGluZzogOHB4O1xuICAgIH1cblxuICAgIHRoIHtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmMmYyZjI7XG4gICAgICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgICB9XG5cbiAgICB0aDpob3ZlciB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZGRkO1xuICAgIH1cblxuICAgIC5wYWdpbmF0aW9uIHtcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIH1cbiAgICAudGFibGVIZWFkICB7XG4gICAgICB3aWR0aDogMTAwJSAhIGltcG9ydGFudDsgICAgICBcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICB9XG5cblxuICAgIGBcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBEeW5hbWljTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcblxuXG5cbiAgQElucHV0KCkgdGl0bGU6IHN0cmluZyA9ICdEeW5hbWljIExpc3QnO1xuXG4gIEBJbnB1dCgpIGl0ZW1UaXRsZXM6IEFycmF5PEl0ZW1UaXRsZXM+ID0gW107XG4gIEBJbnB1dCgpIHBhZ2luYXRpb25JdGVtczogUGFnaW5hdGlvbkl0ZW1zIHwgYW55O1xuICBASW5wdXQoKSBhY3Rpb25NZW51czogQXJyYXk8QWN0aW9uTWVudXM+ID0gW107XG4gIEBJbnB1dCgpIGl0ZW1zOiBBcnJheTxEeW5hbWljS2V5SW50ZXJmYWNlPiA9IFtdO1xuICBASW5wdXQoKSBmdW5FbmFibGUgOiBBcnJheTxGdW5jdGlvbkVuYWJsZT4gPSBbXTtcblxuXG4gIEBPdXRwdXQoKSBvbkdvUGFnZTogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcbiAgQE91dHB1dCgpIG5leHQ6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG4gIEBPdXRwdXQoKSBwcmV2OiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG4gIEBPdXRwdXQoKSB0b0RlbDogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcbiAgQE91dHB1dCgpIHRvU29ydDogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcbiAgQE91dHB1dCgpIHRvU2VhcmNoOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuICBAT3V0cHV0KCkgdG9SZXNldDogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICBzZWFyY2hGb3JtOiBGb3JtR3JvdXA7XG5cbiAgY3VycmVudFBhZ2U6IG51bWJlciA9IDE7XG4gIGl0ZW1zUGVyUGFnZTogbnVtYmVyID0gMTA7XG4gIHRvdGFsUGFnZXM6IG51bWJlciA9IDA7XG5cbiAgc29ydE9yZGVyOiBzdHJpbmcgPSAnYXNjJztcbiAgc29ydEJ5OiBzdHJpbmcgPSAnJztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZiOiBGb3JtQnVpbGRlcikge1xuICAgIHRoaXMuc2VhcmNoRm9ybSA9IHRoaXMuZmIuZ3JvdXAoe1xuICAgICAgc2VhcmNoVGVybTogWycnLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgIHNlYXJjaEJ5OiBbJycsIFZhbGlkYXRvcnMucmVxdWlyZWRdXG4gICAgfSk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICAvL2NvbnNvbGUubG9nKHRoaXMuaXRlbXMpXG5cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcblxuICAgIC8vY29uc29sZS5sb2coY2hhbmdlcyk7XG4gIH1cblxuICBzb3J0KHNvcnRlZERhdGE6IGFueSkge1xuICAgIHRoaXMudG9Tb3J0LmVtaXQoc29ydGVkRGF0YSk7XG4gIH1cblxuICBzZWFyY2goKSB7XG4gICAgdGhpcy50b1NlYXJjaC5lbWl0KHRoaXMuc2VhcmNoRm9ybS52YWx1ZSk7XG4gIH1cblxuICByZXNldCgpIHtcbiAgICB0aGlzLnNlYXJjaEZvcm0ucmVzZXQoKTtcbiAgICB0aGlzLnRvUmVzZXQuZW1pdCh0aGlzLnNlYXJjaEZvcm0udmFsdWUpO1xuICB9XG5cbiAgcmV0dXJuTGVuZ3RoKGl0ZW1zOiBhbnkpIHtcbiAgICByZXR1cm4gaXRlbXMubGVuZ3RoICsgMTtcbiAgfVxuXG4gIGdvVG9QYWdlKHBhZ2VObzogbnVtYmVyKSB7XG4gICAgdGhpcy5vbkdvUGFnZS5lbWl0KHBhZ2VObyk7XG4gIH1cblxuICBuZXh0UGFnZShwYWdlTm86IG51bWJlcikge1xuICAgIHRoaXMubmV4dC5lbWl0KHBhZ2VObyk7XG4gIH1cblxuICBwcmV2UGFnZShwYWdlTm86IG51bWJlcikge1xuICAgIHRoaXMucHJldi5lbWl0KHBhZ2VObyk7XG4gIH1cblxuXG4gIGdldCBzZWFyY2hUZXJtKCkge1xuICAgIHJldHVybiB0aGlzLnNlYXJjaEZvcm0uZ2V0KCdzZWFyY2hUZXJtJyk7XG4gIH1cblxuICBnZXQgc2VhcmNoQnkoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VhcmNoRm9ybS5nZXQoJ3NlYXJjaEJ5Jyk7XG4gIH1cblxuXG4gIHB1YmxpYyBkZWxldGVJdGVtcyhkZWxJZDogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKHdpbmRvdy5jb25maXJtKCdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgdXNlcj8nKSkge1xuICAgICAgdGhpcy50b0RlbC5lbWl0KGRlbElkKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm5EZWxldGVJdGVtc0lkKGl0ZW06IGFueSwga2V5OiBhbnkpIHtcbiAgICBpZiAoaXRlbVtrZXldKSB7XG4gICAgICByZXR1cm4gaXRlbVtrZXldO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG5cbiAgcHJpbnRUZFZhbHVlcyhpdGVtOiBhbnksIGtleTogc3RyaW5nKTogdm9pZCB7XG5cbiAgICBsZXQgcG9zaXRpb24gPSBrZXkuaW5kZXhPZihcIi5cIik7IFxuICAgIGlmIChwb3NpdGlvbiA9PSAtMSkge1xuICAgICAgaWYgKGl0ZW1ba2V5XSkge1xuICAgICAgICByZXR1cm4gaXRlbVtrZXldO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1lbHNle1xuICAgICAgY29uc3QgbXlBcnJheSA9IGtleS5zcGxpdChcIi5cIik7XG4gICAgICBsZXQgcmVzdWx0ID0gIEFycmF5LmlzQXJyYXkoaXRlbVtteUFycmF5WzBdXSk7XG4gICAgICBpZihyZXN1bHQgPT0gdHJ1ZSl7XG4gICAgICAgIFxuICAgICAgICBpZihteUFycmF5Lmxlbmd0aCA9PSAyKXtcbiAgICAgICAgICByZXR1cm4gaXRlbVtteUFycmF5WzBdXVswXVtteUFycmF5WzFdXTtcbiAgICAgICAgfWVsc2UgaWYobXlBcnJheS5sZW5ndGggPT0gMyl7XG4gICAgICAgICAgcmV0dXJuIGl0ZW1bbXlBcnJheVswXV1bMF1bbXlBcnJheVsxXV1bbXlBcnJheVsyXV07XG4gICAgICAgIH1lbHNlIGlmKG15QXJyYXkubGVuZ3RoID09IDQpe1xuICAgICAgICAgIHJldHVybiBpdGVtW215QXJyYXlbMF1dWzBdW215QXJyYXlbMV1dW215QXJyYXlbMl1dW215QXJyYXlbM11dO1xuICAgICAgICB9XG4gICAgICB9ZWxzZXtcbiAgICAgICAgaWYobXlBcnJheS5sZW5ndGggPT0gMil7XG4gICAgICAgICAgcmV0dXJuIGl0ZW1bbXlBcnJheVswXV1bbXlBcnJheVsxXV07XG4gICAgICAgIH1lbHNlIGlmKG15QXJyYXkubGVuZ3RoID09IDMpe1xuICAgICAgICAgIHJldHVybiBpdGVtW215QXJyYXlbMF1dW215QXJyYXlbMV1dW215QXJyYXlbMl1dO1xuICAgICAgICB9ZWxzZSBpZihteUFycmF5Lmxlbmd0aCA9PSA0KXtcbiAgICAgICAgICByZXR1cm4gaXRlbVtteUFycmF5WzBdXVtteUFycmF5WzFdXVtteUFycmF5WzJdXVtteUFycmF5WzNdXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG5cbn0iXX0=