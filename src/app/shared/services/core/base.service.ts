import { Injectable, Inject, Optional } from '@angular/core';
import { JSONSearchParams } from './search.params';
import { ErrorHandler } from './error.service';
import { ApiConfig } from '../../api.config';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpHeaders, HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import * as moment from 'jalali-moment';
import { environment } from 'src/environments/environment';

@Injectable()
export abstract class BaseService<T> {

  protected path!: string;
  moment = moment;

  constructor(
    protected Http: HttpClient,
    @Inject(JSONSearchParams) protected searchParams: JSONSearchParams,
    @Optional() @Inject(ErrorHandler) protected errorHandler: ErrorHandler
  ) { }

  /**
   * @method request
   * @param {string}  method      Request method (GET, POST, PUT)
   * @param {string}  url         Request url (my-host/my-url/:id)
   * @param {any}     postBody    Request postBody
   * @return {Observable<any>}
   * @description
   * This is a core method, every HTTP Call will be done from here, every API Service will
   * extend this class and use this method to get RESTful communication.
   */

  request(method: string, url: string, postBody: any = {}, contentType?: string, _body?: any): Observable<any> {

    const body = _body ? _body : JSON.stringify(postBody);

    const reqHeader = new HttpHeaders({
      'Content-Type': contentType ? contentType : 'application/json',
      Authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : ''
    });

    return this.Http.post(url, body, { headers: reqHeader })
      .pipe(catchError((e) => this.errorHandler.handleError(e)));
  }

