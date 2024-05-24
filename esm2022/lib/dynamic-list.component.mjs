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
        if (item[key]) {
            return item[key];
        }
        else {
            return;
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
                          <option  value="{{itemTitle.key}}">{{itemTitle.value}}</option>
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
                          <option  value="{{itemTitle.key}}">{{itemTitle.value}}</option>
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2R5bmFtaWMtbGlzdC9zcmMvbGliL2R5bmFtaWMtbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsWUFBWSxFQUFFLE1BQU0sRUFBNEIsTUFBTSxlQUFlLENBQUM7QUFDekcsT0FBTyxFQUEwQixVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7OztBQWtKcEUsTUFBTSxPQUFPLG9CQUFvQjtJQThCL0IsWUFBb0IsRUFBZTtRQUFmLE9BQUUsR0FBRixFQUFFLENBQWE7UUExQjFCLFVBQUssR0FBVyxjQUFjLENBQUM7UUFFL0IsZUFBVSxHQUFzQixFQUFFLENBQUM7UUFFbkMsZ0JBQVcsR0FBdUIsRUFBRSxDQUFDO1FBQ3JDLFVBQUssR0FBK0IsRUFBRSxDQUFDO1FBR3RDLGFBQVEsR0FBeUIsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUM1RCxTQUFJLEdBQXlCLElBQUksWUFBWSxFQUFVLENBQUM7UUFDeEQsU0FBSSxHQUF5QixJQUFJLFlBQVksRUFBVSxDQUFDO1FBRXhELFVBQUssR0FBeUIsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUN6RCxXQUFNLEdBQXlCLElBQUksWUFBWSxFQUFVLENBQUM7UUFDMUQsYUFBUSxHQUF5QixJQUFJLFlBQVksRUFBVSxDQUFDO1FBQzVELFlBQU8sR0FBeUIsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUlyRSxnQkFBVyxHQUFXLENBQUMsQ0FBQztRQUN4QixpQkFBWSxHQUFXLEVBQUUsQ0FBQztRQUMxQixlQUFVLEdBQVcsQ0FBQyxDQUFDO1FBRXZCLGNBQVMsR0FBVyxLQUFLLENBQUM7UUFDMUIsV0FBTSxHQUFXLEVBQUUsQ0FBQztRQUdsQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO1lBQzlCLFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxVQUFVLENBQUMsUUFBUSxDQUFDO1lBQ3JDLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRSxVQUFVLENBQUMsUUFBUSxDQUFDO1NBQ3BDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxRQUFRO1FBQ04seUJBQXlCO0lBRTNCLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFFaEMsdUJBQXVCO0lBQ3pCLENBQUM7SUFFRCxJQUFJLENBQUMsVUFBZTtRQUNsQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsTUFBTTtRQUNKLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVELEtBQUs7UUFDSCxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVELFlBQVksQ0FBQyxLQUFVO1FBQ3JCLE9BQU8sS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVELFFBQVEsQ0FBQyxNQUFjO1FBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRCxRQUFRLENBQUMsTUFBYztRQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBRUQsUUFBUSxDQUFDLE1BQWM7UUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUdELElBQUksVUFBVTtRQUNaLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVELElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUdNLFdBQVcsQ0FBQyxLQUFhO1FBQzlCLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyw0Q0FBNEMsQ0FBQyxFQUFFO1lBQ2hFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3hCO0lBQ0gsQ0FBQztJQUVELG1CQUFtQixDQUFDLElBQVMsRUFBRSxHQUFRO1FBQ3JDLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ2IsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDbEI7YUFBTTtZQUNMLE9BQU87U0FDUjtJQUNILENBQUM7SUFFRCxhQUFhLENBQUMsSUFBUyxFQUFFLEdBQVc7UUFFbEMsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDYixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNsQjthQUFNO1lBQ0wsT0FBTztTQUNSO0lBQ0gsQ0FBQzsrR0EzR1Usb0JBQW9CO21HQUFwQixvQkFBb0IsOFZBNUlyQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNkZUOzs0RkErQ1Usb0JBQW9CO2tCQTlJaEMsU0FBUzsrQkFDRSxrQkFBa0IsWUFDbEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTZGVDtrR0FtRFEsS0FBSztzQkFBYixLQUFLO2dCQUVHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBQ0csZUFBZTtzQkFBdkIsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLEtBQUs7c0JBQWIsS0FBSztnQkFHSSxRQUFRO3NCQUFqQixNQUFNO2dCQUNHLElBQUk7c0JBQWIsTUFBTTtnQkFDRyxJQUFJO3NCQUFiLE1BQU07Z0JBRUcsS0FBSztzQkFBZCxNQUFNO2dCQUNHLE1BQU07c0JBQWYsTUFBTTtnQkFDRyxRQUFRO3NCQUFqQixNQUFNO2dCQUNHLE9BQU87c0JBQWhCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIEV2ZW50RW1pdHRlciwgT3V0cHV0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1CdWlsZGVyLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IER5bmFtaWNLZXlJbnRlcmZhY2UsIEFjdGlvbk1lbnVzLCBJdGVtVGl0bGVzLCBQYWdpbmF0aW9uSXRlbXMgfSBmcm9tICcuL2RhdGFUeXBlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGliLWR5bmFtaWMtbGlzdCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdj5cbiAgICAgIDxoMiBjbGFzcz1cIm1iLTRcIj57e3RpdGxlfX08L2gyPlxuICAgICAgPGZvcm0gW2Zvcm1Hcm91cF09XCJzZWFyY2hGb3JtXCIgKG5nU3VibWl0KT1cInNlYXJjaCgpXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgbS0yXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLWxnLTNcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInNlYXJjaEJ5XCIgY2xhc3M9XCJpbnB1dC1ncm91cC1hZGRvbiBtdC0xIG0tMVwiID5TZWFyY2ggQnkgOiA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8c2VsZWN0IGlkPVwic2VhcmNoQnlcIiBmb3JtQ29udHJvbE5hbWU9XCJzZWFyY2hCeVwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiXCI+U2VsZWN0PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBpdGVtVGl0bGUgb2YgaXRlbVRpdGxlc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uICB2YWx1ZT1cInt7aXRlbVRpdGxlLmtleX19XCI+e3tpdGVtVGl0bGUudmFsdWV9fTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+ICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidmFsaWRhdGlvblwiICpuZ0lmPVwic2VhcmNoQnk/LmludmFsaWQgJiYgKHNlYXJjaEJ5Py5kaXJ0eSB8fCBzZWFyY2hCeT8udG91Y2hlZClcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzbWFsbCAqbmdJZj1cInNlYXJjaEJ5Py5lcnJvcnM/LlsncmVxdWlyZWQnXVwiPlNlYXJjaCBieSBpcyByZXF1aXJlZC48L3NtYWxsPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1sZy02XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJzZWFyY2hUZXJtXCIgY2xhc3M9XCJpbnB1dC1ncm91cC1hZGRvbiBtdC0xIG0tMVwiPlNlYXJjaCBLZXkgOiA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9XCJzZWFyY2hUZXJtXCIgZm9ybUNvbnRyb2xOYW1lPVwic2VhcmNoVGVybVwiIHBsYWNlaG9sZGVyPVwiU2VhcmNoXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIi8+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ2YWxpZGF0aW9uXCIgKm5nSWY9XCJzZWFyY2hUZXJtPy5pbnZhbGlkICYmIChzZWFyY2hUZXJtPy5kaXJ0eSB8fCBzZWFyY2hUZXJtPy50b3VjaGVkKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNtYWxsICpuZ0lmPVwic2VhcmNoVGVybT8uZXJyb3JzPy5bJ3JlcXVpcmVkJ11cIj5TZWFyY2gga2V5IGlzIHJlcXVpcmVkLjwvc21hbGw+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLWxnLTNcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBtdC0xXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCIgW2Rpc2FibGVkXT1cInNlYXJjaEZvcm0uaW52YWxpZFwiPlNlYXJjaDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAmbmJzcDsmbmJzcDtcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXNlY29uZGFyeVwiIChjbGljayk9XCJyZXNldCgpXCI+UmVzZXQ8L2J1dHRvbj5cblxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PiAgICBcbiAgICAgIDwvZm9ybT5cbiAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZS1yZXNwb25zaXZlXCI+XG4gICAgICAgICAgPHRhYmxlIGNsYXNzPVwidGFibGUgdGFibGUtc3RyaXBlZFwiICNjb250YWluZXI+XG4gICAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICA8dGggc2NvcGU9XCJjb2xcIiAqbmdGb3I9XCJsZXQgaXRlbVRpdGxlIG9mIGl0ZW1UaXRsZXNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gYXBwU29ydCBzb3J0S2V5PVwie3tpdGVtVGl0bGUua2V5fX1cIiAoc29ydGVkKT1cInNvcnQoJGV2ZW50KVwiIGNsYXNzPVwidGFibGVIZWFkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3tpdGVtVGl0bGU/LnZhbHVlfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgPHRoIHNjb3BlPVwiY29sXCIgc3R5bGU9XCJ0ZXh0LWFsaWduOmNlbnRlclwiPkFjdGlvbnM8L3RoPlxuICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgICAgPHRyICpuZ0Zvcj1cImxldCBpdGVtIG9mIGl0ZW1zOyBsZXQgIGkgPSBpbmRleFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDx0ZCAqbmdGb3I9XCJsZXQgaXRlbVRpdGxlIG9mIGl0ZW1UaXRsZXNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge3twcmludFRkVmFsdWVzKGl0ZW0sIGl0ZW1UaXRsZS5rZXkpfX1cbiAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPG5hdiBjbGFzcz1cIm5hdlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgYWN0aW9uTWVudSBvZiBhY3Rpb25NZW51c1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJhY3Rpb25NZW51LmlzQ29uZmlybSA9PSB0cnVlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwibmF2LWxpbmtcIiBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApO1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwiZGVsZXRlSXRlbXMocmV0dXJuRGVsZXRlSXRlbXNJZChpdGVtLCBhY3Rpb25NZW51LmZpZWxkTmFtZSkpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPVwiIHt7YWN0aW9uTWVudS5uYW1lfX1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7YWN0aW9uTWVudS5uYW1lfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImFjdGlvbk1lbnUuaXNDb25maXJtID09IGZhbHNlXCI+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJuYXYtbGlua1wiIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMCk7XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdXRlckxpbms9XCJ7e2FjdGlvbk1lbnUucmlkaXJlY3RVcmx9fXt7cmV0dXJuRGVsZXRlSXRlbXNJZChpdGVtLCBhY3Rpb25NZW51LmZpZWxkTmFtZSl9fVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZT1cIiB7e2FjdGlvbk1lbnUubmFtZX19XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7e2FjdGlvbk1lbnUubmFtZX19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L25hdj5cbiAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgIDx0ciAqbmdJZj1cIml0ZW1zLmxlbmd0aCA9PSAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzPVwibm9yZWNvcmRcIiBbYXR0ci5jb2xzcGFuXT1yZXR1cm5MZW5ndGgoaXRlbVRpdGxlcyk+Tm8gcmVjb3JkIGZvdW5kLjwvdGQ+XG4gICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInBhZ2luYXRpb25cIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwicGFnaW5hdGlvbkl0ZW1zLnRvdGFsUGFnZXMgPiAxXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGFwcC1wYWdpbmF0aW9uIFtjdXJyZW50XT1cInBhZ2luYXRpb25JdGVtcy5jdXJyZW50UGFnZVwiIFt0b3RhbF09XCJwYWdpbmF0aW9uSXRlbXMudG90YWxQYWdlc1wiIChnb1RvKT1cImdvVG9QYWdlKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAobmV4dCk9XCJuZXh0UGFnZSgkZXZlbnQpXCIgKHByZXZpb3VzKT1cInByZXZQYWdlKCRldmVudClcIj48L2FwcC1wYWdpbmF0aW9uPlxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICA8L2Rpdj5cbiAgYCxcbiAgc3R5bGVzOiBbXG4gICAgYFxuICAgIC52YWxpZGF0aW9uIHtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgdGV4dC1hbGlnbjogZW5kO1xuICAgICAgY29sb3I6ICNmMDA7XG4gICAgfVxuXG4gICAgLm5vcmVjb3JkIHtcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgIGhlaWdodDogMTAwcHg7XG4gICAgICBwYWRkaW5nLXRvcDogMzVweDtcbiAgICB9XG5cbiAgICB0YWJsZSB7XG4gICAgICB3aWR0aDogMTAwJTtcbiAgICAgIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XG4gICAgfVxuXG4gICAgdGgsIHRkIHtcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7XG4gICAgICBwYWRkaW5nOiA4cHg7XG4gICAgfVxuXG4gICAgdGgge1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2YyZjJmMjtcbiAgICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgIH1cblxuICAgIHRoOmhvdmVyIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNkZGQ7XG4gICAgfVxuXG4gICAgLnBhZ2luYXRpb24ge1xuICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgfVxuICAgIC50YWJsZUhlYWQgIHtcbiAgICAgIHdpZHRoOiAxMDAlICEgaW1wb3J0YW50OyAgICAgIFxuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIH1cblxuXG4gICAgYFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIER5bmFtaWNMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuXG5cblxuICBASW5wdXQoKSB0aXRsZTogc3RyaW5nID0gJ0R5bmFtaWMgTGlzdCc7XG5cbiAgQElucHV0KCkgaXRlbVRpdGxlczogQXJyYXk8SXRlbVRpdGxlcz4gPSBbXTtcbiAgQElucHV0KCkgcGFnaW5hdGlvbkl0ZW1zOiBQYWdpbmF0aW9uSXRlbXMgfCBhbnk7XG4gIEBJbnB1dCgpIGFjdGlvbk1lbnVzOiBBcnJheTxBY3Rpb25NZW51cz4gPSBbXTtcbiAgQElucHV0KCkgaXRlbXM6IEFycmF5PER5bmFtaWNLZXlJbnRlcmZhY2U+ID0gW107XG5cblxuICBAT3V0cHV0KCkgb25Hb1BhZ2U6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG4gIEBPdXRwdXQoKSBuZXh0OiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuICBAT3V0cHV0KCkgcHJldjogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICBAT3V0cHV0KCkgdG9EZWw6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG4gIEBPdXRwdXQoKSB0b1NvcnQ6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG4gIEBPdXRwdXQoKSB0b1NlYXJjaDogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcbiAgQE91dHB1dCgpIHRvUmVzZXQ6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG5cbiAgc2VhcmNoRm9ybTogRm9ybUdyb3VwO1xuXG4gIGN1cnJlbnRQYWdlOiBudW1iZXIgPSAxO1xuICBpdGVtc1BlclBhZ2U6IG51bWJlciA9IDEwO1xuICB0b3RhbFBhZ2VzOiBudW1iZXIgPSAwO1xuXG4gIHNvcnRPcmRlcjogc3RyaW5nID0gJ2FzYyc7XG4gIHNvcnRCeTogc3RyaW5nID0gJyc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBmYjogRm9ybUJ1aWxkZXIpIHtcbiAgICB0aGlzLnNlYXJjaEZvcm0gPSB0aGlzLmZiLmdyb3VwKHtcbiAgICAgIHNlYXJjaFRlcm06IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICBzZWFyY2hCeTogWycnLCBWYWxpZGF0b3JzLnJlcXVpcmVkXVxuICAgIH0pO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgLy9jb25zb2xlLmxvZyh0aGlzLml0ZW1zKVxuXG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG5cbiAgICAvL2NvbnNvbGUubG9nKGNoYW5nZXMpO1xuICB9XG5cbiAgc29ydChzb3J0ZWREYXRhOiBhbnkpIHtcbiAgICB0aGlzLnRvU29ydC5lbWl0KHNvcnRlZERhdGEpO1xuICB9XG5cbiAgc2VhcmNoKCl7ICAgIFxuICAgIHRoaXMudG9TZWFyY2guZW1pdCh0aGlzLnNlYXJjaEZvcm0udmFsdWUpO1xuICB9XG5cbiAgcmVzZXQoKXtcbiAgICB0aGlzLnNlYXJjaEZvcm0ucmVzZXQoKTtcbiAgICB0aGlzLnRvUmVzZXQuZW1pdCh0aGlzLnNlYXJjaEZvcm0udmFsdWUpO1xuICB9XG5cbiAgcmV0dXJuTGVuZ3RoKGl0ZW1zOiBhbnkpIHtcbiAgICByZXR1cm4gaXRlbXMubGVuZ3RoICsgMTtcbiAgfVxuXG4gIGdvVG9QYWdlKHBhZ2VObzogbnVtYmVyKSB7XG4gICAgdGhpcy5vbkdvUGFnZS5lbWl0KHBhZ2VObyk7XG4gIH1cblxuICBuZXh0UGFnZShwYWdlTm86IG51bWJlcikge1xuICAgIHRoaXMubmV4dC5lbWl0KHBhZ2VObyk7XG4gIH1cblxuICBwcmV2UGFnZShwYWdlTm86IG51bWJlcikge1xuICAgIHRoaXMucHJldi5lbWl0KHBhZ2VObyk7XG4gIH1cblxuXG4gIGdldCBzZWFyY2hUZXJtKCkge1xuICAgIHJldHVybiB0aGlzLnNlYXJjaEZvcm0uZ2V0KCdzZWFyY2hUZXJtJyk7XG4gIH1cblxuICBnZXQgc2VhcmNoQnkoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VhcmNoRm9ybS5nZXQoJ3NlYXJjaEJ5Jyk7XG4gIH1cblxuXG4gIHB1YmxpYyBkZWxldGVJdGVtcyhkZWxJZDogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKHdpbmRvdy5jb25maXJtKCdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgdXNlcj8nKSkge1xuICAgICAgdGhpcy50b0RlbC5lbWl0KGRlbElkKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm5EZWxldGVJdGVtc0lkKGl0ZW06IGFueSwga2V5OiBhbnkpIHtcbiAgICBpZiAoaXRlbVtrZXldKSB7XG4gICAgICByZXR1cm4gaXRlbVtrZXldO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG5cbiAgcHJpbnRUZFZhbHVlcyhpdGVtOiBhbnksIGtleTogc3RyaW5nKTogdm9pZCB7XG5cbiAgICBpZiAoaXRlbVtrZXldKSB7XG4gICAgICByZXR1cm4gaXRlbVtrZXldO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG4gIFxuXG59Il19