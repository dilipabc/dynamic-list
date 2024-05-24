import { NgModule } from '@angular/core';
import { DynamicListComponent } from './dynamic-list.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from './pagination/pagination.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SortDirective } from './sort.directive';
import * as i0 from "@angular/core";
export class DynamicListModule {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1saXN0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2R5bmFtaWMtbGlzdC9zcmMvbGliL2R5bmFtaWMtbGlzdC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckQsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFFdEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7QUFRakQsTUFBTSxPQUFPLGlCQUFpQjsrR0FBakIsaUJBQWlCO2dIQUFqQixpQkFBaUIsaUJBSmIsb0JBQW9CLEVBQUUsbUJBQW1CLEVBQUUsYUFBYSxhQUM3RCxZQUFZLEVBQUUsbUJBQW1CLEVBQUUsZ0JBQWdCLEVBQUUsWUFBWSxhQUNqRSxvQkFBb0I7Z0hBRW5CLGlCQUFpQixZQUhsQixZQUFZLEVBQUUsbUJBQW1CLEVBQUUsZ0JBQWdCLEVBQUUsWUFBWTs7NEZBR2hFLGlCQUFpQjtrQkFMN0IsUUFBUTttQkFBQztvQkFDUixZQUFZLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxtQkFBbUIsRUFBRSxhQUFhLENBQUM7b0JBQ3hFLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxtQkFBbUIsRUFBRSxnQkFBZ0IsRUFBRSxZQUFZLENBQUM7b0JBQzVFLE9BQU8sRUFBRSxDQUFDLG9CQUFvQixDQUFDO2lCQUNoQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEeW5hbWljTGlzdENvbXBvbmVudCB9IGZyb20gJy4vZHluYW1pYy1saXN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7UGFnaW5hdGlvbkNvbXBvbmVudH0gZnJvbSAnLi9wYWdpbmF0aW9uL3BhZ2luYXRpb24uY29tcG9uZW50JztcblxuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7Um91dGVyTW9kdWxlfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgU29ydERpcmVjdGl2ZSB9IGZyb20gJy4vc29ydC5kaXJlY3RpdmUnO1xuXG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW0R5bmFtaWNMaXN0Q29tcG9uZW50LCBQYWdpbmF0aW9uQ29tcG9uZW50LCBTb3J0RGlyZWN0aXZlXSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSwgSHR0cENsaWVudE1vZHVsZSwgUm91dGVyTW9kdWxlXSxcbiAgZXhwb3J0czogW0R5bmFtaWNMaXN0Q29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBEeW5hbWljTGlzdE1vZHVsZSB7IH0iXX0=