  protected postRequest(url: string, body: any, contentType?: string, params?: HttpParams, respType?: string): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : '',
        'Access-Control-Allow-Origin': '*'
      }),
      params: params ? params : new HttpParams()
    };

    if (contentType) {
      httpOptions.headers.append('Content-Type', contentType)
    }
    if (respType) {
      httpOptions['responseType'] = respType;
    }

    return this.Http.post(url, body, httpOptions)
      .pipe(catchError((e) => {return this.errorHandler.handleError(e)}));
  }

  protected postFile(url: string, body: FormData) {
    const request = new HttpRequest(
      'POST',
      url,
      body,
      {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : '',
        'Access-Control-Allow-Origin': '*'
        }),
        reportProgress: true,        
      }
    );

    return this.Http.request(request)
      .pipe(catchError(e=>{return this.errorHandler.handleError(e)}));
  }

  // public postRequest(url: string, params: {}): Observable<any> {

  //   let _params = new HttpParams();
  //   for (const key in params) {
  //     if (Object.prototype.hasOwnProperty.call(params, key)) {
  //       const element = params[key];
  //       _params = _params.append(key, element);
  //     }
  //   };

  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'No-Auth': 'True',
  //       Authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : ''
  //     }),
  //     params: _params
  //   };

  //   return this.Http.post<any>(url, params, httpOptions).pipe(catchError((e) => this.errorHandler.handleError(e)));
  // }

  protected getRequest(url: string, params?: HttpParams, contentType?: string, respType?: string): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : '',
        'Access-Control-Allow-Origin': '*'
      }),
      params: params ? params : new HttpParams()
    };
    if (contentType) {
      httpOptions.headers.append('Content-Type', contentType)
    }
    

    if (respType) {
      httpOptions['responseType'] = respType;
    }

    return this.Http.get<any>(url, httpOptions)
      .pipe(catchError((e) => this.errorHandler.handleError(e)));

  }

  protected delete(id?: number | string, _url?: string): Observable<any> {
    let url = '';

    if (!_url) {
      url = [
        environment.identityPath,
        this.getModelDefinition().name,
        this.getModelDefinition().crudActions.delete
      ].join('/') + `?id=${id}`;
    }
    else {
      url = _url;
    }

    const reqHeader = new HttpHeaders({
      Authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : ''
    });

    return this.Http.delete(url, { headers: reqHeader }).pipe(catchError((e) => this.errorHandler.handleError(e)));
  }

  protected putRequest(action: string, body?: any, params?: HttpParams, baseUrl?: string): Observable<any> {
    const url =
      baseUrl ?
        baseUrl :
        [
          environment.identityPath,
          this.getModelDefinition().name,
          this.getModelDefinition().crudActions[action]
        ].join('/');

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : '',
        'Access-Control-Allow-Origin': '*'
      }),
      params
    };

    return this.Http.post<any>(url, body, httpOptions).pipe(catchError((e) => this.errorHandler.handleError(e)));
  }

  private deleteRequest(url: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : '',
        'Access-Control-Allow-Origin': '*'
      })
    };
    return this.Http.get<any>(url, httpOptions).pipe(catchError((e) => this.errorHandler.handleError(e)));
    // return this.Http.delete<any>(url, httpOptions).pipe(catchError((e) => this.errorHandler.handleError(e)));
  }

  public find(action: string, data?: any): Observable<any> {

    const reqHeader = new HttpHeaders({
      Authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : ''
    });

    let _params = new HttpParams();
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const element = data[key];
        _params = _params.append(key, element);
      }
    };

    const url = [
      environment.identityPath,
      this.getModelDefinition().name,
      this.getModelDefinition().crudActions[action]
    ].join('/');

    return this.Http.get(url, { headers: reqHeader, params: _params })
      .pipe(catchError((e) => this.errorHandler.handleError(e)));
  }

  public create(data: {}): Observable<any> {

    const url = [
      environment.identityPath,
      this.getModelDefinition().name,
      this.getModelDefinition().crudActions.add
    ].join('/');

    return this.postRequest(url, data).pipe(map((redata: T) => this.factory(redata)));
  }
  
  // UI

  public insertPriceCommo(price: string | number) {
    if (price && price !== '' && price != null) {
      price = price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }
    return price;
  }

  public removePriceCommo(price: string | number) {
    if (price && price !== '' && price != null) {
      price = price.toString().replace(/,/g, '');
    }
    return price;
  }

  public toPersianDate(date?: Date | string) {
    if (date && date != null) {
      let _date = new Date(date).toLocaleDateString('fa-IR', { day: '2-digit', month: '2-digit', year: 'numeric' });
      _date = this.toEnglishDigits(_date);
      return _date;
    }
    return null;
  }

  public toPersianDateTime(date: Date | string) {
    if (date && date != null) {
      return new Date(date).toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }) + '  --  ' + new Date(date).toLocaleDateString('fa-IR');
    }
    return null;
  }

  public toGregorianMomentDate(date?: any) {
    if (date && date != null && date !== '') {
      date = this.toEnglishDigits(date);
      date = this.moment.from(date, 'fa', 'YYYY/MM/DD');
      return date;
    }
    return null;
  }

  public toMomentDate(date?: any) {
    if (date && date != null && date !== '') {
      const _date = this.moment(date, 'YYYY,MM,DD');
      return _date;
    }
    return null;
  }

  public momentTonDate(date?: any) {
    if (date && date != null && date !== '') {
      date = this.moment.from(date, 'fa', 'YYYY/MM/DD').toDate();
      return new Date(date);
    }
    return null;
  }

  public toISOString(date: any) {
    if (date && date != null && date !== '') {

      let _date = typeof (date) !== "string" ? date : this.moment.from(date, 'fa', 'YYYY/MM/DD');

      _date = new Date(_date.toDate().getFullYear(), _date.toDate().getMonth(), _date.toDate().getDate(), 12, 12, 12).toISOString();

      return _date;
    }

    return null;
  }

  public mobileCheck(): boolean {
    let result: boolean;
    ((a) => {
      if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) {
        result = true;
      } else {
        result = false;
      }
    })(navigator.userAgent || navigator.vendor);
    return result;
  }

  public toEnglishDigits(date: string) {
    const numDic = {
      '۰': '0',
      '۱': '1',
      '۲': '2',
      '۳': '3',
      '۴': '4',
      '۵': '5',
      '۶': '6',
      '۷': '7',
      '۸': '8',
      '۹': '9',
    };
    return date.replace(/[۰-۹]/g, (w) => {
      return numDic[w];
    });
  }

  public abstract getModelDefinition(): any;
  public abstract factory(data: any): any;
}
