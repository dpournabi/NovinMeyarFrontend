import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, Optional } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { ApiConfig } from "src/app/shared/api.config";
import { environment } from "src/environments/environment";
import { BaseService } from "./base.service";
import { ErrorHandler } from "./error.service";
import { JSONSearchParams } from "./search.params";


@Injectable()
export class UserManagmentService extends BaseService<any> {
    
    public factory(data: any): any {
        return data;
    }

    constructor(
        // @Inject(Http) protected http: Http,
        protected Http: HttpClient,
        @Inject(JSONSearchParams) protected searchParams: JSONSearchParams,
        @Optional() @Inject(ErrorHandler) protected errorHandler: ErrorHandler
    ) {
        super(Http, searchParams, errorHandler);
    }

    public getModelDefinition(): any {
        return {
            identityServicePath: `${environment.identityPath}/api/v1/Account`,
            changePassword:'ChangePassword'
        };
    }
  
    changePassword(data) {
        let url =`${this.getModelDefinition().identityServicePath}/${this.getModelDefinition().changePassword}`;
        return this.postRequest(url, data);
    }
    
   
}
