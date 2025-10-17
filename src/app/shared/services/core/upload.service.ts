
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiConfig } from '../../api.config';
import { BaseService } from './base.service';
import { ErrorHandler } from './error.service';
import { JSONSearchParams } from './search.params';

@Injectable({ providedIn: 'root' })
export class UploadService extends BaseService<any> {
    public getModelDefinition() {
        return {
            name: 'api/v1/FileManagment',
            plural: 'FileManagment',
            title: 'مشتریان',
            crudActions: {
                save: 'SaveStream',
                delete: 'DeleteStream',
                download: 'downloadLargeFile',
                saveLarge: 'SaveLargeStream',
                getKey: 'GenerateDownloadKey'
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

    saveStream(data) {
        let url =
            `${environment.fileManagerPath}/${this.getModelDefinition().name}/${this.getModelDefinition().crudActions.save}`;

        return this.postRequest(url, data);
    }

    downloadFile(key) {
        let url =
            `${environment.fileManagerPath}/${this.getModelDefinition().name}/${this.getModelDefinition().crudActions.download}/${key}`;
        
        let link = document.createElement('a');
        link.href = url;
        link.target = '_blank';

        link.click();

        window.setTimeout(() => {
            link.remove();
        }, 1000);
    }

    saveLarge(data) {
        let url =
            `${environment.fileManagerPath}/${this.getModelDefinition().name}/${this.getModelDefinition().crudActions.saveLarge}`;

        return this.postFile(url, data);
    }

    getFileKey(id) {
        let url =
            `${environment.fileManagerPath}/${this.getModelDefinition().name}/${this.getModelDefinition().crudActions.getKey}/${id}`;

        return this.getRequest(url);
    }

    deleteFile(id) {
        let url =
            `${environment.fileManagerPath}/${this.getModelDefinition().name}/${this.getModelDefinition().crudActions.delete}?streamId=${id}`;

        return this.postRequest(url, null);
    }
}