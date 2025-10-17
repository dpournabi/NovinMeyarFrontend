
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, Optional } from '@angular/core';
import { BaseService } from '../../core/base.service';
import { ErrorHandler } from 'src/app/shared/services/core/error.service';
import { JSONSearchParams } from 'src/app/shared/services/core/search.params';
import { ApiConfig } from 'src/app/shared/api.config';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class InspectionService extends BaseService<any> {
    public getModelDefinition() {
        return {
            name: 'api/v1/ElevatorInspection',
            plural: 'ElevatorInspection',
            title: 'بازرسی',
            crudActions: {
                get: 'get',
                save: 'save',
                notify:'notify',
                deactive: 'Deactive'
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
    
    getData(id: number) {
        let url =
            `${environment.technicalPath}/${this.getModelDefinition().name}/${this.getModelDefinition().crudActions.get}?id=${id}`;

        return this.getRequest(url);
    }

    saveData(data: any) {
        let url =
            `${environment.technicalPath}/${this.getModelDefinition().name}/${this.getModelDefinition().crudActions.save}`;

        return this.postRequest(url, data);
    }

    notify(data: any) {
        let url =
            `${environment.technicalPath}/${this.getModelDefinition().name}/${this.getModelDefinition().crudActions.notify}`;

        return this.postRequest(url, data);
    }

    deactive(id: number) {
        let url =
            `${environment.technicalPath}/${this.getModelDefinition().name}/${this.getModelDefinition().crudActions.deactive}?id=${id}`;

        return this.postRequest(url, null);
    }
}