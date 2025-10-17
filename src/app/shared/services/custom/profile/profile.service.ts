import { Inject, Optional, Injectable } from '@angular/core';
import { BaseService } from '../../core/base.service';
import { ApiConfig } from '../../../api.config';
import { JSONSearchParams } from '../../core/search.params';
import { ErrorHandler } from '../../core/error.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class ProfileService extends BaseService<any> {

    public factory(data: any): any {
        return data;
    }

    public getModelDefinition(): any {
        return {
            name: 'UserProfile',
            plural: 'Profile',
            title: 'پروفایل',
            crudActions: {
                add: 'AddProfile',
                get: 'GetProfileUser',
                delete: 'DeleteProfileById',
                update: 'UpdateUserProfile'
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

    getUserProfile() {

        const url = [
            environment.identityPath,
            this.getModelDefinition().name,
            this.getModelDefinition().crudActions.get
        ].join('/');

        return this.getRequest(url);

    }

    saveProfile(data: any) {

        const url = [
            environment.identityPath,
            this.getModelDefinition().name,
            this.getModelDefinition().crudActions.update
        ].join('/');

        return this.postRequest(url, data);

    }

}
