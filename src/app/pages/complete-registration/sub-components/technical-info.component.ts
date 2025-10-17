
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FastRegistrationService } from 'src/app/shared/services/custom/fast-registration/fast-registration.service';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
    selector: 'technical-info',
    templateUrl: 'technical-info.component.html'
})

export class TechnicalInfoComponent implements OnInit, OnChanges {
    loading: boolean = false;
    @Input('fastInfo') fastInfo:any = {};

    stopCount: FormControl = new FormControl(0, []);
    carCapacityCount: FormControl = new FormControl(0, []);
    carCapacityWeight: FormControl = new FormControl(0, []);
    cabinSpeed: FormControl = new FormControl(0, []);
    travel: FormControl = new FormControl(0, []);
    elevatorCount: FormControl = new FormControl(0, []);
    pitSituation: FormControl = new FormControl('type1', []);
    hasMachineRoom: FormControl = new FormControl('Y', []);
    openingSide: FormControl = new FormControl('front', []);
    elevatorPhoneNumber: FormControl = new FormControl('00000000', []);
    elevatorNationalNo: FormControl = new FormControl(null, []);

    luxMeterSerialNo: FormControl = new FormControl('--', []);
    powerMeterSerialNo: FormControl = new FormControl('--', []);
    typeMeterSerialNo: FormControl = new FormControl('--', []);
    multiMeterSerialNo: FormControl = new FormControl('--', []);
    laserMeterSerialNo: FormControl = new FormControl('--', []);
    collisSerialNo: FormControl = new FormControl('--', []);
    thicknessGaugeSerialNo: FormControl = new FormControl('--', []);
    threePahseSerialNo: FormControl = new FormControl('----------', []);
    floorLength: FormControl = new FormControl(0, []);
    balanceRatio: FormControl = new FormControl(0, []);

    technicalInfoForm: FormGroup = new FormGroup({
        stopCount: this.stopCount,
        carCapacityCount: this.carCapacityCount,
        carCapacityWeight: this.carCapacityWeight,
        cabinSpeed: this.cabinSpeed,
        travel: this.travel,
        elevatorCount: this.elevatorCount,
        pitSituation: this.pitSituation,
        hasMachineRoom: this.hasMachineRoom,
        openingSide: this.openingSide,
        elevatorPhoneNumber: this.elevatorPhoneNumber,
        elevatorNationalNo: this.elevatorNationalNo,
        luxMeterSerialNo: this.luxMeterSerialNo,
        powerMeterSerialNo: this.powerMeterSerialNo,
        typeMeterSerialNo: this.typeMeterSerialNo,
        multiMeterSerialNo: this.multiMeterSerialNo,
        laserMeterSerialNo: this.laserMeterSerialNo,
        collisSerialNo: this.collisSerialNo,
        thicknessGaugeSerialNo: this.thicknessGaugeSerialNo,
        threePahseSerialNo: this.threePahseSerialNo,
        floorLength: this.floorLength,
        balanceRatio: this.balanceRatio
    });

    editLoading: boolean = false;

    constructor(private fastRegistrationService: FastRegistrationService,
        private messageService : NzMessageService) {

    }
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.fastInfo) {            
            this.elevatorNationalNo.setValue(changes.fastInfo.currentValue.elevatorNationalNo);
        }
    }

    ngOnInit() { 
        
    }

    ngSave()
    {debugger
        this.fastRegistrationService.completeRegistration({
            stopCount : this.technicalInfoForm.value.stopCount,
            carCapacityCount:this.technicalInfoForm.value.carCapacityCount,
            carCapacityWeigh:this.technicalInfoForm.value.carCapacityWeigh,
            cabinSpeed:this.technicalInfoForm.value.cabinSpeed,
            travel:this.technicalInfoForm.value.travel,
            elevatorCount:this.technicalInfoForm.value.elevatorCount,
            pitSituation:this.technicalInfoForm.value.pitSituation,
            hasMachineRoom:this.technicalInfoForm.value.hasMachineRoom,
            openingSide:this.technicalInfoForm.value.openingSide,
            elevatorPhoneNumber:this.technicalInfoForm.value.elevatorPhoneNumber,
            elevatorNationalNo:this.technicalInfoForm.value.elevatorNationalNo,
            luxMeterSerialNo:this.technicalInfoForm.value.luxMeterSerialNo,
            powerMeterSerialNo:this.technicalInfoForm.value.powerMeterSerialNo,
            typeMeterSerialNo:this.technicalInfoForm.value.typeMeterSerialNo,
            multiMeterSerialNo:this.technicalInfoForm.value.multiMeterSerialNo,
            laserMeterSerialNo:this.technicalInfoForm.value.laserMeterSerialNo,
            collisSerialNo:this.technicalInfoForm.value.collisSerialNo,
            thicknessGaugeSerialNo:this.technicalInfoForm.value.thicknessGaugeSerialNo,
            threePahseSerialNo:this.technicalInfoForm.value.threePahseSerialNo,
            floorLength:this.technicalInfoForm.value.floorLength,
            balanceRatio:this.technicalInfoForm.value.balanceRatio

            

        }).subscribe(response => {
            this.editLoading = false;
            if(!response.succeed)
            {
                 this.editLoading = false;
                 this.messageService.error(response.message);
                return;
            }
            this.messageService.success(response.message);
            // if (display == true) {
            //     //this.router.navigate(['/fast-reg-list/'], { queryParams: { id: resp.exteraInformation } });
            // }
        }, err => {
            this.editLoading = false;
            console.error('fast register error: ', err);
            this.messageService.error(err);
        })
    }
}