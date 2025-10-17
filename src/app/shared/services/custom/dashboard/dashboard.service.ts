import { Inject, Optional, Injectable } from '@angular/core';
import { BaseService } from '../../core/base.service';
import { JSONSearchParams } from '../../core/search.params';
import { ErrorHandler } from '../../core/error.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DashboardService extends BaseService<any> {

    public factory(data: any): any {
        return data;
    }

    public getModelDefinition(): any {
        return {
            name: 'UserDashboard',
            plural: 'Dashboard',
            title: 'داشبورد',
            crudActions: {
                add: 'AddDashboard',
                get: 'GetDashboardUser',
                delete: 'DeleteDashboardById',
                update: 'UpdateUserDashboard'
            }
        };
    }

    constructor(
        // @Inject(Http) protected http: Http,
        protected Http: HttpClient,
        @Inject(JSONSearchParams) protected searchParams: JSONSearchParams,
        @Optional() @Inject(ErrorHandler) protected errorHandler: ErrorHandler
    ) {
        super(Http, searchParams, errorHandler);
    }

}
