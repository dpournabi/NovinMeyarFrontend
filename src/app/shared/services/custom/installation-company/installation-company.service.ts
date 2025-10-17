

import { Inject, Optional, Injectable } from '@angular/core';
import { BaseService } from '../../core/base.service';
import { ApiConfig } from '../../../api.config';
import { JSONSearchParams } from '../../core/search.params';
import { ErrorHandler } from '../../core/error.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class InstallationCompanyService extends BaseService<any> {
    public getModelDefinition() {
        return {
            name: 'api/v1/InstallatinCompany',
            plural: 'InstallatinCompany',
            title: 'فروشندگان',
            crudActions: {
                add: 'registerNew',
                search: 'search',
                deactive: 'Deactive',
                edit: 'edit'
            }
        };
    }
    public factory(data: any) {
        return data;
    }
    constructor(protected Http: HttpClient,
        @Inject(JSONSearchParams) protected searchParams: JSONSearchParams,
        @Optional() @Inject(ErrorHandler) protected errorHandler: ErrorHandler) {
        super(Http, searchParams, errorHandler);
    }

    registerNew(data) {
        let url = `${environment.technicalPath}/${this.getModelDefinition().name}/${this.getModelDefinition().crudActions.add}`;
        return this.postRequest(url, data);
    }

    search(data) {
        let url =
            `${environment.technicalPath}/${this.getModelDefinition().name}/${this.getModelDefinition().crudActions.search}`;

        return this.postRequest(url, data);
    }

    deactive(id) {
        let url =
            `${environment.technicalPath}/${this.getModelDefinition().name}/${this.getModelDefinition().crudActions.deactive}?installatinCompanyId=${id}`;

        return this.postRequest(url, null);
    }

    edit(data) {
        let url =
            `${environment.technicalPath}/${this.getModelDefinition().name}/${this.getModelDefinition().crudActions.edit}`;

        return this.postRequest(url, data);
    }
}