
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { ApiConfig } from 'src/app/shared/api.config';
import { environment } from 'src/environments/environment';
import { BaseService } from '../../core/base.service';
import { ErrorHandler } from '../../core/error.service';
import { JSONSearchParams } from '../../core/search.params';

@Injectable({ providedIn: 'root' })
export class BaseDataService extends BaseService<any> {
    public getModelDefinition() {
        return {
            name: 'api/v1/BaseInformation',
            plural: 'BaseInformation',
            title: 'اطلاعات پایه',
            crudActions: {
                elevatorTypes: 'getElevatorTypes',
                inspectionTypes: 'getInspectionTypes',
                latestCert: 'getLatestCertificateTypes',
                provinces: 'city/getProvinces',
                city: 'city/getCities',
                getLocationTypes: 'GetLocationTypes',
                getCounterWeightTypes: 'GetCounterWeightTypes',
                confirm:'Confirmation'
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

    getElevatorTypes() {
        let url =
            `${environment.technicalPath}/${this.getModelDefinition().name}/${this.getModelDefinition().crudActions.elevatorTypes}`;

        return this.getRequest(url);
    }

    getInspectionTypes() {
        let url =
            `${environment.technicalPath}/${this.getModelDefinition().name}/${this.getModelDefinition().crudActions.inspectionTypes}`;

        return this.getRequest(url);
    }

    getLatestCert() {
        let url =
            `${environment.technicalPath}/${this.getModelDefinition().name}/${this.getModelDefinition().crudActions.latestCert}`;

        return this.getRequest(url);
    }

    getProvinces(name: string) {
        let url =
            `${environment.commonPath}/api/v1/${this.getModelDefinition().crudActions.provinces}`;

        return this.postRequest(url, { name: name });
    }

    getCity(name: string, id: number) {
        let url =
            `${environment.commonPath}/api/v1/${this.getModelDefinition().crudActions.city}`;

        return this.postRequest(url, { name: name, provinceId: id });
    }

    getProvinceById(id: any) {
        let url =
            `${environment.commonPath}/api/v1/${this.getModelDefinition().crudActions.provinces}`;

        return this.postRequest(url, { provinceId: id });
    }

    getLocationTypes(id: number) {
        let url =
            `${environment.technicalPath}/${this.getModelDefinition().name}/${this.getModelDefinition().crudActions.getLocationTypes}?LocationEnum=${id}`;

        return this.postRequest(url, null);
    }

    getCounterWeightTypes() {
        let url =
            `${environment.technicalPath}/${this.getModelDefinition().name}/${this.getModelDefinition().crudActions.getCounterWeightTypes}`;

        return this.getRequest(url, null);
    }

}