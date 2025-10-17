
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FastRegistrationService } from 'src/app/shared/services/custom/fast-registration/fast-registration.service';
import { DoorsCobinsComponent } from './sub-components/doors-cobins.component';
import { MotealeghatComponent } from './sub-components/motealeghat.component';
import { NirooMoharekeComponent } from './sub-components/niroo-mohareke.component';
import { OtherComponent } from './sub-components/other.component';
import { SafetyComponent } from './sub-components/safety.component';
import { TechnicalInfoComponent } from './sub-components/technical-info.component';

@Component({
    selector: 'complete-registration-tabs',
    templateUrl: 'complete-registration-tabs.component.html'
})
export class CompleteRegistrationTabsComponent implements OnInit {
    constructor(private route: ActivatedRoute, private router: Router,
        private service: FastRegistrationService) { }

    currentId: number = 0;
    currentIndex: number = 0;
    currentFastInfo: any = {};

    @ViewChild('technicalInfo') technicalInfoComponent: TechnicalInfoComponent;
    @ViewChild('motealeghat') motealeghatComponent:MotealeghatComponent;
    @ViewChild('doorscobins') doorsCobinsComponent: DoorsCobinsComponent;
    @ViewChild('safety') safetyComponent: SafetyComponent;
    @ViewChild('niroomohareke') nirooMoharekeComponent: NirooMoharekeComponent;
    @ViewChild('other') otherComponent: OtherComponent;

     

    tabs = [
        {
            index: 0,
            name: 'اطلاعات عمومی و فنی',
            disabled: false
        },
        {
            index: 1,
            name: 'چاه و متعلقات آسانسور',
            disabled: false
        },
        {
            index: 2,
            name: 'کابین و درب ها',
            disabled: false
        },
        {
            index: 3,
            name: 'مشخصات قطعات ایمنی',
            disabled: false
        },
        {
            index: 4,
            name: 'نیروی محرکه، محل و متعلقات آن',
            disabled: false
        },
        {
            index: 5,
            name: 'راهنما و سایر توضیحات',
            disabled: false
        }
    ]

    getFastInfo() {
        this.service.searchRegistrations({
            pageIndex: 1,
            pageSize: 10,
            id: this.currentId
        }).subscribe(resp => {
            this.currentFastInfo = resp.responseList[0];
        });
    }

    ngOnInit() { 
        this.route.queryParams.subscribe(p=>{
            if (!p.id) {
                this.router.navigate(['dashboard']);
                return;
            }
            else {
                this.currentId = p.id;     
                this.getFastInfo();           
            }
        });
    }

    goNext() {
        this.currentIndex++;
    }

    goPrev() {
        this.currentIndex--;
    }

    save() {
        let technical = this.technicalInfoComponent.technicalInfoForm.value;
        let motealeghat = this.motealeghatComponent.motealeghatForm.value;
        let doors=this.doorsCobinsComponent.doorsCobinsForm.value;
        let safety=this.safetyComponent.safetyForm.value;
        let niroo=this.nirooMoharekeComponent.nirooForm.value;
        let other=this.otherComponent.otherForm.value;

         let savingPacket = {
            //   a,b,c,d,e,f
              
         };
         console.log('saving packet: ', savingPacket);
         

        
    }
}