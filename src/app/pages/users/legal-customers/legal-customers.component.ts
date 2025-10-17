import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FastRegistrationService } from 'src/app/shared/services/custom/fast-registration/fast-registration.service';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AddCustomerTabsComponent } from '../add-customer-tabs/add-customer-tabs.component';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
    selector: 'legal-customers',
    templateUrl: 'legal-customers.component.html'
})
export class LagalCustomersComponent implements OnInit {
    constructor(private service: FastRegistrationService, private modal: NzModalService, 
        private viewContainerRef: ViewContainerRef, private messageService: NzMessageService) { }

    customers: Array<any> = [];
    total: number;
    pageSize: number = 10;
    pageIndex: number = 1;

    code: FormControl = new FormControl('', []);
    name: FormControl = new FormControl('', []);
    economicCode: FormControl = new FormControl('', []);
    registerNo: FormControl = new FormControl('', []);
    nationalCode: FormControl = new FormControl('', []);
    ceoFirstName: FormControl = new FormControl('', []);
    ceoLastName: FormControl = new FormControl('', []);

    myForm: FormGroup = new FormGroup({
        code: this.code,
        name: this.name,
        economicCode: this.economicCode,
        registerNo: this.registerNo,
        nationalCode: this.nationalCode,
        ceoFirstName: this.ceoFirstName,
        ceoLastName: this.ceoLastName
    });
    ngOnInit() {
    }

    search(index?: number, size?: number) {
        this.pageIndex = index ?? this.pageIndex;
        this.pageSize = size ?? 10;
        this.getData({
            "pageIndex": index ??  this.pageIndex,
            "pageSize": size ?? 10,
            "code": this.code.value,
            "name": this.name.value,
            "economicCode": this.economicCode.value,
            "registerNo": this.registerNo.value,
            "nationalCode": this.nationalCode.value,
            "ceoFirstName": this.ceoFirstName.value,
            "ceoLastName": this.ceoLastName.value
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
                var legalForm = instance.legalCustomerForm;
                if (legalForm && legalForm.value.ceoBirthday) {
                    legalForm.value.ceoBirthday = 
                        this.service.toGregorianMomentDate(
                            legalForm.value.ceoBirthday.format == undefined ? 
                                legalForm.value.ceoBirthday: legalForm.value.ceoBirthday.format('YYYY-MM-DD')
                            ).doAsGregorian().format('YYYY-MM-DD');
                }
                if (legalForm && legalForm.value.economicCode) {
                    legalForm.value.ceoBirthday = legalForm.value.ceoBirthday == '' ? null : legalForm.value.ceoBirthday;
                    this.service.saveLegal(legalForm.value).subscribe(resp => {                        
                        if (resp.succeed) {
                            this.messageService.success(resp.message);
                            this.search();
                        }
                    }, err => {
                        console.log('legal error: ', err);
                        this.messageService.error(err.message);
                    });
                }                
            }
        });
        const instance = modal.getContentComponent();
        instance.selectedTab = 'legal';
        if (data.ceoBirthday) {
            data.ceoBirthday = this.service.toPersianDate(data.ceoBirthday);
        }
        instance.legalInitialValue = data;
    }
    deactive(data) {
        if (window.confirm('آیا از حذف این مشتری مطمئن هستید؟')) {
            this.service.deactiveLegal(data.id).subscribe(resp => {
                this.messageService.success(resp.message);
                this.search();
            }, err => {
                this.messageService.error(err.message);
            });
        }
    }

    getData(searchModel) {
        this.service.searchLegal(searchModel).subscribe(resp => {
            if (resp.succeed) {
                this.customers = resp.responseList;
                this.total = resp.exteraInformation;
            }
        }, err => {
            console.error('legal error: ', err);
        });
    }
}