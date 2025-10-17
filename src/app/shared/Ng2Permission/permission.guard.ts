import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Ng2PermissionService } from './permission.service';
import { IPermissionGuardModel } from './permission-guard.model';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../services/core/auth.service';

@Injectable()
export class PermissionGuard implements CanActivate {

    constructor(
        private _permissionService: Ng2PermissionService,
        private router: Router,
        private _AuthService: AuthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (localStorage.getItem('token')) {
            //return this.checkPermission(route, state);
            return true;
        }
        else {
            const data = route.data.Permission as IPermissionGuardModel;

            if (data.RedirectTo && data.RedirectTo !== undefined) {
                this.router.navigate([data.RedirectTo]);
            }
            return false
        }        
    }

    checkPermission(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

        const data = route.data.Permission as IPermissionGuardModel;

        if (Array.isArray(data.Only) && Array.isArray(data.Except)) {
            console.log('can\'t use both \'Only\' and \'Except\' in route data.');
            return of(false);
        }

        if (Array.isArray(data.Only)) {
            const hasDefined = this._permissionService.hasOneDefined(data.Only);

            if (hasDefined) {
                return of(true);
            }
        }
        else if (Array.isArray(data.Except)) {
            const hasDefined = this._permissionService.hasOneDefined(data.Except);

            if (!hasDefined) {
                return of(true);
            }
        }

        return this.getFromServer(route, state).pipe(
            map((resp: boolean) => {

                if (!resp) {
                    if (data.RedirectTo && data.RedirectTo !== undefined) {
                        this.router.navigate([data.RedirectTo]);
                    }
                }
                return resp
            }),
            catchError(() => {
                if (data.RedirectTo && data.RedirectTo !== undefined) {
                    this.router.navigate([data.RedirectTo]);
                }
                return of(false);
            })
        );
    }

    getFromServer(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

        const data = route.data.Permission as IPermissionGuardModel;

        return this._AuthService.getMyUserRoleName().pipe(
            map((resp: any) => {
                switch (resp.status) {
                    case 'Success':
                            this._permissionService.define([resp.data.userRoleName]);
                        break;

                    default:
                        if (data.RedirectTo && data.RedirectTo !== undefined) {
                            this.router.navigate([data.RedirectTo]);
                        }
                        break;
                }

                return this._permissionService.hasOneDefined(data.Only || data.Except);

            })
        );

    }

}
