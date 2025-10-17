import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IDatePickerConfig } from 'ng2-jalali-date-picker';
import { UploadService } from 'src/app/shared/services/core/upload.service';
import { GlobalService } from 'src/app/shared/services/custom/global.service';
import { UtilitiesService } from 'src/app/shared/services/core/utilities.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { GET_INSTALLATION_USER_RESOLVER } from 'src/app/shared/Resolvers/resolvers';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/core/auth.service';
import * as moment from 'jalali-moment';

@Component({
    selector: 'add-seller',
    templateUrl: 'add-seller.component.html'
})

export class AddSellerComponent implements OnInit {
    loaded = false
    editProfile_title = ''
    designCertificateDocument: File;
    officeCertificateDocument: File;
    designCertificatePercent: number = 0;
    officeCertificatePercent: number = 0;
    editDisabled: boolean = true;
    

    addSellerForm = new FormGroup({
        id: new FormControl(0, []),
        name: new FormControl('',[Validators.required]),
        code: new FormControl('-', [Validators.required]),
        economicCode: new FormControl('', [Validators.required]),
        registrationNo: new FormControl('', [Validators.required]),
        nationalNo: new FormControl('', [Validators.required]),
        tellPhone: new FormControl('', []),
        ctoFirstName: new FormControl(null, []),
        ctoLastName: new FormControl(null, []),
        ctoCell: new FormControl(null, []),
        ctoBirthDate: new FormControl(null, []),
        address: new FormControl(null, []),
        designingCertificateId: new FormControl(0, [Validators.required]),
        registrationOfficeCertificate: new FormControl(0, [Validators.required])
    });
    
    designFile: File = null;
    officeFile: File = null;

    constructor(private uploadService: UploadService, private utility: UtilitiesService, 
        private messageService: NzMessageService,
        private resolver_ : GET_INSTALLATION_USER_RESOLVER,
        public router: Router,
        public authservice : AuthService,
        private nzMessageService: NzMessageService,
        private globalService : GlobalService) { }
    datePickerConfig: IDatePickerConfig = {
        drops: 'down',
        format: 'jYYYY/jMM/jDD',
        showMultipleYearsNavigation: true,
    }
    ngOnInit() {
        
        if (this.router.url === '/users/profile') {
            this.authservice.getInstallatinCompany().subscribe(res=>{
                if (res != undefined) {
                    
                    if(res.responseList[0].ctoBirthDate!=null)
                    {
                        res.responseList[0].ctoBirthDate = this.uploadService.toPersianDate(res.responseList[0].ctoBirthDate);
                    }
                    
                    this.addSellerForm.patchValue(res.responseList[0])
                    if(this.addSellerForm.controls['designingCertificateId'].value>0)
                    {
                        this.designCertificatePercent = 100;
                    }
                    if(this.addSellerForm.controls['registrationOfficeCertificate'].value>0)
                    {
                        this.officeCertificatePercent = 100;
                    }
                }
            });
        }
        else
        {
            if(this.addSellerForm.controls.ctoBirthDate.value!=null)
            {
                this.addSellerForm.controls.ctoBirthDate.setValue(this.uploadService.toPersianDate(this.addSellerForm.controls.ctoBirthDate.value));
            }
        }
     }

    edit_UserProfile(){
        this.loaded = true;
        let model = this.addSellerForm.value;
        if(!!this.addSellerForm.value.ctoBirthDate)
        {
            if(typeof(this.addSellerForm.value.ctoBirthDate)!='string')
                model.ctoBirthDate = this.addSellerForm.value.ctoBirthDate.toDate();
            else
                model.ctoBirthDate = this.uploadService.toGregorianMomentDate(this.addSellerForm.value.ctoBirthDate.toLocaleString());
        }
        this.authservice.EditProfile_Intallation_User(model).subscribe(res=>{
            if (res.succeed) {
                this.nzMessageService.success(res.message);
                this.loaded = false
                this.authservice.getInstallatinCompany().subscribe(result=>{
                    this.resolver_._Set(result)
                });
                return;
            } 
            
            this.messageService.error(res.message);
            this.loaded = false;
        },err =>{
            var errorMessage = this.globalService.ExtractError(err)
            this.messageService.error(errorMessage);
            this.loaded = false

        })
        this.messageService.info('نام کاربری شما بعد از تایید ادمین فعال خواهد شد!');
    }

    uploadCertificates(e, field) {
        var file = e.target.files[0];
        if (file==null) 
        {
            return null;
        }
     
        var formData = new FormData();
        formData.append('Photo', file);
        formData.append('Tag', file.name);

        this.uploadService.saveStream(formData).subscribe((resp: any) => {
            if(field=='designingCertificateId')
                this.designCertificatePercent =100;
            else
                this.officeCertificatePercent = 100;

            this.addSellerForm.controls[field].setValue(resp.exteraInformation);
        }, err => {
            var errorMessage = this.globalService.ExtractError(err);
            this.messageService.error(errorMessage);
            this.designCertificatePercent = 0;
        });
    }

    download(field) {
        this.uploadService.getFileKey(this.addSellerForm.controls[field].value).subscribe(resp => {
            console.log('key: ', resp);
            this.uploadService.downloadFile(resp.exteraInformation);
        });
    }

    deleteFile(field) {
        if (window.confirm('از حذف فایل اطمینان دارید؟')) {
            this.uploadService.deleteFile(this.addSellerForm.controls[field].value).subscribe(resp => {
                this.clearFileInput(field);
                this.addSellerForm.controls[field].setValue(0);
                alert(resp.message);
                this.edit_UserProfile();
            });
        }
    }

    clearFileInput(field) {
        if(field=='designingCertificateId')
        {
            this.designCertificatePercent = 0;
            (document.getElementById('designCertificateDocument') as HTMLInputElement).value = '';
        }
        else
        {
            this.officeCertificatePercent = 0;
            (document.getElementById('officeCertificateDocument') as HTMLInputElement).value = '';
        }
    }
}