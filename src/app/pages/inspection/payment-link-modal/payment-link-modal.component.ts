import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FastRegistrationService } from 'src/app/shared/services/custom/fast-registration/fast-registration.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { GlobalService } from 'src/app/shared/services/custom';
@Component({
  selector: 'app-payment-link-modal',
  templateUrl: './payment-link-modal.component.html'
})
export class PaymentLinkModalComponent implements OnInit  {

  @Input() InputData: string;
  paymentLinkForm = new FormGroup({
    responsibleCell: new FormControl(null,[Validators.required]),
    elevatorInspectionId: new FormControl(null,[Validators.required])
});
  modal: any;
  viewContainerRef: any;
  constructor(private service:FastRegistrationService,
              private messageService:NzMessageService,
              private globalService:GlobalService
  ) { }

  ngOnInit(): void {
    console.log(this.InputData);
    this.paymentLinkForm.patchValue(JSON.parse(this.InputData));
    debugger
    //this.paymentLinkForm.controls.elevatorInspectionId.setValue(this.InputData);
  }
}

