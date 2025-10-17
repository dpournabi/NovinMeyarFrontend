import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FastRegistrationService } from 'src/app/shared/services/custom/fast-registration/fast-registration.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AddCustomerTabsComponent } from '../add-customer-tabs/add-customer-tabs.component';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
    selector: 'real-customers',
    templateUrl: 'real-customers.component.html'
})
export class RealCustomersComponent implements OnInit {
    constructor(private service: FastRegistrationService, private modal: NzModalService, 
        private viewContainerRef: ViewContainerRef, private messageService: NzMessageService) { }

    customers: Array<any> = [];
    total: number;
    pageSize: number = 10;
    pageIndex: number = 1;

    code: FormControl = new FormControl('', []);
    firstName: FormControl = new FormControl('', []);
    lastName: FormControl = new FormControl('', []);
    nationalCode: FormControl = new FormControl('', []);
    tellPhone: FormControl = new FormControl('', []);

    myForm: FormGroup = new FormGroup({
        code: this.code,
        firstName: this.firstName,
        lastName: this.lastName,
        nationalCode: this.nationalCode,
        tellPhone: this.tellPhone,
    });
    ngOnInit() {        
    }

    search(index?: number, size?: number) {
        this.pageIndex = index ?? 1;
        this.pageSize = size ?? 10;
        this.getData({
            "pageIndex": index ?? this.pageIndex,
            "pageSize": size ?? 10,
            "code": this.code.value,
            "firstName": this.firstName.value,
            "lastName": this.lastName.value,
            "nationalCode": this.nationalCode.value,
            "tellPhone": this.tellPhone.value
          });
    }
    gridChanged(e: NzTableQueryParams) {
        this.search(e.pageIndex, e.pageSize);
    }

    edit(data) {
        const modal = this.modal.create({
            nzTitle: 'ویرایش مشتری',
            nzContent: AddCustomerTabsComponent,
            nzViewContainerRef: this.viewContainerRef,
            nzOnOk: e => {
                var realForm = instance.realCustomerForm;
                if (realForm && realForm.value.birthDate) {
                    realForm.value.birthDate = 
                        this.service.toGregorianMomentDate(
                            realForm.value.birthDate.format == undefined ? 
                                realForm.value.birthDate: realForm.value.birthDate.format('YYYY-MM-DD')
                            ).doAsGregorian().format('YYYY-MM-DD');
                }
                if (realForm && realForm.value.nationalCode) {
                    realForm.value.birthDate = realForm.value.birthDate == '' ? null : realForm.value.birthDate;
                    this.service.saveReal(realForm.value).subscribe(resp => {                        
                        if (resp.succeed) {
                            this.messageService.success(resp.message);
                            this.search();
                        }
                    }, err => {
                        console.log('real error: ', err);
                        this.messageService.error(err.message);
                    });
                }                
            }
        });
        const instance = modal.getContentComponent();
        instance.selectedTab = 'real';
        if (data.birthDate) {
            data.birthDate = this.service.toPersianDate(data.birthDate);
        }
        instance.realInitialValue = data;
    }
    deactive(data) {
        if (window.confirm('آیا از حذف این مشتری مطمئن هستید؟')) {
            this.service.deactiveReal(data.id).subscribe(resp => {
                this.messageService.success(resp.message);
                this.search();
            }, err => {
                this.messageService.error(err.message);
            });
        }
    }

    getData(searchModel) {
        this.service.searchReal(searchModel).subscribe(resp => {
            if (resp.succeed) {
                this.customers = resp.responseList;
                this.total = resp.exteraInformation;
            }
        }, err => {
            console.error('real error: ', err);
        });
    }
}