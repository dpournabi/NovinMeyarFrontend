import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Inject, Optional, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class RoutingService {

  public onRouteChange$: Subject<any> = new Subject<any>();

  constructor(private _Router: Router) {

  }

  refreshRoutePanelMenu() {
    // let cityProvinceParams = {};
    // if (item !== null) {

    // 	cityProvinceParams = { province_Id: item.province_Id, city_Id: item.city_Id }
    // } else {
    // 	cityProvinceParams = { province_Id: undefined, city_Id: undefined }
    // }
    this.onRouteChange$.next();
  }

  getRouteParams = (activeRoute: { snapshot: { params: any; }; }, callback: (arg0: any) => void) => {

    callback(activeRoute.snapshot.params);
  }

  refreshRoute = (params: URLSearchParams, mergeMode: string) => {

    if (mergeMode === 'merge') {

      this._Router.navigate([], {

        queryParams: this.getJson(params),

        queryParamsHandling: 'merge'
      });

    } else if (mergeMode === 'noMerge') {

      this._Router.navigate([], {

        queryParams: this.getJson(params)
      });

    } else {

      this._Router.navigate([], {

        queryParams: null
      });

    }
  }


  getQueryParams = (callback: (arg0: {}) => void) => {

    const scop = this;

    if (new URLSearchParams(location.search).toString() !== '') {

      callback(scop.getJson(new URLSearchParams(decodeURIComponent(location.search))));

    } else {
      callback({});
    }
  }

  getJson = (params: URLSearchParams) => {

    return JSON.parse('{"' + decodeURI(params.toString().
      substring(params.toString().
        indexOf('?') + 1)).
      replace(/&/g, '","').
      replace(/=/g, '":"') + '"}');
  }

}
