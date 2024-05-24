import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class PaginationComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9keW5hbWljLWxpc3Qvc3JjL2xpYi9wYWdpbmF0aW9uL3BhZ2luYXRpb24uY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZHluYW1pYy1saXN0L3NyYy9saWIvcGFnaW5hdGlvbi9wYWdpbmF0aW9uLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQWlCLE1BQU0sZUFBZSxDQUFDOzs7QUFPOUYsTUFBTSxPQUFPLG1CQUFtQjtJQVE5QjtRQVBTLFlBQU8sR0FBVyxDQUFDLENBQUE7UUFDbkIsVUFBSyxHQUFXLENBQUMsQ0FBQTtRQUVoQixTQUFJLEdBQXlCLElBQUksWUFBWSxFQUFVLENBQUM7UUFDeEQsU0FBSSxHQUF5QixJQUFJLFlBQVksRUFBVSxDQUFDO1FBQ3hELGFBQVEsR0FBeUIsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUMvRCxVQUFLLEdBQWEsRUFBRSxDQUFDO0lBQ1osQ0FBQztJQUVqQixRQUFRLEtBQVcsQ0FBQztJQUViLE1BQU0sQ0FBQyxJQUFZO1FBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3RCLENBQUM7SUFDTSxNQUFNO1FBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQzlCLENBQUM7SUFDTSxVQUFVO1FBQ2YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ2xDLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFDRSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsWUFBWSxDQUFDO1lBQ3ZELENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFDbkQ7WUFDQSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDdEQ7SUFDSCxDQUFDO0lBRU8sUUFBUSxDQUFDLE9BQWUsRUFBRSxLQUFhO1FBQzdDLElBQUksS0FBSyxJQUFJLENBQUMsRUFBRTtZQUNkLE9BQU8sQ0FBQyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7U0FDOUM7UUFDRCxJQUFJLE9BQU8sR0FBRyxDQUFDLEVBQUU7WUFDZixJQUFJLE9BQU8sSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFO2dCQUN4QixPQUFPLENBQUMsQ0FBQyxFQUFFLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQTthQUN6RTtpQkFBTTtnQkFDTCxPQUFPLENBQUMsQ0FBQyxFQUFFLE9BQU8sR0FBRyxDQUFDLEVBQUUsT0FBTyxHQUFHLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxHQUFHLENBQUMsRUFBRSxPQUFPLEdBQUcsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFBO2FBQy9FO1NBQ0Y7UUFDRCxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUE7SUFDbEMsQ0FBQzsrR0EzQ1UsbUJBQW1CO21HQUFuQixtQkFBbUIsMExDUGhDLDB4QkFhUTs7NEZETkssbUJBQW1CO2tCQUwvQixTQUFTOytCQUNFLGdCQUFnQjswRUFLakIsT0FBTztzQkFBZixLQUFLO2dCQUNHLEtBQUs7c0JBQWIsS0FBSztnQkFFSSxJQUFJO3NCQUFiLE1BQU07Z0JBQ0csSUFBSTtzQkFBYixNQUFNO2dCQUNHLFFBQVE7c0JBQWpCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1wYWdpbmF0aW9uJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3BhZ2luYXRpb24uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9wYWdpbmF0aW9uLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBQYWdpbmF0aW9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgY3VycmVudDogbnVtYmVyID0gMFxuICBASW5wdXQoKSB0b3RhbDogbnVtYmVyID0gMFxuXG4gIEBPdXRwdXQoKSBnb1RvOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuICBAT3V0cHV0KCkgbmV4dDogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcbiAgQE91dHB1dCgpIHByZXZpb3VzOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuICBwdWJsaWMgcGFnZXM6IG51bWJlcltdID0gW107XG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7IH1cblxuICBwdWJsaWMgb25Hb1RvKHBhZ2U6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuZ29Uby5lbWl0KHBhZ2UpXG4gIH1cbiAgcHVibGljIG9uTmV4dCgpOiB2b2lkIHtcbiAgICB0aGlzLm5leHQuZW1pdCh0aGlzLmN1cnJlbnQpXG4gIH1cbiAgcHVibGljIG9uUHJldmlvdXMoKTogdm9pZCB7XG4gICAgdGhpcy5wcmV2aW91cy5uZXh0KHRoaXMuY3VycmVudClcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoXG4gICAgICAoY2hhbmdlc1snY3VycmVudCddICYmIGNoYW5nZXNbJ2N1cnJlbnQnXS5jdXJyZW50VmFsdWUpIHx8XG4gICAgICAoY2hhbmdlc1sndG90YWwnXSAmJiBjaGFuZ2VzWyd0b3RhbCddLmN1cnJlbnRWYWx1ZSlcbiAgICApIHtcbiAgICAgIHRoaXMucGFnZXMgPSB0aGlzLmdldFBhZ2VzKHRoaXMuY3VycmVudCwgdGhpcy50b3RhbCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRQYWdlcyhjdXJyZW50OiBudW1iZXIsIHRvdGFsOiBudW1iZXIpOiBudW1iZXJbXSB7XG4gICAgaWYgKHRvdGFsIDw9IDcpIHtcbiAgICAgIHJldHVybiBbLi4uQXJyYXkodG90YWwpLmtleXMoKV0ubWFwKHggPT4gKyt4KVxuICAgIH1cbiAgICBpZiAoY3VycmVudCA+IDUpIHtcbiAgICAgIGlmIChjdXJyZW50ID49IHRvdGFsIC0gNCkge1xuICAgICAgICByZXR1cm4gWzEsIHRvdGFsIC0gNSwgdG90YWwgLSA0LCB0b3RhbCAtIDMsIHRvdGFsIC0gMiwgdG90YWwgLSAxLCB0b3RhbF1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBbMSwgY3VycmVudCAtIDIsIGN1cnJlbnQgLSAxLCBjdXJyZW50LCBjdXJyZW50ICsgMSwgY3VycmVudCArIDIsIHRvdGFsXVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gWzEsIDIsIDMsIDQsIDUsIDYsIHRvdGFsXVxuICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gIDxkaXYgY2xhc3M9XCJwYWdpbmF0aW9uXCI+XG4gICAgPGxpICpuZ0lmPVwiY3VycmVudCA+IDFcIj48YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgW2F0dHIuYXJpYS1kaXNhYmxlZF09XCJjdXJyZW50ID09PSAxXCJcbiAgICAgICAgKGNsaWNrKT1cIm9uUHJldmlvdXMoKVwiPiZsYXF1bzs8L2E+PC9saT5cblxuICAgIDxsaSAqbmdGb3I9XCJsZXQgcGFnZSBvZiBwYWdlcztcIj48YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgW2F0dHIuYXJpYS1jdXJyZW50XT1cInBhZ2UgPT09IGN1cnJlbnQgPyAncGFnZScgOiBudWxsXCJcbiAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJcbiAgICAgICAgICBwYWdlID09PSBjdXJyZW50ID8gJ0N1cnJlbnQgUGFnZSwgUGFnZSAnICsgcGFnZSA6ICdHbyB0byBQYWdlICcgKyBwYWdlXG4gICAgICAgIFwiIFtjbGFzcy5hY3RpdmVdPVwicGFnZSA9PSBjdXJyZW50XCIgdGFiaW5kZXg9XCIwXCIgKGNsaWNrKT1cIm9uR29UbyhwYWdlKVwiXG4gICAgICAgIChrZXl1cC5lbnRlcik9XCJvbkdvVG8ocGFnZSlcIj57e3BhZ2V9fTwvYT48L2xpPlxuXG4gICAgPGxpICpuZ0lmPVwiY3VycmVudCA8IHRvdGFsXCI+PGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIGFyaWEtbGFiZWw9XCJHbyBUbyBOZXh0IFBhZ2VcIlxuICAgICAgICBbYXR0ci5hcmlhLWRpc2FibGVkXT1cImN1cnJlbnQgPT09IHRvdGFsXCIgKGNsaWNrKT1cIm9uTmV4dCgpXCI+JnJhcXVvOzwvYT48L2xpPlxuICA8L2Rpdj4iXX0=