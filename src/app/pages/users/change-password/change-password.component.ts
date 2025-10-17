import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserManagmentService } from 'src/app/shared/services/core/userManagentService';
import { GlobalService } from 'src/app/shared/services/custom/global.service';
import { AppStorage } from 'src/app/shared/storage/storage.swaps';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent implements OnInit {

  changePasswordFormGroup !: FormGroup;
  loginLoading: boolean = false;

  constructor(private fb: FormBuilder,
    private nzMessageService: NzMessageService,
    private userManagmentService: UserManagmentService,
    private globalService : GlobalService,
    private storage: AppStorage) { }

  ngOnInit(): void {
    this.changePasswordFormGroup = this.fb.group({
      currentPassword: new FormControl('', [
        Validators.required
      ]),
      newPassword: new FormControl('', [
        Validators.required
      ]),
      confirmationPassword: new FormControl('', [
        Validators.required
      ])
    });
  }

  onChangePassword():any
  {
    this.loginLoading = true;
    const id = this.nzMessageService.loading('لطفا منتظر بمانید...', { nzDuration: 0 }).messageId;

    for (const i in this.changePasswordFormGroup.controls) {
      this.changePasswordFormGroup.controls[i].markAsDirty();
      this.changePasswordFormGroup.controls[i].updateValueAndValidity();
    }

    if (this.changePasswordFormGroup.invalid) {
      this.nzMessageService.remove(id);
      this.loginLoading = false;

      return;
    }

    this.userManagmentService.changePassword(this.changePasswordFormGroup.value).subscribe((res: any) => {
       if (res.succeed) {
          this.nzMessageService.success(res.message);  
          this.loginLoading = false;
          this.nzMessageService.remove(id);
          this.changePasswordFormGroup.reset();

          var timer = setInterval(() => {
            clearInterval(timer);
            this.logout();
            return;
          }, 2000);
        }
        else
          this.nzMessageService.error(res.message);
    }, err=>{
      var errorMessage = this.globalService.ExtractError(err);
      this.nzMessageService.error(errorMessage);
    });
    this.loginLoading = false;
    this.nzMessageService.remove(id);
  }

  logout() {
    this.storage.remove('token');
    this.storage.remove('Role');
    this.storage.remove('userInfo');
    this.storage.remove('C_');
    window.location.replace('/login');
}
}
