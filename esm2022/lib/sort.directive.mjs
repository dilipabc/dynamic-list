import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import * as i0 from "@angular/core";
export class SortDirective {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9keW5hbWljLWxpc3Qvc3JjL2xpYi9zb3J0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFjLFlBQVksRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBYSxNQUFNLGVBQWUsQ0FBQzs7QUFLNUcsTUFBTSxPQUFPLGFBQWE7SUFPeEIsWUFBb0IsRUFBYyxFQUFVLFFBQW1CO1FBQTNDLE9BQUUsR0FBRixFQUFFLENBQVk7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBTHRELFlBQU8sR0FBVyxFQUFFLENBQUM7UUFDcEIsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFTLENBQUM7UUFFckMsa0JBQWEsR0FBWSxJQUFJLENBQUMsQ0FBRSwyQ0FBMkM7SUFFaEIsQ0FBQztJQUdwRSxRQUFRO1FBRU4sSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBRSx1QkFBdUI7UUFFbEUsSUFBSSxVQUFVLEdBQU87WUFDbkIsT0FBTyxFQUFHLElBQUksQ0FBQyxPQUFPO1lBQ3RCLGFBQWEsRUFBRyxJQUFJLENBQUMsYUFBYTtTQUNuQyxDQUFBO1FBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFTyxZQUFZO1FBQ2xCLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxDQUFHLHVCQUF1QjtRQUNuRCxNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsQ0FBQyx5QkFBeUI7UUFFckQscUNBQXFDO1FBRXJDLHdCQUF3QjtRQUN4QixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRTNJLGdCQUFnQjtRQUNoQixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDdkgsQ0FBQzsrR0FsQ1UsYUFBYTttR0FBYixhQUFhOzs0RkFBYixhQUFhO2tCQUh6QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxXQUFXO2lCQUN0Qjt5SEFHVSxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0ksTUFBTTtzQkFBZixNQUFNO2dCQU9QLFFBQVE7c0JBRFAsWUFBWTt1QkFBQyxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE91dHB1dCwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1thcHBTb3J0XSdcbn0pXG5leHBvcnQgY2xhc3MgU29ydERpcmVjdGl2ZSB7XG5cbiAgQElucHV0KCkgc29ydEtleTogc3RyaW5nID0gJyc7XG4gIEBPdXRwdXQoKSBzb3J0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueVtdPigpO1xuXG4gIHByaXZhdGUgc29ydERpcmVjdGlvbjogYm9vbGVhbiA9IHRydWU7ICAvLyB0cnVlIGZvciBhc2NlbmRpbmcsIGZhbHNlIGZvciBkZXNjZW5kaW5nXG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZiwgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyKSB7IH1cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycpXG4gIHNvcnREYXRhKCkgeyAgIFxuXG4gICAgdGhpcy5zb3J0RGlyZWN0aW9uID0gIXRoaXMuc29ydERpcmVjdGlvbjsgIC8vIHRvZ2dsZSB0aGUgZGlyZWN0aW9uXG5cbiAgICBsZXQgcmV0dXJuRGF0YTphbnkgPSB7XG4gICAgICBzb3J0S2V5IDogdGhpcy5zb3J0S2V5LFxuICAgICAgc29ydERpcmVjdGlvbiA6IHRoaXMuc29ydERpcmVjdGlvblxuICAgIH1cblxuICAgIHRoaXMuc29ydGVkLmVtaXQocmV0dXJuRGF0YSk7XG4gICAgdGhpcy5zZXRBcnJvd0ljb24oKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0QXJyb3dJY29uKCkge1xuICAgIGNvbnN0IHVwQXJyb3cgPSAnXFx1MjVCMic7ICAgLy8gVW5pY29kZSBmb3IgdXAgYXJyb3dcbiAgICBjb25zdCBkb3duQXJyb3cgPSAnXFx1MjVCQyc7IC8vIFVuaWNvZGUgZm9yIGRvd24gYXJyb3dcblxuICAgIC8vY29uc29sZS5sb2codGhpcy5lbC5uYXRpdmVFbGVtZW50KTtcblxuICAgIC8vIFJlbW92ZSBleGlzdGluZyBhcnJvd1xuICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnaW5uZXJIVE1MJywgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmlubmVySFRNTC5yZXBsYWNlKHVwQXJyb3csICcnKS5yZXBsYWNlKGRvd25BcnJvdywgJycpKTtcblxuICAgIC8vIEFkZCBuZXcgYXJyb3dcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgdGhpcy5yZW5kZXJlci5jcmVhdGVUZXh0KHRoaXMuc29ydERpcmVjdGlvbiA/IGRvd25BcnJvdyA6IHVwQXJyb3cpKTtcbiAgfVxufVxuIl19