import { Observable } from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import { Ng2PermissionService } from './permission.service';
import { AuthService } from '../services/core/auth.service';

@Injectable()
export class ReloadPermissionService {

    constructor(
        private _Ng2PermissionService: Ng2PermissionService,
        private _AuthService: AuthService,
        @Inject(AuthService) protected auth: AuthService
    ) { 
    }

}
