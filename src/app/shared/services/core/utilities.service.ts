
import { Injectable } from '@angular/core';

@Injectable()
export class UtilitiesService {
    constructor() { }

    getGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    getFileExtension(fileName: string) {
        let parts = fileName.split('.');

        return parts[parts.length - 1];
    }

    downloadDataUrl(dataUrl: string, name: string = 'download') {
        let anchor = document.createElement('a');
        anchor.href = dataUrl;
        anchor.download = name;
        anchor.click();
    }

    extractBlobFromUrl(dataUrl: string, type: string = '') {
        const byteCharacters = atob(dataUrl);
        const byteArrays = [];
        const sliceSize = 512;

        for (let index = 0; index < byteCharacters.length; index += sliceSize) {
            const slice = byteCharacters.slice(index, index + sliceSize);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, { type: type });
        return blob;
    }
}