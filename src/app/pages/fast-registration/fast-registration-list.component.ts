

import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { IDatePickerConfig } from 'ng2-jalali-date-picker';
import { FastRegistrationService } from 'src/app/shared/services/custom/fast-registration/fast-registration.service';
import { InstallationCompanyService } from 'src/app/shared/services/custom/installation-company/installation-company.service';

@Component({
    selector: 'fast-registration-list',
    templateUrl: 'fast-registration-list.component.html'
})

export class FastRegistrationListComponent implements OnInit {
    constructor(private service: FastRegistrationService, private modal: NzModalService,
        private viewContainerRef: ViewContainerRef, private messageService: NzMessageService,
        private installationService: InstallationCompanyService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit(): void {
        this.route.queryParams.subscribe(p => {
            if (!p.id) {
                return;
            }
            this.service.searchRegistrations({
                pageIndex: 1,
                pageSize: 1,
                id: Number(p.id)
            }).subscribe(resp => {
                this.registrations = resp.responseList;
                this.total = 1;
            });
        });
    }

    isClient(){
        var Role =  JSON.parse(localStorage.getItem('Role'));
          
          if (Role === 'Client') {
              return true;
          }
          return false;
      }

    registrations: Array<any> = [];
    total: number;
    pageSize: number = 5;
    pageIndex: number = 1;
    sellers: Array<any> = [];

    documentNumber: FormControl = new FormControl(null, []);
    buildingCertificateNo: FormControl = new FormControl(null, []);
    responsibleFullName: FormControl = new FormControl(null, []);
    fromCreateDate: FormControl = new FormControl(null, []);
    toCreateDate: FormControl = new FormControl(null, []);
    installatinCompanyId: FormControl = new FormControl(null, []);

    myForm: FormGroup = new FormGroup({
        documentNumber: this.documentNumber,
        buildingCertificateNo: this.buildingCertificateNo,
        responsibleFullName: this.responsibleFullName,
        fromCreateDate: this.fromCreateDate,
        toCreateDate: this.toCreateDate,
        installatinCompanyId: this.installatinCompanyId
    });

    datePickerConfig: IDatePickerConfig = {
        drops: 'down',
        format: 'jYYYY/jMM/jDD',
        showMultipleYearsNavigation: true
    }

    search(index?: number, size?: number) {
        debugger
        if (window.location.search.length > 0) {
            window.history.replaceState({}, document.title, window.location.pathname);
        }
        
        this.pageIndex = index ?? this.pageIndex;
        this.pageSize = size ?? 5;
        this.getData({
            "pageIndex": index ?? this.pageIndex,
            "pageSize": size ?? 5,
            "documentNumber": this.documentNumber.value,
            "buildingCertificateNo": this.buildingCertificateNo.value,
            "responsibleFullName": this.responsibleFullName.value,
            "fromCreateDate": this.fromCreateDate.value,
            "toCreateDate": this.toCreateDate.value,
            "installatinCompanyId": this.installatinCompanyId.value=='' ? null : this.installatinCompanyId.value
        });
    }
    gridChanged(e: NzTableQueryParams) {
        if (window.location.search.length == 0) {
            this.search(e.pageIndex, e.pageSize);            
        }
    }
    edit(data) {
        this.router.navigate(['/fast-reg/'], { queryParams: { id: data.id } });
    }
    deactive(data) {
        if (window.confirm('آیا از حذف رکورد مطمئن هستید؟')) {
            this.service.deactiveRegistration(data.id).subscribe(resp => {
                this.messageService.success(resp.message);
                this.search();
            }, err => {
                this.messageService.error(err.message);
            });
        }
    }

    getShamsiDate(date) {
        return this.service.toPersianDateTime(date);
    }

    getData(searchModel) {
        this.service.searchRegistrations(searchModel).subscribe(resp => {
            if (resp.succeed) {
                this.registrations = resp.responseList;
                this.total = resp.exteraInformation;
            }
        }, err => {
            console.error('get error: ', err);
        });
    }

    onSellerInput(e) {
        this.installationService.search({
            "pageIndex": 1,
            "pageSize": 5,
            "name": e.target.value
        }).subscribe(resp => {
            console.log('seller resp: ', resp);
            if (resp.succeed) {
                this.sellers = resp.responseList;
            }
        }, err => {
            console.log('seller error: ', err);
        });
    }
    isRoot(){
        var Role =  JSON.parse(localStorage.getItem('Role'));
         
        if (Role === 'Root') {
            return true;
            
        }
        return false;
    }
    isAdmin(){
        var Role =  JSON.parse(localStorage.getItem('Role'));
         
        if (Role === 'Administrator') {
            return true;            
        }
        return false;
    }
    isTechnicalManager(){
        var Role =  JSON.parse(localStorage.getItem('Role'));
        if (Role === 'Technical Manager') {
            return true;            
        }
        return false;
    }
}