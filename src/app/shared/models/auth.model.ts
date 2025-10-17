// import { IModelDefinition } from '@app/shared/models/base.model';

import { FormControl, Validators } from "@angular/forms";

declare var Object: any;

export interface IAuthModel {
  userName?: string;
  password?: string;
  reMemberMe?: string;
}

export class AuthModel implements IAuthModel {

  userName?: string;
  password?: string;
  reMemberMe?: string;

  constructor(data?: IAuthModel) {
    Object.assign(this, data);
  }
}

export interface IRegisterModel {

  firstName: string;
  lastName: string;
  username: string;
  mobile: string;
  address: string;
  nationalCode: string;
  gender: boolean;
  birthday: string;

}

export class RegisterModel implements IRegisterModel {

  firstName: string;
  lastName: string;
  nationalCode: string;
  mobile: string;
  username: string;
  address: string;
  gender: boolean;
  birthday: string;

  constructor(data?: IAuthModel) {
    Object.assign(this, data);
  }
}

export interface IForgetPassModel {
  mobile: number;
}

export interface IUserCodeModel {
  userCode: number;
}

export const loginFG = {
  username: new FormControl('', [
    Validators.required
  ]),
  password: new FormControl('', [
    Validators.required
  ])
}

export const registerFG = {
  firstName: new FormControl('', [
    Validators.required
  ]),
  lastName: new FormControl('', [
    Validators.required
  ]),
  mobile: new FormControl('', [
    Validators.required
  ]),
  nationalCode: new FormControl('', [
    Validators.required
  ]),
  username: new FormControl('', [
    Validators.required
  ]),
  address: new FormControl('', [
    // Validators.required
  ]),
  gender: new FormControl(true, [
    // Validators.required
  ]),
  birthday: new FormControl('', [
    // Validators.required
  ])
}

export const forgetPassFG = {
  nationalCode: new FormControl('', [
    Validators.required
  ])
}

export const checkUserCodeFG = {
  userCode: new FormControl('', [
    Validators.required, Validators.pattern('^[0-9]+$')
  ])
}

export interface IRegisterResponse {
  link: string;
  message: string;
  status: string;
}