import { Inject, Optional, Injectable } from '@angular/core';
import { BaseService } from '../../core/base.service';
import { JSONSearchParams } from '../../core/search.params';
import { ErrorHandler } from '../../core/error.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserService extends BaseService<any> {

    public factory(data: any): any {
        return data;
    }

    public getModelDefinition(): any {
        return {
            name: 'api/v1/Account',
            plural: 'api/v1/Acount',
            title: 'کاربران',
            crudActions: {
                getUsers: 'Administrator/GetAllUsers',
                getRoles: 'Administrator/GetAllRoles',
                resetPasswordByAdmin: 'Administrator/ResetPasswordByAdmin',
                unlockUserByAdmin: 'Administrator/UnlockUserByAdmin',
                updateUser: 'Administrator/UpdateUser'
            }
        };
    }

    constructor(
        protected Http: HttpClient,
        @Inject(JSONSearchParams) protected searchParams: JSONSearchParams,
        @Optional() @Inject(ErrorHandler) protected errorHandler: ErrorHandler
    ) {
        super(Http, searchParams, errorHandler);
    }

    getUsers(phrase) {
        const url = [
            environment.identityPath,
            this.getModelDefinition().name,
            this.getModelDefinition().crudActions.getUsers,
            `?phrase=${phrase}`
        ].join('/');

        return this.postRequest(url,null)
            .pipe(catchError((e) => this.errorHandler.handleError(e)));
    }
    getRoles() {
        const url = [
            environment.identityPath,
            this.getModelDefinition().name,
            this.getModelDefinition().crudActions.getRoles
        ].join('/');
        console.log(url);
        return this.getRequest(url,null)
            .pipe(catchError((e) => this.errorHandler.handleError(e)));
    }

    resetPassword(userName) {
        debugger
        const url = [
            environment.identityPath,
            this.getModelDefinition().name,
            this.getModelDefinition().crudActions.resetPasswordByAdmin,
            `?userName=${userName}`
        ].join('/');

        return this.postRequest(url,null)
            .pipe(catchError((e) => this.errorHandler.handleError(e)));
    }

    unlockUser(userName) {
        debugger
        const url = [
            environment.identityPath,
            this.getModelDefinition().name,
            this.getModelDefinition().crudActions.unlockUserByAdmin,
            `?userName=${userName}`
        ].join('/');

        return this.postRequest(url,null)
            .pipe(catchError((e) => this.errorHandler.handleError(e)));
    }

    updateUser(user) {
        debugger
        const url = [
            environment.identityPath,
            this.getModelDefinition().name,
            this.getModelDefinition().crudActions.updateUser
        ].join('/');

        return this.postRequest(url,user)
            .pipe(catchError((e) => this.errorHandler.handleError(e)));
    }
}
