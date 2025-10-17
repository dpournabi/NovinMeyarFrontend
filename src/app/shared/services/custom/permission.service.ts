import { Inject, Optional, Injectable } from '@angular/core';
import { BaseService } from '../core/base.service';
import { ApiConfig } from '../../api.config';
import { JSONSearchParams } from '../core/search.params';
import { ErrorHandler } from '../core/error.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class PermissionService extends BaseService<any> {
  public factory(data: any): any {
    return data;
  }

  public getModelDefinition(): any {
    return {
      accountBase: `${environment.identityPath}/api/v1/Account`,
      adminBase: `${environment.identityPath}/api/v1/Account/Administrator`,
      baseTechnical: `${environment.technicalPath}/api/v1/AuthorizationHelper/GetAllActions`,
      baseCartable: `${environment.cartablePath}/api/v1/AuthorizationHelper/GetAllActions`,
      baseFileManagement: `${environment.fileManagerPath}/api/v1/AuthorizationHelper/GetAllActions`,
      baseCustomer: `${environment.customerPath}/api/v1/AuthorizationHelper/GetAllActions`,
      name: 'AccessInformation',
      plural: 'AccessInformation',
      roles: 'GetAllRoles',
      users: 'GetAllUsers',
      removePermission: 'Administrator/RemoveClaim',
      addPermission: 'Administrator/addClaim',
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

  public read(filter: any): Observable<any> {
    const _method = 'GET';
    const _url: string =
      environment.identityPath +
      '/' +
      ApiConfig.getApiVersion() +
      '/Permission/Read';
    const _routeParams: any = {};
    const _postBody: any = {};
    const _urlParams: any = {};
    const result = this.request(_method, _url, _routeParams);
    return result;
  }

  getRoles() {
    return this.getRequest(
      `${this.getModelDefinition().adminBase}/${
        this.getModelDefinition().roles
      }`
    );
  }
  getUsers() {
    return this.getRequest(
      `${this.getModelDefinition().adminBase}/${
        this.getModelDefinition().users
      }`
    );
  }
  removePermission(data) {
    let url = `${this.getModelDefinition().accountBase}/${
      this.getModelDefinition().removePermission
    }`;

    return this.postRequest(url, data);
  }
  addPermission(data) {
    let url = `${this.getModelDefinition().accountBase}/${
      this.getModelDefinition().addPermission
    }`;

    return this.postRequest(url, data);
  }
  getAccessLevels(name) {
    switch (name) {
      case 'Technical':
        return this.getRequest(this.getModelDefinition().baseTechnical);
      case 'Finannce':
        return null;
      case 'Cartable':
        return this.getRequest(this.getModelDefinition().baseCartable);
      case 'File Management':
        return this.getRequest(this.getModelDefinition().baseFileManagement);
      case 'Customer':
        return this.getRequest(this.getModelDefinition().baseCustomer);
      default:
        return null;
    }
  }
  loadAccessLevels(username, rolename) {
    return this.getRequest(
      `${
        this.getModelDefinition().accountBase
      }/GetAccessLevels?userName=${username}&roleName=${rolename}`
    );
  }
}
