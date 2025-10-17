
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'add-customer-tabs',
    templateUrl: 'add-customer-tabs.component.html'
})

export class AddCustomerTabsComponent implements OnInit {
    realCustomerForm: FormGroup;
    legalCustomerForm: FormGroup;

    legalInitialValue: object;
    realInitialValue: object;

    selectedTab: string = 'real'; // real, legal

    constructor() { }

    ngOnInit() { }

    provideRealForm(e) {
        console.log('real form: ', e);
        this.realCustomerForm = e;
        if (this.realInitialValue) {
            this.realCustomerForm.patchValue(this.realInitialValue);
        }
    }
    provideLegalForm(e) {
        console.log('legal from:', e);
        this.legalCustomerForm = e;
        if (this.legalInitialValue) {
            this.legalCustomerForm.patchValue(this.legalInitialValue);
        }
    }
}