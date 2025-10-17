
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { ApiConfig } from 'src/app/shared/api.config';
import { environment } from 'src/environments/environment';
import { BaseService } from '../../core/base.service';
import { ErrorHandler } from '../../core/error.service';
import { JSONSearchParams } from '../../core/search.params';

@Injectable({ providedIn: 'root' })
export class BaseInfoService extends BaseService<any> {
    public getModelDefinition() {
        return {
            name: 'BaseInformation',
            crudActions: {
                save: 'Save',
                search: 'search',
                deactive: 'deactive',
                saveProp: 'saveproperty',
                getTree: 'getTree',
                searchProperties: 'searchProperty',
                getItem: 'getObjectDetailItems',
                deactiveDetailProperty: 'DeactiveObjectDetailProperty',
                deleteProperty: 'DeleteProperty'
            }
        };
    }
    public factory(data: any) {
        return data;
    }
    constructor(
        protected Http: HttpClient,
        @Inject(JSONSearchParams) protected searchParams: JSONSearchParams,
        @Optional() @Inject(ErrorHandler) protected errorHandler: ErrorHandler
    ) {
        super(Http, searchParams, errorHandler);
    }

    addInfo(data) {
        let url =
            `${environment.technicalPath}/api/v1/${this.getModelDefinition().name}/${this.getModelDefinition().crudActions.save}`;
        return this.postRequest(url, data);
    }

    deactive(id) {
        let url =
            `${environment.technicalPath}/api/v1/${this.getModelDefinition().name}/${this.getModelDefinition().crudActions.deactive}?objectDetailId=${id}`;
        return this.postRequest(url, null);
    }

    search(searchModel) {
        let url =
            `${environment.technicalPath}/api/v1/${this.getModelDefinition().name}/${this.getModelDefinition().crudActions.search}`;

        return this.postRequest(url, searchModel);
    }

    getTree() {
        let url =
            `${environment.technicalPath}/api/v1/${this.getModelDefinition().name}/${this.getModelDefinition().crudActions.getTree}`;

        return this.getRequest(url);
    }

    saveProperty(propData) {
        let url =
            `${environment.technicalPath}/api/v1/${this.getModelDefinition().name}/${this.getModelDefinition().crudActions.saveProp}`;

        return this.postRequest(url, propData);
    }

    searchProperty(searchData) {
        let url =
            `${environment.technicalPath}/api/v1/${this.getModelDefinition().name}/${this.getModelDefinition().crudActions.searchProperties}`;

        return this.postRequest(url, searchData);
    }

    getItems(id) {
        let url =
            `${environment.technicalPath}/api/v1/${this.getModelDefinition().name}/${this.getModelDefinition().crudActions.getItem}?id=${id}`;

        return this.getRequest(url);
    }

    deactiveObjectDetailProperty(id) {
        let url =
            `${environment.technicalPath}/api/v1/${this.getModelDefinition().name}/${this.getModelDefinition().crudActions.deactiveDetailProperty}?objectDetailPropertyId=${id}`;

        return this.postRequest(url, null);
    }

    deleteProperty(id) {
        let url =
            `${environment.technicalPath}/api/v1/${this.getModelDefinition().name}/${this.getModelDefinition().crudActions.deleteProperty}?id=${id}`;

        return this.postRequest(url, null);
    }
}