
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IDatePickerConfig } from 'ng2-jalali-date-picker';

@Component({
    selector: 'add-legal-customer',
    templateUrl: 'add-legal-customer.component.html'
})

export class AddLegalCustomerComponent implements OnInit {
    legalCustomerForm = new FormGroup({
        id: new FormControl(0, []),
        name: new FormControl('', [Validators.required]),
        code: new FormControl('--', []),
        economicCode: new FormControl('', [Validators.required]),
        registerNo: new FormControl('', [Validators.required]),
        nationalCode: new FormControl('', [Validators.required]),
        tellPhone: new FormControl('', [Validators.required]),
        ceoFirstName: new FormControl('', []),
        ceoCell: new FormControl('', []),
        ceoLastName: new FormControl('', []),
        ceoBirthday: new FormControl('', []),
        address: new FormControl('', [])
    });
    datePickerConfig: IDatePickerConfig = {
        drops: 'up',
        format: 'jYYYY/jMM/jDD',
        showMultipleYearsNavigation: true
    }
    @Output() formProvider = new EventEmitter<FormGroup>();
    constructor() {
    }

    ngOnInit() {
        this.formProvider.emit(this.legalCustomerForm);
    }
    
}