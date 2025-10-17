import { Inject, Optional, Injectable } from '@angular/core';
import { BaseService } from '../../core/base.service';
import { ApiConfig } from '../../../api.config';
import { JSONSearchParams } from '../../core/search.params';
import { ErrorHandler } from '../../core/error.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class FastRegistrationService extends BaseService<any> {
    updateUser(user: any) {
      throw new Error('Method not implemented.');
    }
    public getModelDefinition() {
        return {
            name: 'api/v1/Customer',
            completeRegisteration:'​/api​/v1​/CompleteRegistration​',
            fastName: 'api/v1/FastRegisration',
            cartabl: 'api/v1/BaseInformation',
            plural: 'Customer',
            title: 'مشتریان',
            crudActions: {
                saveReal: 'SaveRealCustomer',
                saveLegal: 'SaveLegalCustomer',
                searchLegal: 'SearchLegalCustomers',
                searchReal: 'SearchRealCustomers',
                deactiveLegal: 'DeactiveLegalCustomer',
                deactiveReal: 'DeactiveRealCustomer',
                save: 'save',
                search: 'search',
                deactive: 'deactive',
                getDisplayInvoice: 'GetDisplayInvoice',
                checkTransactionResult: 'CheckTransactionResult',
                prepareToPay: 'PrepareToPay',
                completeRegistration: 'Save',
                seenRequest:'SeenRequest'
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

    saveReal(data) {
        let url =
            `${environment.customerPath}/${this.getModelDefinition().name}/${this.getModelDefinition().crudActions.saveReal}`;

        return this.postRequest(url, data);
    }

    saveLegal(data) {
        let url =
            `${environment.customerPath}/${this.getModelDefinition().name}/${this.getModelDefinition().crudActions.saveLegal}`;

        return this.postRequest(url, data);
    }

    searchLegal(data) {
        let url =
            `${environment.customerPath}/${this.getModelDefinition().name}/${this.getModelDefinition().crudActions.searchLegal}`;

        return this.postRequest(url, data);
    }

    searchReal(data) {
        let url =
            `${environment.customerPath}/${this.getModelDefinition().name}/${this.getModelDefinition().crudActions.searchReal}`;

        return this.postRequest(url, data);
    }

    deactiveLegal(id) {
        let url =
            `${environment.customerPath}/${this.getModelDefinition().name}/${this.getModelDefinition().crudActions.deactiveLegal}?customerId=${id}`;

        return this.postRequest(url, null);
    }

    seenRequestAsync(id) {
        debugger
        let url =
            `${environment.cartablePath}/${this.getModelDefinition().cartabl}/${this.getModelDefinition().crudActions.seenRequest}?id=${id}`;

        return this.postRequest(url, null);
    }

    deactiveReal(id) {
        let url =
            `${environment.customerPath}/${this.getModelDefinition().name}/${this.getModelDefinition().crudActions.deactiveReal}?customerId=${id}`;

        return this.postRequest(url, null);
    }

    fastRegister(data) {
        let url =
            `${environment.technicalPath}/${this.getModelDefinition().fastName}/${this.getModelDefinition().crudActions.save}`;

        return this.postRequest(url, data);
    }

    completeRegistration(data) {
        let url =
            `${environment.technicalPath}/${this.getModelDefinition().completeRegisteration}/${this.getModelDefinition().crudActions.completeRegistration}`;

        return this.postRequest(url, data);
    }

    getDisplayInvoice(tag) {
        let url =
        `${environment.technicalPath}/${this.getModelDefinition().fastName}/${this.getModelDefinition().crudActions.getDisplayInvoice}?tag=${tag}`;
        return this.postRequest(url, null);
    }

    checkTransactionResult(data) {
        let url = `${environment.technicalPath}/${this.getModelDefinition().fastName}/${this.getModelDefinition().crudActions.checkTransactionResult}`;
        return this.postRequest(url, data);
    }

    getPaymentToken(tag) {
        let url =
        `${environment.technicalPath}/${this.getModelDefinition().fastName}/${this.getModelDefinition().crudActions.prepareToPay}?tag=${tag}`;
        return this.postRequest(url, null);
    }

    searchRegistrations(data) {
        let url = 
            `${environment.technicalPath}/${this.getModelDefinition().fastName}/${this.getModelDefinition().crudActions.search}`;

        return this.postRequest(url, data);
    }
    deactiveRegistration(id) {
        let url =
            `${environment.technicalPath}/${this.getModelDefinition().fastName}/${this.getModelDefinition().crudActions.deactive}?id=${id}`;

        return this.postRequest(url, null);
    }

}