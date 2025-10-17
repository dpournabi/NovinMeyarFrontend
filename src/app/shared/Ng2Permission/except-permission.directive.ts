import { Directive, OnInit, ElementRef, Input } from '@angular/core';
import { Ng2PermissionService } from './permission.service';
import { PermissionHelper } from './permission-helper.service';


@Directive({
    selector: '[exceptPermission]'
})
export class ExceptPermissionDirective implements OnInit {
    // tslint:disable-next-line: no-input-rename
    @Input('exceptPermission') exceptPermission: string[];
    // tslint:disable-next-line:no-input-rename
    @Input('onAuthorizedPermission') onAuthorized: (...item) => {};
    // tslint:disable-next-line:no-input-rename
    @Input('onUnauthorizedPermission') onUnauthorized: (...item) => {};

    constructor(
        private _elem: ElementRef<any>,
        private _Ng2PermissionService: Ng2PermissionService,
        private _helper: PermissionHelper) { }

    ngOnInit() {
        this._Ng2PermissionService.permissionStoreChangeEmitter
            .subscribe(() => {
                this.applyPermission();
            });

        this.applyPermission();
    }

    applyPermission() {
        const hasDefined = this._Ng2PermissionService.hasOneDefined(this.exceptPermission);

        if (hasDefined) {
            if (typeof this.onAuthorized === 'function') {
                this.onAuthorized(this._elem);
            } else if (typeof this.onAuthorized === 'string') {
                this._helper.ApplyStrategie(this.onAuthorized, this._elem);
            } else {
                this._elem.nativeElement.style.display = 'none';
            }
        } else {
            if (typeof this.onUnauthorized === 'function') {
                this.onUnauthorized(this._elem);
            } else if (typeof this.onUnauthorized === 'string') {
                this._helper.ApplyStrategie(this.onUnauthorized, this._elem);
            } else {
                this._elem.nativeElement.style.display = '';
            }
        }
    }
}
