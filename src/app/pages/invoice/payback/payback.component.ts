import { Component } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { FastRegistrationService } from 'src/app/shared/services/custom/fast-registration/fast-registration.service';

@Component({
    selector: 'app-payback',
    templateUrl: './payback.component.html'
  })

export class PaybackComponent{
  status: number = 0;
  public paymentResult:any ={succeed:true, message:'پرداخت شما با موفقیت انجام شد', data:{invoiceNumber:'8120353696'}};
  public checkPayment:boolean = true;

  constructor( private route: ActivatedRoute,
               private fastRegistrationService:FastRegistrationService,
               private router: Router){
  }

  ngOnInit() {
    this.checkPayment=true;
    this.route.queryParams.subscribe(p => {
        //console.log('params: ', p);
        console.log(p);
        debugger
        if (!p.iN || !p.iD || !p.tref) {
            return;
        }
        this.fastRegistrationService.checkTransactionResult(
          {
            invoiceNumber:p.iN,
            invoiceDate: p.iD,
            transactionReferenceID: p.tref
          }).subscribe(resp => { 
            debugger
           var response = resp.data;
           debugger
       });

        // this.existingId = p.id;
        // this.service.searchRegistrations({
        //     pageIndex: 1,
        //     pageSize: 10,
        //     id: p.id
        // }).subscribe(resp => {
        //     //console.log('single resp: ', resp);

        //     this.fillForm(resp.responseList[0]);
        // });
    });
    
  }

} 