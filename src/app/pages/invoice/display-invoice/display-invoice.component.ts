import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FastRegistrationService } from 'src/app/shared/services/custom/fast-registration/fast-registration.service';
import { NzMessageService } from 'ng-zorro-antd/message';

// type GUID = string & { isGuid: true};
// function guid(guid: string) : GUID {
//     return  guid as GUID; // maybe add validation that the parameter is an actual guid ?
// }

@Component({
  selector: 'app-display-invoice',
  templateUrl: './display-invoice.component.html'
})

export class DisplayInvoiceComponent implements OnInit {

  constructor(private fastRegistrationService:FastRegistrationService,
    private route: ActivatedRoute,
    private messageService : NzMessageService) { }

    invoice:any;
    invoiceId:string;
    loaded = false;

  ngOnInit(): void {
     this.route.paramMap.subscribe((params:ParamMap)=>{
      
         let id = params.get("id");//+ --> convert string to int
         debugger
         this.invoiceId = id;
         this.fastRegistrationService.getDisplayInvoice(id)
       .subscribe(resp => {
           this.invoice = resp.data;
       });
     });
  }

  goToGateway(): void{
    this.loaded = true;
    debugger
     this.fastRegistrationService.getPaymentToken(this.invoiceId).subscribe(resp => {
      if(!resp.succeed)
      {
        this.loaded = false;
        this.messageService.error(resp.message);
        return;
      }
      window.location.href = `https://pep.shaparak.ir/payment.aspx?n=${resp.data}`;
  });
  }

}
