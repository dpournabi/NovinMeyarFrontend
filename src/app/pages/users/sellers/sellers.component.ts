
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { UploadService } from 'src/app/shared/services/core/upload.service';
import { InstallationCompanyService } from 'src/app/shared/services/custom/installation-company/installation-company.service';
import { AddSellerComponent } from '../add-seller/add-seller.component';
import { GlobalService } from 'src/app/shared/services/custom/global.service';

@Component({
    selector: 'sellers',
    templateUrl: 'sellers.component.html'
})

export class SellersComponent implements OnInit {
    constructor(private service: InstallationCompanyService, private modal: NzModalService,
        private viewContainerRef: ViewContainerRef, private messageService: NzMessageService, 
        private uploadService: UploadService,
        private globalService : GlobalService) { }

    sellers: Array<any> = [];
    total: number;
    pageSize: number = 10;
    pageIndex: number = 1;

    ngOnInit() { 
        
    }

    name: FormControl = new FormControl('', []);
    economicCode: FormControl = new FormControl('', []);
    registrationNo: FormControl = new FormControl('', []);
    nationalNo: FormControl = new FormControl('', []);

    myForm: FormGroup = new FormGroup({
        name: this.name,
        economicCode: this.economicCode,
        registrationNo: this.registrationNo,
        nationalNo: this.nationalNo
    });

    search(index?: number, size?: number) {
        this.pageIndex = index ?? 1;
        this.pageSize = size ?? 5;
        this.getData({
            "pageIndex": index ?? this.pageIndex,
            "pageSize": size ?? 5,
            name: this.name.value,
            economicCode: this.economicCode.value,
            registrationNo: this.registrationNo.value,
            nationalNo: this.nationalNo.value
        });
    }
    gridChanged(e: NzTableQueryParams) {
        this.search(e.pageIndex, e.pageSize);
    }

    edit(data) {
        const modal = this.modal.create({
            nzTitle: 'ویرایش فروشنده',
            nzContent: AddSellerComponent,
            nzViewContainerRef: this.viewContainerRef,
            nzOnOk: () => {

                if (!instance.addSellerForm.valid) {
                    this.messageService.warning("مقادیر روی فرم صحیح نمی باشند");
                    throw 'مقادیر روی فرم صحیح نمی باشند';
                }
                let sellerForm = instance.addSellerForm.value;

                if(instance.addSellerForm.controls.ctoBirthDate.value!=null)
                {
                    var gregorianBirthdateObject = this.uploadService.toGregorianMomentDate(instance.addSellerForm.controls.ctoBirthDate.value);
                    var birthDate = gregorianBirthdateObject.toJSON();
                    sellerForm.ctoBirthDate=birthDate;
                }
                
                this.service.edit(sellerForm).subscribe(resp3 => {
                    if (resp3.succeed) {
                        this.messageService.success(resp3.message);
                        this.search(0, 5);
                        return;
                    }
                    this.messageService.error(resp3.message);
                    throw resp3.message;
                }, err => {
                    var errorMessage = this.globalService.ExtractError(err);
                    this.messageService.error(errorMessage);
                });
            }
        });
        var instance = modal.getContentComponent();
        if (data.ceoBirthday) {
            data.ceoBirthday = this.service.toPersianDate(data.ceoBirthday);
        }
        instance.addSellerForm.patchValue(data);
    }
    deactive(data) {
        this.service.deactive(data.id).subscribe(resp => {
            this.messageService.success(resp.message);
            this.search();
        }, err => {
            this.messageService.error(err.message);
        });
    }

    getData(searchModel) {
        this.service.search(searchModel).subscribe(resp => {
            if (resp.succeed) {
                this.sellers = resp.responseList;
                this.total = resp.exteraInformation;
            }
        }, err => {
            console.error('real error: ', err);
        });
    }

    download(data, field) {
        
        this.uploadService.getFileKey(data[field]).subscribe(resp => {            
            this.uploadService.downloadFile(resp.exteraInformation);
        });        
    }
}