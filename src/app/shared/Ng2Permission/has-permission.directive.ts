import { Directive, OnInit, ElementRef, Input } from '@angular/core';
import { Ng2PermissionService } from './permission.service';
import { PermissionHelper } from './permission-helper.service';

type method = (...item) => {};

@Directive({
    selector: '[hasPermission]'
})

export class HasPermissionDirective implements OnInit {
    @Input('hasPermission') permissions: Array<string>;
    // tslint:disable-next-line: no-input-rename
    @Input('onAuthorizedPermission') onAuthorized: string | method;
    // tslint:disable-next-line: no-input-rename
    @Input('onUnauthorizedPermission') onUnauthorized: (...item) => {};
    subscription: any;

    constructor(
        private _elem: ElementRef,
        private _Ng2PermissionService: Ng2PermissionService,
        private _helper: PermissionHelper
    ) { }

    ngOnInit() {


        this.subscription = this._Ng2PermissionService.permissionStoreChangeEmitter
            .subscribe(() => {
                this.applyPermission();
            });

        this.applyPermission();
    }

    applyPermission() {
        const hasDefined = this._Ng2PermissionService.hasOneDefined(this.permissions);

        if (!hasDefined) {
            if (typeof this.onUnauthorized === 'function') {
                this.onUnauthorized(this._elem);
            } else if (typeof this.onUnauthorized === 'string') {
                this._helper.ApplyStrategie(this.onUnauthorized, this._elem);
            } else {
                // this._elem.nativeElement.style.display = 'none';
                this._elem.nativeElement.remove();
            }
        } else {
            if (typeof this.onAuthorized === 'function') {
                this.onAuthorized(this._elem);
            } else if (typeof this.onAuthorized === 'string') {
                this._helper.ApplyStrategie(this.onAuthorized, this._elem);
            } else {
                this._elem.nativeElement.style.display = '';
            }
        }
    }

}
