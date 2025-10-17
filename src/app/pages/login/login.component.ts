import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from 'src/app/shared/services/core/auth.service';
import { Ng2PermissionService } from 'src/app/shared/Ng2Permission/permission.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IDatePickerConfig } from 'ng2-jalali-date-picker';
import { environment } from 'src/environments/environment';
import { GET_INSTALLATION_USER_RESOLVER } from 'src/app/shared/Resolvers/resolvers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class LoginComponent implements OnInit {

  _login = true;
  _Code = false;
  _Register = false;
  pass_ = false;
  icon_ = 'eye-invisible';
  type_ = 'password';


  entity = {
    confirm_password: ''
  }

  // FormGroup
  loginFormGroup !: FormGroup;

  // SIGN UP FORM GROUP
  signUpFormGroup !: FormGroup;

  // VERIFY FORM GROUP

  verify_form !: FormGroup;

  forgetPassFormGroup !: FormGroup;
  checkUserCodeFormGroup !: FormGroup;

  loginLoading: boolean = false;
  registerLoading: boolean = false;
  forgetPassLoading: boolean = false;
  checkUserCodeLoading: boolean = false;
  verify: boolean = false;

  selectedIndex = 0;

  deadline: number = null;

  datePickerConfig: IDatePickerConfig = {
    format: 'YYYY/MM/DD'
  }

  constructor(
    private router: Router,
    private nzMessageService: NzMessageService,
    private _Ng2PermissionService: Ng2PermissionService,
    private _AuthService: AuthService,
    private fb: FormBuilder,
    private resolver: GET_INSTALLATION_USER_RESOLVER
  ) {
  }

  ngOnInit(): void {

    ///LOGIN FORM
    this.loginFormGroup = this.fb.group({
      username: new FormControl('', [
        Validators.required,
        Validators.maxLength(10)
      ]),
      password: new FormControl('', [
        Validators.required
      ]),
      clientId: new FormControl('', [])
    });

    ///SIGN OUT FORM
    this.signUpFormGroup = this.fb.group({
      username: new FormControl('', [
        Validators.required,
        Validators.maxLength(10)
      ]),
      companyName: new FormControl('', [
        Validators.required
      ]),
      nationalCode: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required
      ]),
      registerNo: new FormControl('', [
        Validators.required
      ]),
      confirmationPassword: new FormControl('', [
        Validators.required
      ]),
    });
    ///VERIFY CODE FORM GROUP

    this.verify_form = this.fb.group({
      plainCode: new FormControl('', [
        Validators.required
      ]),
    });
  }

  login() {

    this.loginLoading = true;
    const id = this.nzMessageService.loading('لطفا منتظر بمانید...', { nzDuration: 0 }).messageId;

    for (const i in this.loginFormGroup.controls) {
      this.loginFormGroup.controls[i].markAsDirty();
      this.loginFormGroup.controls[i].updateValueAndValidity();
    }

    if (this.loginFormGroup.invalid) {
      this.nzMessageService.remove(id);
      this.loginLoading = false;

      return;
    }
    this.loginFormGroup.value.clientId = environment.clientIdB;
    this._AuthService.login(this.loginFormGroup.value).subscribe((res: any) => {
      if (res.succeed) {
        localStorage.setItem('token', res.accessToken);
        if (res.confirmByAdmin) {
          localStorage.setItem('C_', JSON.stringify(res.confirmByAdmin));
        }
        let firstname = '', lastname = '', 
            companyName = '', currentRole = '',
            branchName = '',
            installationCompanyId=0;

        res.claims.forEach(element => {
          switch(element.type)
          {
            case 'RoleName':
              {
                currentRole = element.value;
                localStorage.setItem('Role', JSON.stringify(element.value));
                break;
              }
              
            case 'BranchName':
              {
                branchName = element.value;
                break;
              }
            case 'InstallationCompanyId':
              {
                installationCompanyId = element.value;
                break;
              }
            case 'InstallationCompanyName':
              {
                companyName = element.value;
                break;
              }
            case 'FirstName':
              {
                firstname = element.value;
                break;
              }
            case 'LastName':
              {
                lastname = element.value;
                break;
              }
          }
        });
        
        if(currentRole=='Client')
        {
          firstname = null;
          lastname = null;
        }
        localStorage.setItem('userInfo', JSON.stringify({
          firstname,
          lastname,
          companyName,
          installationCompanyId,
          branchName
        }));

        if (res.claims[0].value == 'root') {
          this._Ng2PermissionService.define(['root'])
        }
        else {
          this._Ng2PermissionService.define(['user'])
        }

        this.getMyUserRoleName(id);
        var c = localStorage.getItem('C_');
        if (localStorage.getItem('Role').toString().replace('"','').replace('"','') == 'Client' && (c==null || c=='')) {
           this.router.navigate(['/users/profile']);
        }
      }
      else {
        this.nzMessageService.remove(id);
        this.loginLoading = false;
        this.nzMessageService.error(res.message);
      }
      

    }, error => {
      this.nzMessageService.remove(id);
      this.nzMessageService.error(`هنگام دریافت اطلاعات خطایی رخ داده است، لطفا مجددا تلاش کنید.`);
      this.loginLoading = false;
    });
  }

  getMyUserRoleName(loadingId: string) {
    this.nzMessageService.remove(loadingId);
    this.router.navigate(['/dashboard']);
  }

  forgetPass() {
    this.forgetPassLoading = true;
    const id = this.nzMessageService.loading('لطفا منتظر بمانید...', { nzDuration: 0 }).messageId;

    for (const i in this.forgetPassFormGroup.controls) {
      this.forgetPassFormGroup.controls[i].markAsDirty();
      this.forgetPassFormGroup.controls[i].updateValueAndValidity();
    }

    if (this.forgetPassFormGroup.invalid) {
      this.nzMessageService.remove(id);
      this.forgetPassLoading = false;

      return;
    }

    this._AuthService.forgetPass(this.forgetPassFormGroup.value).subscribe(
      (res: any) => {

        switch (res.status) {

          case "Success":
            this.forgetPassFormGroup.reset();
            this.deadline = Date.now() + 1000 * 2 * 60;
            this.verify = true;
            break;

          default:
            this.nzMessageService.error(res.message);
            break;
        }

        this.nzMessageService.remove(id);
        this.forgetPassLoading = false;

      }, error => {
        this.nzMessageService.remove(id);
        this.nzMessageService.error(`هنگام دریافت اطلاعات خطایی رخ داده است، لطفا مجددا تلاش کنید.`);
        this.forgetPassLoading = false;
      }
    );
  }

  checkUserCode() {
    this.checkUserCodeLoading = true;
    const id = this.nzMessageService.loading('لطفا منتظر بمانید...', { nzDuration: 0 }).messageId;

    for (const i in this.checkUserCodeFormGroup.controls) {
      this.checkUserCodeFormGroup.controls[i].markAsDirty();
      this.checkUserCodeFormGroup.controls[i].updateValueAndValidity();
    }

    if (this.checkUserCodeFormGroup.invalid) {
      this.nzMessageService.remove(id);
      this.checkUserCodeLoading = false;

      return;
    }

    this._AuthService.checkUserCode(this.checkUserCodeFormGroup.value).subscribe(
      (res: any) => {

        switch (res.status) {

          case "Success":
            this.checkUserCodeFormGroup.reset();
            this.verify = false;
            this.selectedIndex = 0;
            break;

          default:
            this.nzMessageService.error(res.message);
            break;
        }

        this.nzMessageService.remove(id);
        this.checkUserCodeLoading = false;

      }, error => {
        this.nzMessageService.remove(id);
        this.nzMessageService.error(`هنگام دریافت اطلاعات خطایی رخ داده است، لطفا مجددا تلاش کنید.`);
        this.checkUserCodeLoading = false;
      }
    );
  }

  changeTosignIn(e) {
    if (e === 'Login') {
      this._login = true
      this._Register = false
      this._Code = false
    }
    else {
      this._login = false
      this._Register = true
      this._Code = false
    }

  }

  SignUp() {
    for (const i in this.signUpFormGroup.controls) {
      this.signUpFormGroup.controls[i].markAsDirty();
      this.signUpFormGroup.controls[i].updateValueAndValidity();
    }

    if (this.signUpFormGroup.invalid) {
      // this.nzMessageService.remove(id);
      this.loginLoading = false;
      return;
    }
    if (this.signUpFormGroup.value.password === this.signUpFormGroup.value.confirmationPassword) {
      this.loginLoading = true;
      const id = this.nzMessageService.loading('لطفا منتظر بمانید...', { nzDuration: 0 }).messageId;
      this._AuthService.SignUp(this.signUpFormGroup.value).subscribe((res: any) => {
        if (res.succeed) {

          this._Code = true
          this._login = false
          this._Register = false
          this.loginLoading = false;
          this.nzMessageService.success(res.message);
          this.nzMessageService.remove(id);
          this.getMyUserRoleName(id);
        }
        else {
          this.nzMessageService.remove(id);
          this.loginLoading = false;
          this.nzMessageService.error(res.message);
        }
      }, error => {
        this.nzMessageService.remove(id);
        this.nzMessageService.error(`هنگام دریافت اطلاعات خطایی رخ داده است، لطفا مجددا تلاش کنید.`);
        this.loginLoading = false;
      });
    }
    else {
      this.loginLoading = false;
      this.nzMessageService.error('تکرار کلمه عبور درست وارد نشده است');

      return;
    }
  }

  Verify_form() {
    this.loginLoading = true;
    const id = this.nzMessageService.loading('لطفا منتظر بمانید...', { nzDuration: 0 }).messageId;

    for (const i in this.verify_form.controls) {
      this.verify_form.controls[i].markAsDirty();
      this.verify_form.controls[i].updateValueAndValidity();
    }

    if (this.verify_form.invalid) {
      // this.nzMessageService.remove(id);
      this.loginLoading = false;

      return;
    }

    const verify_model = {
      username: this.signUpFormGroup.value.username,
      plainCode: this.verify_form.value.plainCode
    }

    this._AuthService.VERIFY_CODE(verify_model).subscribe(res => {
      if (res.succeed) {
        this._Code = false
        this._login = true
        this._Register = false
        this.loginLoading = false;
        this.nzMessageService.success(res.message);
        this.nzMessageService.remove(id);
        this.signUpFormGroup.reset();
      }
      else {
        this.nzMessageService.remove(id);
        this.loginLoading = false;
        this.nzMessageService.error(res.message);
      }


    }, error => {
      this.nzMessageService.remove(id);
      this.nzMessageService.error(`هنگام دریافت اطلاعات خطایی رخ داده است، لطفا مجددا تلاش کنید.`);
      this.loginLoading = false;

    })
  }

  showPass() {
    this.pass_ = !this.pass_
    if (!this.pass_) {
      this.icon_ = 'eye-invisible'
      this.type_ = 'password'
    }
    else {
      this.icon_ = 'eye'
      this.type_ = 'text'
    }

  }

}

