import { Injectable, Inject, Optional } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiConfig } from '../../api.config';


declare var EventSource: any;

@Injectable()
export class BaseSyncService {

    token: any;
    request: any;

    constructor() {
    }

    count = (modelName: any) => {

        this.token = localStorage.getItem('token');
        this.request = new XMLHttpRequest();
        this.request.open('GET', environment.identityPath + `//${modelName}/GetCount`, false);  // `false` makes the request synchronous
        this.request.setRequestHeader('token', this.token);
        this.request.send();

        if (this.request.status === 200) {
            return parseInt(this.request.response, null);
        }

        return null;
    }

}
