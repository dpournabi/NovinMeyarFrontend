import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { InspectionService } from 'src/app/shared/services/custom/inspection/inspection.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { GlobalService } from 'src/app/shared/services/custom';
import { NzModalService } from 'ng-zorro-antd/modal';
import { PaymentLinkModalComponent } from 'src/app/pages/inspection/payment-link-modal/payment-link-modal.component'

@Component({
    selector: 'inspection',
    templateUrl: 'inspection.component.html'
})

export class InspectionComponent implements OnInit {

    elevatorInformationId: any = null;

    inspections: Array<any> = [];
    total: number;
    pageSize: number = 10;
    pageIndex: number = 1;

    inspectionType: FormControl = new FormControl(null, []);
    myForm: FormGroup = new FormGroup({
        inspectionType: this.inspectionType
    });

    constructor(private inspectionService: InspectionService, private route: ActivatedRoute, private modal: NzModalService,
        private viewContainerRef: ViewContainerRef, private messageService: NzMessageService, private globalService: GlobalService) {
    }

    ngOnInit() {
        this.route.params.subscribe(routeParam => {
            if (!routeParam.id) {
                return;
            }
            this.elevatorInformationId = routeParam.id;
            this.inspectionService.getData(this.elevatorInformationId).subscribe(resp => {
                console.log('single resp: ', resp);
                this.inspections = resp.responseList;
            });
        });
    }

    gridChanged(e: NzTableQueryParams) {
        //this.search(e.pageIndex, e.pageSize);
    }

    getShamsiDate(date) {
        return this.inspectionService.toPersianDateTime(date);
    }

    deactive(data) {
        this.inspectionService.deactive(data.id).subscribe(resp => {
            this.messageService.success(resp.message);
            this.inspectionService.getData(this.elevatorInformationId).subscribe(resp => {
                console.log('single resp: ', resp);
                this.inspections = resp.responseList;
            });
        }, err => {
            this.messageService.error(err.message);
        });
    }

    newInspection() {
        debugger
        this.inspectionService.saveData({
            ElevatorInformationId: Number(this.elevatorInformationId),
        }).subscribe(resp => {
            debugger
            if(!resp.succeed)
            {
                this.messageService.error(resp.message);
                return;
            }
            this.inspectionService.getData(this.elevatorInformationId).subscribe(resp => {
                console.log('single resp: ', resp);
                this.inspections = resp.responseList;
                debugger
            });
        }, err => {
            debugger
            console.error(err);
        });
    }
    displayPaymentLinkModal(responsibleCell, elevatorInspectionId)
    {
      const modal = this.modal.create({
        nzTitle: 'تنظیم شماره دریافت کننده لینک پرداخت',
        nzContent: PaymentLinkModalComponent,
        nzViewContainerRef: this.viewContainerRef,
        nzMaskClosable: false,
        nzComponentParams: {
          InputData: JSON.stringify({ 'responsibleCell':responsibleCell,'elevatorInspectionId':elevatorInspectionId})
        },
        nzOnOk: () => {
            debugger;
            if (instance.paymentLinkForm.invalid) {
                this.messageService.warning("فرمت شماره صحیح نمی باشند");
                return false;
            }
            var user = instance.paymentLinkForm.value;
            this.inspectionService.notify({PhoneNumber:instance.paymentLinkForm.controls.responsibleCell.value, ElevatorInspectionId:instance.paymentLinkForm.controls.elevatorInspectionId.value})
            .subscribe(res => {
                if(res.succeed)
                {
                    this.messageService.success(res.message);
                    modal.destroy({});
                    return;
                }
                this.messageService.error(res.message);
            }, err=>{
                var errorMessage = this.globalService.ExtractError(err);
               this.messageService.error(errorMessage);
            });
            return false;
        }
    });
    const instance = modal.getContentComponent();
    }
}