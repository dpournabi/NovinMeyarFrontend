import { Injectable } from '@angular/core';
import { Subscriber, BehaviorSubject, Observable } from 'rxjs';


@Injectable()
export class AppService {

    public appTitle: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    breadcrumb$: Observable<any>;


    constructor() {

    }

    setTitle(value: string) {
        this.appTitle.next(value);
    }

    setBreadcrumb(items: any) {
        this.breadcrumb$ = new Observable<string>((observer: Subscriber<any>) => {
            observer.next(items);
        });
    }

    getBreadcrumb(breadcrumb: any): any[] {

        if (breadcrumb && breadcrumb.length) {
            return breadcrumb;
        }
        return [];
    }


}
