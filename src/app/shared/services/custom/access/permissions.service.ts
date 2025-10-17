
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { BaseService } from '../../core/base.service';
import { ErrorHandler } from '../../core/error.service';
import { JSONSearchParams } from '../../core/search.params';

@Injectable({providedIn: 'root'})
export class PermissionsService extends BaseService<any> {
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
}