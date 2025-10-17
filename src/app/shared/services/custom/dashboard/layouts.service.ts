import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class LayoutsService {
    private isColapsed: Subject<boolean> = new BehaviorSubject<boolean>(true);

    get isColapsed$() {
        return this.isColapsed.asObservable();
    }

    isColapsedChanged(data: boolean) {
        this.isColapsed.next(data);
    }
}
