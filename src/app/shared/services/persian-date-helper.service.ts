import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'jalali-moment';

@Injectable({ providedIn: 'root' })
export class PersianDateHelperService {

  protected path!: string;
  moment = moment;

  constructor(
    protected Http: HttpClient
  ) { }

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

  public momentToDate(date?: any) {
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
}
