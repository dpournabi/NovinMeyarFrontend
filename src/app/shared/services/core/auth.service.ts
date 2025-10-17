declare var Object: any;
import { Injectable, Inject, ErrorHandler, Optional } from '@angular/core';
import { ApiConfig } from '../../api.config';
import { Observable, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseService } from './base.service';
import { AuthModel, IAuthModel, IForgetPassModel, IUserCodeModel, RegisterModel } from '../../models/auth.model';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService extends BaseService<AuthModel> {

  public factory(data: IAuthModel): AuthModel {
    return new AuthModel(data);
  }

  public getModelDefinition(): any {
    return {
      name: 'User',
      account : 'account',
      plural: 'User',
      crudActions: {
        post: 'Login',
        add: 'Register',
        update: 'ForgetPassword',
        other: {
          checkUserCode: 'CheckUserCode',
          getMyAccess: 'GetMyAccess',
          getMyUserRoleName: 'GetMyUserRoleName'
        }
      }
    };
  }

  public login(data: AuthModel): Observable<any> {

    const _url: string = [
      environment.identityPath,
      'api/v1/Account',
      'Login'
    ].join('/');

    const body = JSON.stringify(data);

    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'No-Auth': 'True',
      'Access-Control-Allow-Origin': '*'
    });

    return this.Http.post(_url, body, { headers: reqHeader })
      .pipe(catchError((e) => this.errorHandler.handleError(e)));
  }

  public register(data: RegisterModel): Observable<any> {

    const _url: string = [
      environment.identityPath,
      this.getModelDefinition().name,
      this.getModelDefinition().crudActions.add
    ].join('/');


    const body = JSON.stringify(data);

    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'No-Auth': 'True',
    });


    return this.Http.post(_url, body, { headers: reqHeader })
      .pipe(catchError((e) => this.errorHandler.handleError(e)));
  }

  public forgetPass(data: IForgetPassModel): Observable<any> {

    const _url: string = [
      environment.identityPath,
      this.getModelDefinition().name,
      this.getModelDefinition().crudActions.update
    ].join('/');

    let _params = new HttpParams();
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const element = data[key];
        _params = _params.append(key, element);
      }
    };

    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'No-Auth': 'True'
    });

    return this.Http.post(_url, null, { headers: reqHeader, params: _params })
      .pipe(catchError((e) => this.errorHandler.handleError(e)));
  }

  public checkUserCode(data: IUserCodeModel): Observable<any> {

    const _url: string = [
      environment.identityPath,
      this.getModelDefinition().name,
      this.getModelDefinition().crudActions.other.checkUserCode
    ].join('/');

    let _params = new HttpParams();
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const element = data[key];
        _params = _params.append(key, element);
      }
    };

    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'No-Auth': 'True'
    });

    return this.Http.post(_url, null, { headers: reqHeader, params: _params })
      .pipe(catchError((e) => this.errorHandler.handleError(e)));
  }

  public getMyAccess(): Observable<any> {

    const url = [
      environment.identityPath,
      this.getModelDefinition().name,
      this.getModelDefinition().crudActions.other.getMyAccess
    ].join('/');

    return this.getRequest(url).pipe(catchError((e) => this.errorHandler.handleError(e)));
  }

  public getPermissions() {
    // public getPermissions(): Observable<any> {

    // const _method = 'POST';
    // const _url: string = ApiConfig.getPath() + '/' + ApiConfig.getApiVersion() +
    //   '/Security/GetPermissions';
    // const _postBody: any = {};
    // return this.request(_method, _url, _postBody);
    return ['view', 'create'];
  }

  public getMyUserRoleName(): Observable<any> {

    const url = [
      environment.identityPath,
      this.getModelDefinition().name,
      this.getModelDefinition().crudActions.other.getMyUserRoleName
    ].join('/');

    return this.getRequest(url).pipe(catchError((e) => this.errorHandler.handleError(e)));
  }

  getUserInfo() {
    let jsonInfo = localStorage.getItem('userInfo');
    if (jsonInfo) {
      let info = JSON.parse(jsonInfo);

      return info;
    }
    else {
      return null;
    }
  }


  public SignUp(data): Observable<any> {

    const _url: string = [
      environment.identityPath,
      'api/v1/Account',
      'Register'
    ].join('/');

    const body = JSON.stringify(data);

    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'No-Auth': 'True',
      'Access-Control-Allow-Origin': '*'
    });

    return this.Http.post(_url, body, { headers: reqHeader })
      .pipe(catchError((e) => this.errorHandler.handleError(e)));
  }
  public VERIFY_CODE(data): Observable<any> {

    const _url: string = [
      environment.identityPath,
      'api/v1/Account',
      'verifyregisterationcode'
    ].join('/');

    const body = JSON.stringify(data);

    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'No-Auth': 'True',
      'Access-Control-Allow-Origin': '*'
    });

    return this.Http.post(_url, body, { headers: reqHeader })
      .pipe(catchError((e) => this.errorHandler.handleError(e)));
  }

  public getInstallatinCompany(): Observable<any> {

    const _url: string = [
      environment.technicalPath,
      'api/v1/installatincompany',
      'get'
    ].join('/');

    // const body = JSON.stringify(data);

    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
       Authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : '',
      'Access-Control-Allow-Origin': '*'
    });

    return this.Http.get(_url, { headers: reqHeader })
      .pipe(catchError((e) => this.errorHandler.handleError(e)));
  }
  public EditProfile_Intallation_User(data): Observable<any> {

    const _url: string = [
      environment.technicalPath,
      'api/v1/installatincompany',
      'updateprofile'
    ].join('/');

    // const body = JSON.stringify(data);

    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
       Authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : '',
      'Access-Control-Allow-Origin': '*'
    });
    return this.Http.post(_url,data, { headers: reqHeader })
      .pipe(catchError((e) => this.errorHandler.handleError(e)));
  }

  public getAllNewClients(data): Observable<any> {

    const _url: string = [
      environment.identityPath,
      'api/v1/account',
      'getallnewclients'
    ].join('/');

    // const body = JSON.stringify(data);

    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
       Authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : '',
      'Access-Control-Allow-Origin': '*'
    });

    return this.Http.get(_url + '/' + data, { headers: reqHeader })
      .pipe(catchError((e) => this.errorHandler.handleError(e)));
  }
  public CONFIRM_ADMIN(): Observable<any> {

    const _url: string = [
      environment.identityPath,
      'api/v1/account',
      'confirmbyadmin'
    ].join('/');

    // const body = JSON.stringify(data);

    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
       Authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : '',
      'Access-Control-Allow-Origin': '*'
    });

    return this.Http.get(_url , { headers: reqHeader })
      .pipe(catchError((e) => this.errorHandler.handleError(e)));
  }

  public VARIYFY_BY_ADMIN(data): Observable<any> {

    const _url: string = [
      environment.identityPath,
      'api/v1/account/administrator',
      'VerifyClientByAdmin'
    ].join('/');

    // const body = JSON.stringify(data);

    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
       Authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : '',
      'Access-Control-Allow-Origin': '*'
    });

    return this.Http.post(_url , data , { headers: reqHeader })
      .pipe(catchError((e) => this.errorHandler.handleError(e)));
  }

  public deactivateUser(data): Observable<any> {

    const _url: string = [
      environment.identityPath,
      'api/v1/account/administrator',
      'DeactivateUser'
    ].join('/');

    // const body = JSON.stringify(data);

    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
       Authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : '',
      'Access-Control-Allow-Origin': '*'
    });

    return this.Http.post(_url , data , { headers: reqHeader })
      .pipe(catchError((e) => this.errorHandler.handleError(e)));
  }
}
