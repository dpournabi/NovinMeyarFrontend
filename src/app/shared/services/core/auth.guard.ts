// import { Injectable } from '@angular/core';
// import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// import { AuthService } from './auth.service';
// import { AppUserService } from '@app/shared/services/custom';
// import { ReloadPermissionService } from '@app/shared/Ng2Permission/reloadPermission.service';
// import { Observable } from 'rxjs/Observable';

// @Injectable()
// export class AuthGuard implements CanActivate {
//   constructor(private authService: AuthService,
//     private _ReloadPermissionService: ReloadPermissionService,
//     private _AppUserService: AppUserService,
//     private router: Router) { }

//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

//     if (this._AppUserService.isAuthenticated()) {

//       return this._ReloadPermissionService.refreshPermission();

//     } else {

//       this.router.navigate(['/login']);

//     }

//   }

// }
