import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { UserService } from 'src/app/shared/services/custom';
import { NzMessageService } from 'ng-zorro-antd/message'; 
import { NzModalService } from 'ng-zorro-antd/modal';
import { UserModalComponent } from './user-modal/user-modal.component';
import { GlobalService } from 'src/app/shared/services/custom';
import { PersianDateHelperService } from 'src/app/shared/services/persian-date-helper.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html'
})

export class UserManagementComponent implements OnInit {

  constructor(
    private service: UserService,
    private router: Router,
    private messageService:NzMessageService,
    private modal:NzModalService,
    private viewContainerRef:ViewContainerRef,
    private globalService:GlobalService,
    private persianDateHelperService:PersianDateHelperService
  ) {}

  ngOnInit(): void {
  }

  users: Array<any> = [];
  total: number;
  userName: FormControl = new FormControl(null, []);
  myForm: FormGroup = new FormGroup({
    userName: this.userName
  });

  onSearchChangeEvent(event: any)
  {
    this.getData(event.target.value);
  }
  search(index?: number, size?: number) {
    this.getData(this.userName.value);
  }
  gridChanged(e: NzTableQueryParams) {
    this.search(e.pageIndex, e.pageSize);
  }

  edit(data) {
    const modal = this.modal.create({
      nzTitle: 'ویرایش اطلاعات کاربر',
      nzContent: UserModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzMaskClosable: false,
      nzComponentParams: {
        InputData: data
      },
      nzOnOk: () => {
          debugger;
          if (instance.userModalForm.invalid) {
              this.messageService.warning("مقادیر روی فرم صحیح نمی باشند");
              return false;
          }
          var user = instance.userModalForm.value;
          user.birthDate = this.persianDateHelperService.toGregorianMomentDate(user.birthDate);
          this.service.updateUser(user).subscribe((res)=>{
          if(res.succeed)
          {
              this.messageService.success(res.message);
              this.getData(null);
              modal.destroy({});
              return;
          }
          this.messageService.error(res.message);

          },(err)=>{
            var errorMessage = this.globalService.ExtractError(err);
            this.messageService.error(errorMessage);
          });
          return false;
      }
  });
  const instance = modal.getContentComponent();
  }
  resetPassword(data) {
    this.service.resetPassword(data.userName).subscribe((res)=>{
      if(res.succeed)
      {
        this.messageService.success(res.message);
      }
    }, 
      (err)=>{this.messageService.error(err)}
      );
  }
  unlockUser(data) {
    this.service.unlockUser(data.userName).subscribe((res)=>{
      if(res.succeed)
      {
        this.messageService.success(res.message);
      }
    }, 
      (err)=>{this.messageService.error(err)}
      );
  }
  getData(phrase) {
    this.service
      .getUsers(phrase)
      .subscribe(
        (resp) => {
          if (resp.succeed) {
            this.users = resp.responseList;
            this.total = resp.exteraInformation;
          }
        },
        (err) => {
          console.error('get error: ', err);
        }
      );
  }
}

