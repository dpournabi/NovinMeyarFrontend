
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { BaseService } from '../core/base.service';
import { JSONSearchParams } from '../core/search.params';
import { ErrorHandler } from '../core/error.service';
import { ApiConfig } from '../../api.config';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class TestService extends BaseService<any> {
    public factory(data: any) {
        return data;
    }
    public getModelDefinition() {

    }
    constructor(protected Http: HttpClient,
        @Inject(JSONSearchParams) protected searchParams: JSONSearchParams,
        @Optional() @Inject(ErrorHandler) protected errorHandler: ErrorHandler) {
        super(Http, searchParams, errorHandler);
    }
    
    testGet() {

        return this.getRequest(`${environment.identityPath}/api/v1/Account/Administrator/GetAllRoles`);
    }
}