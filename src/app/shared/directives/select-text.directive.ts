
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({ 
    selector: '[focus-select]'    
})
export class FocusSelect {
    constructor(private element: ElementRef) { }

    @HostListener('focus')
    onFocus() {
        this.element.nativeElement.select();
    }
}