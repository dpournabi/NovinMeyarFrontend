import { HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { IDatePickerConfig } from 'ng2-jalali-date-picker';
import { UploadService } from 'src/app/shared/services/core/upload.service';
import { BaseDataService } from 'src/app/shared/services/custom/base-info/base-data.service';
import { FastRegistrationService } from 'src/app/shared/services/custom/fast-registration/fast-registration.service';
import { InstallationCompanyService } from 'src/app/shared/services/custom/installation-company/installation-company.service';
import { AddCustomerTabsComponent } from '../users/add-customer-tabs/add-customer-tabs.component';
import { AddSellerComponent } from '../users/add-seller/add-seller.component';
import { AuthService } from 'src/app/shared/services/core/auth.service';
import { GlobalService } from 'src/app/shared/services/custom/global.service';
import { WorkflowService } from 'src/app/shared/services/custom/workflow/workflow.service';
import { FastRegCommentComponent } from './fast-reg-comment/fast-reg-comment.component';

@Component({
    selector: 'fast-register',
    templateUrl: 'fast-registration.component.html'
})
export class FastRegisterComponent implements OnInit {

    buildingCertificateInputFile: File;
    isiriRequestInputFile: File;
    buildingCertificateImagePercent: number;
    isiriRequestImagePercent: number;
    comments: [] |any;
    branchId: number;
    branchName:string;
    fastRegFormGroup: FormGroup = new FormGroup({
        requestTypeId: new FormControl('', []),
        requestTitle: new FormControl('---', []),
        elevatorTypeId: new FormControl('', []),
        inspectionTypeId: new FormControl('', []),
        latestCertificateTypeId: new FormControl(null, []),
        responsibleFullName: new FormControl('', [Validators.maxLength(20)]),
        responsibleCell: new FormControl('', [Validators.maxLength(11)]),
        elevatorNationalNo: new FormControl('', []),
        isiriNo: new FormControl('', []),
        customerId: new FormControl('', []),
        installatinCompanyId: new FormControl(null, [Validators.required]),
        stopCount: new FormControl(null, [Validators.required]),
        documentNumber: new FormControl('', []),
        inspectionDate: new FormControl('', []),
        isLock: new FormControl('', [])
    });

    isClient() {
        var Role = JSON.parse(localStorage.getItem('Role'));

        if (Role === 'Client') {
            return true;

        }
        return false;

    }

    buildingInfoFormGroup: FormGroup = new FormGroup({
        provinceId: new FormControl('', []),
        cityId: new FormControl('', []),
        address: new FormControl('', [])
    });
    otherInfoFormGroup: FormGroup = new FormGroup({
        buildingCertificateNo: new FormControl('', []),
        buildingPleque: new FormControl('', []),
        buildingAreaNo: new FormControl('', []),
        buildingIssueDate: new FormControl('', []),
        scanDocumentId: new FormControl(null, []),
        projectDocumentId: new FormControl(null, []),
        certificateId: new FormControl(null, []),
        buildingCertificateImageId: new FormControl(null, []),
        isiriRequestImageId: new FormControl(null, [])
    });

    editDisabled: boolean = true;
    loading: boolean = false;
    editLoading: boolean = false;
    invalidForm: boolean = false;
    existingId: any = null;

    datePickerConfig: IDatePickerConfig = {
        format: 'jYYYY/jMM/jDD'
    }

    //inspectionDate: any;
    customerType: boolean = false; // false --> real // true --> legal

    customers: Array<any> = [];
    sellers: Array<any> = [];

    elevatorTypes: Array<any> = [];
    inspectionTypes: Array<any> = [];
    certTypes: Array<any> = [];
    provinces: Array<any> = [];
    cities: Array<any> = [];

    scanDocument: File;
    projectDocument: File;
    certificate: File;

    scanPercent: number = 0;
    projectPercent: number = 0;
    certPercent: number = 0;

    constructor(private modal: NzModalService, private viewContainerRef: ViewContainerRef,
        private service: FastRegistrationService, private messageService: NzMessageService,
        private installationService: InstallationCompanyService, private baseDataService: BaseDataService,
        private route: ActivatedRoute, private router: Router, private uploadService: UploadService,
        private _AuthService: AuthService,
        private workflowService: WorkflowService,
        private globalService: GlobalService) {

        this.baseDataService.getElevatorTypes().subscribe(resp => {
            // console.log('elevator types: ', resp);
            if (resp.succeed) {
                this.elevatorTypes = resp.responseList;
            }
            else {
                console.error(resp.message);
            }
        }, err => {
            console.error('elevator type error: ', err);
        });
        //...............................................................
        this.baseDataService.getInspectionTypes().subscribe(resp => {
            //console.log('inspection types: ', resp);
            if (resp.succeed) {
                this.inspectionTypes = resp.responseList;
            }
            else {
                console.error(resp.message);
            }
        }, err => {
            console.error('inspection type error: ', err);
        });
        //.................................................................
        this.baseDataService.getLatestCert().subscribe(resp => {
            //console.log('certificate types: ', resp);
            if (resp.succeed) {
                this.certTypes = resp.responseList;
            }
            else {
                console.error(resp.message);
            }
        }, err => {
            console.error('certificate type error: ', err);
        });
        //.................................................................
    }

    ngOnInit() {
        this.route.queryParams.subscribe(p => {
            //console.log('params: ', p);
            if (!p.id) {
                return;
            }
            debugger
            this.existingId = decodeURIComponent(p.id);
            this.service.searchRegistrations({
                pageIndex: 1,
                pageSize: 10,
                id: this.existingId
            }).subscribe(resp => {
                //console.log('single resp: ', resp);

                this.fillForm(resp.responseList[0]);

                this.service.seenRequestAsync(this.existingId).subscribe(resp => {
                    if (resp.succeed) {
                        console.log('Run seen command successfuly!')
                    }
                }, err => {
                    console.log('real error: ', err);
                });
            });
        });

        this._AuthService.getInstallatinCompany().subscribe(res => {
            if (res!! && res.responseList[0]!!) {
                this.fastRegFormGroup.controls.installatinCompanyId.setValue(res.responseList[0].id);
            }
        });
        if (this.isClient()) {
            this.otherInfoFormGroup.controls.scanDocumentId.setValue(0);
            this.otherInfoFormGroup.controls.projectDocumentId.setValue(0);
            this.otherInfoFormGroup.controls.certificateId.setValue(0);
            var userInfo = JSON.parse(localStorage.getItem('userInfo'));
            this.fastRegFormGroup.controls.installatinCompanyId.setValue(parseInt(userInfo.installationCompanyId))
        }
        this.getComments();
    }

    fillForm(data) {
        debugger
        this.fastRegFormGroup.controls['requestTypeId'].setValue(1);
        this.fastRegFormGroup.controls['inspectionTypeId'].setValue(data.inspectionTypeId);
        this.fastRegFormGroup.controls['elevatorTypeId'].setValue(data.elevatorTypeId);
        this.fastRegFormGroup.controls['latestCertificateTypeId'].setValue(data.latestCertificateTypeId);
        this.fastRegFormGroup.controls['responsibleFullName'].setValue(data.responsibleFullName);
        this.fastRegFormGroup.controls['responsibleCell'].setValue(data.responsibleCell);
        this.fastRegFormGroup.controls['elevatorNationalNo'].setValue(data.elevatorNationalNo);
        this.fastRegFormGroup.controls['isiriNo'].setValue(data.isiriNo);
        this.fastRegFormGroup.controls['stopCount'].setValue(data.stopCount);
        this.fastRegFormGroup.controls['isLock'].setValue(data.isLock);
        this.fastRegFormGroup.controls['documentNumber'].setValue(data.documentNumber);
        this.fastRegFormGroup.controls['inspectionDate'].setValue(this.service.toPersianDate(data.inspectionDate));
        this.buildingInfoFormGroup.controls['address'].setValue(data.address);
        this.otherInfoFormGroup.controls['buildingCertificateNo'].setValue(data.buildingCertificateNo);
        this.otherInfoFormGroup.controls['buildingPleque'].setValue(data.buildingPleque);
        this.otherInfoFormGroup.controls['buildingAreaNo'].setValue(data.buildingAreaNo);
        this.otherInfoFormGroup.controls['buildingIssueDate'].setValue(this.service.toPersianDate(data.buildingIssueDate));
        debugger
        this.otherInfoFormGroup.controls.scanDocumentId.setValue(data.scanDocumentId);
        this.otherInfoFormGroup.controls.projectDocumentId.setValue(data.projectDocumentId);
        this.otherInfoFormGroup.controls.certificateId.setValue(data.certificateId);
        this.otherInfoFormGroup.controls.buildingCertificateImageId.setValue(data.buildingCertificateImageId);
        this.otherInfoFormGroup.controls.isiriRequestImageId.setValue(data.isiriRequestImageId);

        this.customerType = data.customerType;

        this.installationService.search({
            pageIndex: 1,
            pageSize: 100,
            id: data.installatinCompanyId
        }).subscribe(resp => {
            if (resp.succeed) {
                this.sellers = resp.responseList;

                window.setTimeout(() => {
                    this.fastRegFormGroup.controls['installatinCompanyId'].setValue(data.installatinCompanyId);
                }, 300);
            }
        });

        this.baseDataService.getProvinces(data.provinceName).subscribe(resp => {
            if (resp.succeed) {
                debugger
                this.provinces = resp.responseList;
                this.cities = [];
            }
            this.baseDataService.getCity(data.cityName, resp.responseList[0].id).subscribe(respCity => {
                if (respCity.succeed) {
                    this.cities = respCity.responseList;
                }

                window.setTimeout(() => {
                    this.buildingInfoFormGroup.controls['cityId'].setValue(respCity.responseList[0].id);
                }, 300);
            });

            window.setTimeout(() => {
                this.buildingInfoFormGroup.controls['provinceId'].setValue(resp.responseList[0].id);
            }, 300);
        });

        if (data.customerType == true) {
            this.service.searchLegal({
                "pageIndex": 1,
                "pageSize": 10,
                "branchId": 1,
                "id": data.customerId
            }).subscribe(resp => {
                //console.log('legal resp: ', resp);
                if (resp.succeed) {
                    this.customers = resp.responseList;

                    window.setTimeout(() => {
                        this.fastRegFormGroup.controls.customerId.setValue(data.customerId);
                    }, 300);
                }
            }, err => {
                console.log('legal error: ', err);
            });
        }
        else {
            this.service.searchReal({
                "pageIndex": 1,
                "pageSize": 10,
                "id": data.customerId
            }).subscribe(resp => {
                if (resp.succeed) {
                    this.customers = resp.responseList;

                    window.setTimeout(() => {
                        this.fastRegFormGroup.controls.customerId.setValue(data.customerId);
                    }, 300);
                }
            }, err => {
                console.log('real error: ', err);
            });
        }

        var userInfo = JSON.parse(localStorage.getItem('userInfo'));
        debugger
        this.branchName = userInfo.branchName;
    }

    inspectionChanges(e) {
        if (e == 2) {
            this.fastRegFormGroup.controls['latestCertificateTypeId'].setValidators(Validators.required);
        }
        else {
            this.fastRegFormGroup.controls['latestCertificateTypeId'].clearValidators();
        }
        this.fastRegFormGroup.controls['latestCertificateTypeId'].reset();
    }

    saveEdit(display?: boolean) {
        // console.log('all data: ', {
        //     f1: this.fastRegFormGroup.value,
        //     f2: this.otherInfoFormGroup.value,
        //     f3: this.buildingInfoFormGroup.value
        // });
        //return;

        this.editLoading = true;
        this.invalidForm = false;
        if (!this.fastRegFormGroup.valid || !this.otherInfoFormGroup.valid || !this.buildingInfoFormGroup.valid) {
            this.invalidForm = true;
            this.editLoading = false;
            return;
        }
        this.provinces.forEach((row, index)=>{
            if(row.id==this.buildingInfoFormGroup.value.provinceId)
            {
                debugger
                this.branchId = row.branchId;
            }
        });
        debugger
        this.service.fastRegister({
            id: this.existingId ?? 0,
            requestTypeId: this.fastRegFormGroup.value.requestTypeId,
            requestTitle: this.fastRegFormGroup.value.requestTitle,
            elevatorTypeId: this.fastRegFormGroup.value.elevatorTypeId,
            inspectionTypeId: this.fastRegFormGroup.value.inspectionTypeId,
            latestCertificateTypeId: this.fastRegFormGroup.value.latestCertificateTypeId,
            responsibleFullName: this.fastRegFormGroup.value.responsibleFullName,
            responsibleCell: this.fastRegFormGroup.value.responsibleCell,
            elevatorNationalNo: this.fastRegFormGroup.value.elevatorNationalNo,
            buildingCertificateNo: this.otherInfoFormGroup.value.buildingCertificateNo,
            buildingPleque: this.otherInfoFormGroup.value.buildingPleque,
            buildingAreaNo: this.otherInfoFormGroup.value.buildingAreaNo,
            buildingIssueDate: this.service.toGregorianMomentDate(this.otherInfoFormGroup.value.buildingIssueDate),
            customerId: this.fastRegFormGroup.value.customerId,
            customerType: this.customerType,
            installatinCompanyId: this.fastRegFormGroup.value.installatinCompanyId,
            provinceId: this.buildingInfoFormGroup.value.provinceId,
            cityId: this.buildingInfoFormGroup.value.cityId,
            address: this.buildingInfoFormGroup.value.address,
            isiriNo: this.fastRegFormGroup.value.isiriNo,
            scanDocumentId: this.otherInfoFormGroup.value.scanDocumentId,
            projectDocumentId: this.otherInfoFormGroup.value.projectDocumentId,
            certificateId: this.otherInfoFormGroup.value.certificateId,
            buildingCertificateImageId: this.otherInfoFormGroup.value.buildingCertificateImageId,
            isiriRequestImageId: this.otherInfoFormGroup.value.isiriRequestImageId,
            stopCount: this.fastRegFormGroup.value.stopCount,
            inspectionDate: this.service.toGregorianMomentDate(this.fastRegFormGroup.value.inspectionDate),
            branchId:this.branchId,
            branchName: this.branchName

        }).subscribe(resp => {
            this.editLoading = false;
            if (!resp.succeed) {
                this.editLoading = false;
                this.messageService.error(resp.message);
                return;
            }
            this.messageService.success(resp.message);
            this.clearForm();
            if (this.existingId != null) {
                this.service.searchRegistrations({
                    pageIndex: 1,
                    pageSize: 10,
                    id: this.existingId
                }).subscribe(resp => {
                    this.fillForm(resp.responseList[0]);
                });
            }
            if (display == true) {
                this.router.navigate(['/fast-reg-list/'], { queryParams: { id: resp.exteraInformation } });
            }
        }, err => {
            this.editLoading = false;
            console.error('fast register error: ', err);
            this.messageService.error(err);
        });
    }
    addCustomer() {
        const modal = this.modal.create({
            nzTitle: 'تعریف مشتری جدید',
            nzContent: AddCustomerTabsComponent,
            nzViewContainerRef: this.viewContainerRef,
            nzOnOk: (e) => {
                var realForm = instance.realCustomerForm;
                var legalForm = instance.legalCustomerForm;

                debugger
                if ((realForm!! && realForm.invalid) || (legalForm!! && legalForm.invalid)) {
                    this.messageService.warning("مقادیر روی فرم صحیح نمی باشند");
                    return false;
                }

                if (realForm && realForm.value.birthDate) {
                    realForm.value.birthDate = this.service.toGregorianMomentDate(realForm.value.birthDate).doAsGregorian().format('YYYY-MM-DD');
                }
                if (legalForm && legalForm.value.ceoBirthday) {
                    legalForm.value.ceoBirthday = this.service.toGregorianMomentDate(legalForm.value.ceoBirthday).doAsGregorian().format('YYYY-MM-DD');
                }

                if (realForm && realForm.value.cellPhone) {
                    realForm.value.birthDate = realForm.value.birthDate == '' ? null : realForm.value.birthDate;
                    this.service.saveReal(realForm.value).subscribe(resp => {
                        // console.log('real save: ', resp);
                        if (resp.succeed) {
                            this.messageService.success(resp.message);
                            modal.destroy({});
                            return;
                        }
                        this.messageService.error(resp.message);
                    }, err => {
                        console.log('real error: ', err);
                        this.messageService.error(err.message);
                    });
                }
                if (legalForm && legalForm.value.economicCode) {
                    legalForm.value.ceoBirthday = legalForm.value.ceoBirthday == '' ? null : legalForm.value.ceoBirthday;
                    this.service.saveLegal(legalForm.value).subscribe(resp => {
                        if (resp.succeed) {
                            this.messageService.success(resp.message);
                            modal.destroy({});
                            return;
                        }
                        this.messageService.error(resp.message);
                    }, err => {
                        var errorMessage = this.globalService.ExtractError(err);
                        this.messageService.error(errorMessage);
                    });
                }

                return false;
            }
        });
        const instance = modal.getContentComponent();
        instance.selectedTab = this.customerType ? 'legal' : 'real';
    }

    addSeller() {
        const modal = this.modal.create({
            nzTitle: 'تعریف شرکت فروشنده جدید',
            nzContent: AddSellerComponent,
            nzViewContainerRef: this.viewContainerRef,
            nzMaskClosable: false,
            nzOnOk: () => {
                if (!instance.addSellerForm.valid) {
                    this.messageService.warning("مقادیر روی فرم صحیح نمی باشند");
                }
                this.installationService.registerNew(instance.addSellerForm.value).subscribe(response => {
                    if (response.succeed) {
                        this.messageService.success(response.message);
                        modal.destroy({});
                        return;
                    }
                    this.messageService.error(response.message);
                }, err => {
                    var errorMessage = this.globalService.ExtractError(err);
                    this.messageService.error(errorMessage);
                });

                return false;
            }
        });
        const instance = modal.getContentComponent();
    }

    changeCustomerType() {
        this.customerType = !this.customerType;
        this.customers = [];
    }

    onCustomerInput(e) {
        if (this.customerType) {
            //is legal
            this.service.searchLegal({
                "pageIndex": 1,
                "pageSize": 10,
                "branchId": 1,
                "name": e.target.value
            }).subscribe(resp => {
                // console.log('legal resp: ', resp);
                if (resp.succeed) {
                    this.customers = resp.responseList;
                }
            }, err => {
                console.log('legal error: ', err);
            });
        }
        else {
            this.service.searchReal({
                "pageIndex": 1,
                "pageSize": 10,
                "branchId": 1,
                "firstName": e.target.value,
                "lastName": e.target.value
            }).subscribe(resp => {
                if (resp.succeed) {
                    this.customers = resp.responseList;
                }
            }, err => {
                console.log('real error: ', err);
            });
        }
    }

    onSellerInput(e) {
        this.installationService.search({
            "pageIndex": 1,
            "pageSize": 10,
            "name": e.target.value
        }).subscribe(resp => {
            // console.log('seller resp: ', resp);
            if (resp.succeed) {
                this.sellers = resp.responseList;
            }
        }, err => {
            console.log('seller error: ', err);
        });
    }

    onProvinceInput(e) {

        debugger
        this.baseDataService.getProvinces(e.target.value).subscribe(resp => {
            // console.log('province resp: ', resp);
            if (resp.succeed) {
                this.provinces = resp.responseList;
                this.cities = [];
            }
        }, err => {
            console.log('province error: ', err);
        });
    }

    onCityInput(e) {
        this.baseDataService.getCity(e.target.value, this.buildingInfoFormGroup.value.provinceId).subscribe(resp => {
            // console.log('city resp: ', resp);
            if (resp.succeed) {
                this.cities = resp.responseList;
            }
        }, err => {
            console.log('city error: ', err);
        });
    }

    checkNumber(e) {
        let keyCode = e.which || e.keyCode;
        let allowedKeys = [8, 9, 32, 37, 38, 39, 40, 46];

        if (allowedKeys.indexOf(keyCode) > -1) {
            return true;
        }

        return (/\d+/).test(e.key);
    }

    clearForm() {
        this.fastRegFormGroup.reset();
        this.otherInfoFormGroup.reset();
        this.buildingInfoFormGroup.reset();

        this.scanPercent = 0;

        this.fastRegFormGroup.controls.requestTitle.setValue('---');
    }

    scanDocumentChange(e) {
        if (e.target.files.length == 0) {
            return;
        }
        var file = e.target.files[0];

        var fileName = file.name;
        var fileExtension = fileName.split('.').pop();
        if (fileExtension != "rar" && fileExtension != "zip") {
            this.messageService.error('مجاز به آپلود فایل با این فرمت نمی باشید!');
            return;
        }

        var formData = new FormData();
        formData.append('Photo', file);
        formData.append('Tag', file.name);

        this.uploadService.saveLarge(formData).subscribe((resp: any) => {
            if (resp.type == HttpEventType.UploadProgress) {

                this.scanPercent = (resp.loaded / resp.total) * 100;
            }
            if (resp.type == HttpEventType.Response) {
                this.otherInfoFormGroup.controls.scanDocumentId.setValue(resp.body.exteraInformation);
            }
        }, err => {
            console.error('error', err);
            this.messageService.error('امکان آپلود این فایل وجود ندارد. حداکثر حجم مجاز 20 مگابایت است!');
            this.scanPercent = 0;
        });
    }

    projectDocumentChange(e) {
        if (e.target.files.length == 0) {
            return;
        }
        var file = e.target.files[0];

        var fileName = file.name;
        var fileExtension = fileName.split('.').pop();
        if (fileExtension != "rar" && fileExtension != "zip") {
            this.messageService.error('مجاز به آپلود فایل با این فرمت نمی باشید!');
            return;
        }

        var formData = new FormData();
        formData.append('Photo', file);
        formData.append('Tag', file.name);

        this.uploadService.saveLarge(formData).subscribe((resp: any) => {
            if (resp.type == HttpEventType.UploadProgress) {
                //console.log('progress: ', resp);

                this.projectPercent = (resp.loaded / resp.total) * 100;
            }
            if (resp.type == HttpEventType.Response) {
                //console.log('response: ', resp);

                this.otherInfoFormGroup.controls.projectDocumentId.setValue(resp.body.exteraInformation);
            }
        }, err => {
            console.error('error', err);
            this.messageService.error('امکان آپلود این فایل وجود ندارد. حداکثر حجم مجاز 20 مگابایت است!');
            this.projectPercent = 0;
            //console.error('upload error: ', err);
        });
    }

    certificateChange(e) {
        if (e.target.files.length == 0) {
            return;
        }
        var file = e.target.files[0];

        var fileName = file.name;
        var fileExtension = fileName.split('.').pop();
        if (fileExtension != "rar" && fileExtension != "zip") {
            this.messageService.error('مجاز به آپلود فایل با این فرمت نمی باشید!');
            return;
        }

        var formData = new FormData();
        formData.append('Photo', file);
        formData.append('Tag', file.name);

        this.uploadService.saveLarge(formData).subscribe((resp: any) => {
            if (resp.type == HttpEventType.UploadProgress) {

                this.certPercent = (resp.loaded / resp.total) * 100;
            }
            if (resp.type == HttpEventType.Response) {

                this.otherInfoFormGroup.controls.certificateId.setValue(resp.body.exteraInformation);
            }
        }, err => {
            console.error('error', err);
            this.messageService.error('امکان آپلود این فایل وجود ندارد. حداکثر حجم مجاز 20 مگابایت است!');
            this.certPercent = 0;
        });
    }

    uploadCertificates(e, field) {
        var file = e.target.files[0];
        if (file == null) {
            return null;
        }

        var formData = new FormData();
        formData.append('Photo', file);
        formData.append('Tag', file.name);

        this.uploadService.saveStream(formData).subscribe((resp: any) => {
            if (field == 'buildingCertificateImageId')
                this.buildingCertificateImagePercent = 100;
            else
                this.isiriRequestImagePercent = 100;

            this.otherInfoFormGroup.controls[field].setValue(resp.exteraInformation);
        }, err => {
            var errorMessage = this.globalService.ExtractError(err);
            this.messageService.error(errorMessage);
            this.buildingCertificateImagePercent = 0;
            this.isiriRequestImagePercent = 0;
        });
    }

    download(field) {
        //console.log('data: ', data);

        this.uploadService.getFileKey(this.otherInfoFormGroup.controls[field].value).subscribe(resp => {
            console.log('key: ', resp);
            this.uploadService.downloadFile(resp.exteraInformation);
        });
    }

    deleteFile(field) {
        if (window.confirm('از حذف فایل اطمینان دارید؟')) {
            this.uploadService.deleteFile(this.otherInfoFormGroup.controls[field].value).subscribe(resp => {
                this.clearFileInput(field);
                this.otherInfoFormGroup.controls[field].reset();
                alert(resp.message);
            });
        }
    }

    clearFileInput(field) {
        switch (field) {
            case 'scanDocumentId':
                (document.getElementById('scanDocument') as HTMLInputElement).value = '';
                this.scanPercent = 0;
                break;
            case 'projectDocumentId':
                (document.getElementById('projectDocument') as HTMLInputElement).value = '';
                this.projectPercent = 0;
                break;
            case 'certificateId':
                (document.getElementById('certificate') as HTMLInputElement).value = '';
                this.certPercent = 0;
                break;
            default:
                break;
        }
    }
    confirm() {
        if (window.confirm('آیا از تایید درخواست جاری مطمن هستید؟')) {
        this.workflowService.confirmation(this.existingId).subscribe(res => {
            console.log(res);

            if (res.succeed) {
                this.messageService.success(res.message);
                var timer = setTimeout(() => {
                    this.router.navigate(['/workflow']);
                }, 1000);
            }
            else
            {
                this.messageService.error(res.message);
            }
        });
    }
    }
    reject() {
        const modal = this.modal.create({
            nzTitle: 'دلیل لغو خود را بیان کنید',
            nzContent: FastRegCommentComponent,
            nzViewContainerRef: this.viewContainerRef,
            nzMaskClosable: false,
            nzOnOk: () => {
                debugger;
                if (instance.addcomment.invalid) {
                    this.messageService.warning("مقادیر روی فرم صحیح نمی باشند");
                    return false;
                }
                this.workflowService.CreateComment(this.existingId, instance.addcomment.value).subscribe(response => {
                    if (response.succeed) {

                        this.messageService.success(response.message);

                        modal.destroy({});
                        return;
                    }
                    this.messageService.error(response.message);
                }, err => {
                    var errorMessage = this.globalService.ExtractError(err);
                    this.messageService.error(errorMessage);
                });

                return false;
            }
        });
        const instance = modal.getContentComponent();
        // this.workflowService.reject(this.existingId).subscribe(res => {
        //     console.log(res);

        // });
    }
    getComments() {
        if(this.existingId!=null)
        {
            this.workflowService.GetComments(this.existingId).subscribe(res => {
                this.comments=res.data;
            });
        }
    }
    goBack(){
        this.router.navigate(['/workflow']);
    }

}