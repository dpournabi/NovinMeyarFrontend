import { Inject, Optional, Injectable } from '@angular/core';
import { BaseService } from '../../core/base.service';
import { JSONSearchParams } from '../../core/search.params';
import { ErrorHandler } from '../../core/error.service';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable()
export class RoleService extends BaseService<any> {

    public factory(data: any): any {
        return data;
    }

    public getModelDefinition(): any {
        return {
            name: 'Role',
            plural: 'Role',
            title: 'نقض',
            crudActions: {
                add: '',
                get: 'GetAll'
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

    getRole() {
        return this.find('get').pipe(catchError((e) => this.errorHandler.handleError(e)));
    }

}
