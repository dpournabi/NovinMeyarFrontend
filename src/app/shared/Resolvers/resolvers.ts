import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/core/auth.service';

@Injectable({
    providedIn: 'root'
  })

export class GET_INSTALLATION_USER_RESOLVER implements Resolve<any> {
    GET_INSTALLATION_USER = new BehaviorSubject(null)
    ROLE_NAME = new BehaviorSubject(null)
  constructor(
    private Authservice: AuthService,
    ) {}
    _Set(response){
        this.GET_INSTALLATION_USER.next(response)
    }
    _get(){
        return this.GET_INSTALLATION_USER
    }
  resolve(d:any): Observable<any> {
    return this.Authservice.getInstallatinCompany().pipe(tap(response=>{
    }));
  }
}
@Injectable({
  providedIn: 'root'
})
export class CONFIRM_ADMIN implements Resolve<any> {
  CONFIRM_ADMIN = new BehaviorSubject(null)
constructor(
  private Authservice: AuthService,
  ) {}

resolve(): Observable<any> {

  return this.Authservice.CONFIRM_ADMIN().pipe(tap(response=>{
    console.log(response);
    

  }));
}
}
