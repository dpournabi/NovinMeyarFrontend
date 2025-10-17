import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IDatePickerConfig } from 'ng2-jalali-date-picker';
import { UserService } from 'src/app/shared/services/custom';
import { NzMessageService } from 'ng-zorro-antd/message';
import { PersianDateHelperService } from 'src/app/shared/services/persian-date-helper.service';
@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html'
})
export class UserModalComponent implements OnInit  {

  roles:Array<any>;
  datePickerConfig: IDatePickerConfig = {
    drops: 'down',
    format: 'jYYYY/jMM/jDD',
    showMultipleYearsNavigation: true,
  }
  @Input() InputData: any;
  userModalForm = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    roleId: new FormControl(null, [Validators.required]),
    userName: new FormControl(null,[Validators.required]),
    firstName: new FormControl(null,[Validators.required]),
    lastName: new FormControl(null,[Validators.required]),
    birthDate: new FormControl('', [])
});
  constructor(private service:UserService,
              private messageService:NzMessageService,
              private dateHelperService:PersianDateHelperService
  ) { }

  ngOnInit(): void {
    console.log(this.InputData);
    this.userModalForm.patchValue(this.InputData);
    debugger
    this.userModalForm.controls.birthDate.setValue(this.dateHelperService.toPersianDate(this.InputData.birthDate));
    this.service.getRoles().subscribe((res)=>{
      debugger
        if(res.succeed)
        {
          this.roles = res.responseList;
        }
    }, (err)=>{
      debugger
        console.log(err);
        this.messageService.error(err.message)
    });
  }
}
