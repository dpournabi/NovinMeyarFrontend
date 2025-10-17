import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { IDatePickerConfig } from 'ng2-jalali-date-picker';
import { UploadService } from 'src/app/shared/services/core/upload.service';
import { GlobalService } from 'src/app/shared/services/custom/global.service';

@Component({
    selector: 'add-real-customer',
    templateUrl: 'add-real-customer.component.html'
})

export class AddRealCustomerComponent implements OnInit {

    constructor(private uploadService:UploadService,
                private globalService : GlobalService,
                private messageService: NzMessageService)
    {

    }
    realCustomerForm: FormGroup = new FormGroup({
        id: new FormControl(0, []),
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        nationalCode: new FormControl('', [Validators.required, Validators.maxLength(10)]),
        cellPhone: new FormControl('', [Validators.required, Validators.maxLength(11)]),
        tellPhone: new FormControl('', [Validators.maxLength(11)]),
        birthDate: new FormControl('', []),
        email: new FormControl('', []),
        postalCode: new FormControl('', []),
        address: new FormControl('', []),
        nationalCartId: new FormControl(null, [Validators.required])
    });

    editDisabled: boolean = true;
    nationalCartDocument: File=null;
    nationalCartPercent: number = 0;

    datePickerConfig: IDatePickerConfig = {
        drops: 'down',
        format: 'jYYYY/jMM/jDD',
        showMultipleYearsNavigation: true
    }
    @Output() formProvider = new EventEmitter<FormGroup>();

    ngOnInit() {
        this.formProvider.emit(this.realCustomerForm);
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
            this.nationalCartPercent =100;
            this.realCustomerForm.controls[field].setValue(resp.exteraInformation);
        }, err => {
            var errorMessage = this.globalService.ExtractError(err);
            this.messageService.error(errorMessage);
            this.nationalCartPercent = 0;
        });
    }

    download(field) {
        this.uploadService.getFileKey(this.realCustomerForm.controls[field].value).subscribe(resp => {
            console.log('key: ', resp);
            this.uploadService.downloadFile(resp.exteraInformation);
        });
    }

    deleteFile(field) {
        if (window.confirm('از حذف فایل اطمینان دارید؟')) {
            this.uploadService.deleteFile(this.realCustomerForm.controls[field].value).subscribe(resp => {
                this.realCustomerForm.controls[field].setValue(0);
                this.nationalCartPercent=0;
                alert(resp.message);
            });
        }
    }
}