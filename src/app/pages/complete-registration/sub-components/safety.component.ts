
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';

@Component({
    selector: 'safety',
    templateUrl: 'safety.component.html'
})

export class SafetyComponent implements OnInit {
    loading: boolean = false;
    @Input('fastInfo') fastInfo:any = {};


    CabinAntiShockTypeId: FormControl = new FormControl(0, []);
    CabinAntiShockTypeSerialNo: FormControl = new FormControl(0, []);
    CabinCapacityWeight: FormControl = new FormControl(0, []);
    CounterWightAntiShockTypeId: FormControl = new FormControl(0, []);
    GovernerType: FormControl = new FormControl(0, []);
    MaximumValidSpeed: FormControl = new FormControl(0, []);
    BoardType: FormControl = new FormControl(0, []);
    SerialNo: FormControl = new FormControl(0, []);
    TravelingCableType: FormControl = new FormControl(0, []);
    CounterWeightAntiShockType: FormControl = new FormControl(0, []);
    stopCount: FormControl = new FormControl(0, []);
    CounterWeightAntiShockTypeSerialNo: FormControl = new FormControl(0, []);
    CounterCapacityWeight: FormControl = new FormControl(0, []);
    SafetyBrakesType: FormControl = new FormControl(0, []);
    CapacityWeight: FormControl = new FormControl(0, []);
    MaximumSpeed: FormControl = new FormControl(0, []);
    BrakeType: FormControl = new FormControl(0, []);
    TangleSide: FormControl = new FormControl(0, []);
    LockType: FormControl = new FormControl(0, []);
     



    safetyForm: FormGroup = new FormGroup({
        CabinAntiShockTypeId:this.CabinAntiShockTypeId,
        CabinAntiShockTypeSerialNo:this.CabinAntiShockTypeSerialNo,
        CabinCapacityWeight:this.CabinCapacityWeight,
        CounterWightAntiShockTypeId:this.CounterWightAntiShockTypeId,
        GovernerType:this.GovernerType,
        MaximumValidSpeed:this.MaximumValidSpeed,
        BoardType:this.BoardType,
        SerialNo:this.SerialNo,
        TravelingCableType:this.TravelingCableType,
        CounterWeightAntiShockType:this.CounterWeightAntiShockType,
        CounterWeightAntiShockTypeSerialNo:this.CounterWeightAntiShockTypeSerialNo,
        CounterCapacityWeight:this.CounterCapacityWeight,
        SafetyBrakesType :this.SafetyBrakesType,
        CapacityWeight:this.CapacityWeight,
        MaximumSpeed:this.MaximumSpeed,
        BrakeType:this.BrakeType,
        TangleSide :this.TangleSide,
        LockType:this.LockType
    });
    
    constructor() { }

    ngOnInit() { }
}