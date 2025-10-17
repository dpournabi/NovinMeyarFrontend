import { Inject, Optional, Injectable } from '@angular/core';
import { BaseService } from '../../core/base.service';
import { ApiConfig } from '../../../api.config';
import { JSONSearchParams } from '../../core/search.params';
import { ErrorHandler } from '../../core/error.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class WorkflowService extends BaseService<any> {

  public getModelDefinition() {
    return {
      name: 'api/v1/BaseInformation',
      plural: 'BaseInformation',
      title: 'کارتابل',
      crudActions: {
        searchRequest: 'SearchRequest',
        seenRequest: 'SeenRequest',
        undoRequestState:'UndoRequestState',
        requestTypesPaged: 'RequestTypesPaged',
        confirm: 'Confirmation',
        reject: 'Reject',
        Comment: {
          create: "CreateComment",
          getAll: "GetComments",
        },
      },
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

  requestTypesPaged(data) {
    let url = `${environment.cartablePath}/${this.getModelDefinition().name}/${this.getModelDefinition().crudActions.requestTypesPaged}`;
    return this.postRequest(url, data);
  }

  SearchRequest(data) {
    let url = `${environment.cartablePath}/${this.getModelDefinition().name}/${this.getModelDefinition().crudActions.searchRequest}`;
    return this.postRequest(url, data);
  }
  seenRequest(id) {
    let url = `${environment.cartablePath}/${this.getModelDefinition().name}/${this.getModelDefinition().crudActions.searchRequest}`;
    return this.postRequest(url, id);
  }
  undoRequestState(id) {
    debugger
    let url = `${environment.cartablePath}/${this.getModelDefinition().name}/${this.getModelDefinition().crudActions.undoRequestState}?id=${id}`;
    return this.postRequest(url, null);
  }
  confirmation(id) {
    let url =`${environment.cartablePath}/${this.getModelDefinition().name}/${this.getModelDefinition().crudActions.confirm}?id=${id}`;
    return this.postRequest(url, null);
  }
  reject(id) {
    let url = `${environment.cartablePath}/${this.getModelDefinition().name}/${this.getModelDefinition().crudActions.reject}?id=${id}`;
    return this.postRequest(url, null);
  }
  CreateComment(id, data) {
    let url = `${environment.cartablePath}/${this.getModelDefinition().name}/${this.getModelDefinition().crudActions.Comment.create}?id=${id}`;
    return this.postRequest(url, data);
  }
  GetComments(id) {
    let url = `${environment.cartablePath}/${this.getModelDefinition().name}/${this.getModelDefinition().crudActions.Comment.getAll}?id=${id}`;
    return this.getRequest(url);
  }
}
