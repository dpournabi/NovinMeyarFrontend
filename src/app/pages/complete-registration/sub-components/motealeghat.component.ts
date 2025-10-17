

import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BaseDataService } from 'src/app/shared/services/custom/base-info/base-data.service';

@Component({
    selector: 'motealeghat',
    templateUrl: 'motealeghat.component.html'
})

export class MotealeghatComponent implements OnInit, OnChanges {
    loading: boolean = false;
    @Input('fastInfo') fastInfo:any = {};

    locationTypes: [];
    counterWeightTypes: [];

    shaftWidth: FormControl = new FormControl(0, []);
    shaftDepth: FormControl = new FormControl(0, []);
    depthOfPit: FormControl = new FormControl(0, []);
    cabinStandHeight: FormControl = new FormControl(0, []);    
    counterWeightStandHeight: FormControl = new FormControl(0, []); 
    standsDistance: FormControl = new FormControl(0, []);
    counterWeightToStandDistance: FormControl = new FormControl(0, []);
    cabinRailDistance: FormControl = new FormControl(0, []);
    counterWeightRailDistance: FormControl = new FormControl(0, []);
    cabinRailTypeId: FormControl = new FormControl(0, []);
    cabinRailCount: FormControl = new FormControl(0, []);
    locationTypeId: FormControl = new FormControl(0, []);
    balanceWeightTypeId: FormControl = new FormControl(0, []);
    balanceWeightCount: FormControl = new FormControl(0, []);
    bracketDistance: FormControl = new FormControl(0, []);
    shaftHeight: FormControl = new FormControl(0, []);
    overHead: FormControl = new FormControl(0, []);
    railLength: FormControl = new FormControl(0, []);
    ropeTypeId: FormControl = new FormControl(0, []);
    ropeCount: FormControl = new FormControl(0, []);
    cableDiameter: FormControl = new FormControl(0, []);
    cabinToCounterWeightDistance: FormControl = new FormControl(0, []);
    suspendedLength: FormControl = new FormControl(0, []);
    hasIncpectorDoorInPit: FormControl = new FormControl(false, []);
    isHalfCloseShaft: FormControl = new FormControl(false, []);
    hasShareShaft: FormControl = new FormControl(false, []);
    hasEmergencyDoor: FormControl = new FormControl(false, []);
    hasVisitFromShaft: FormControl = new FormControl(false, []);
    railInstallationType: FormControl = new FormControl(null, []);
    k: FormControl = new FormControl(0, []);
    h1: FormControl = new FormControl(0, []);
    b1: FormControl = new FormControl(0, []);

    motealeghatForm: FormGroup = new FormGroup({
        shaftWidth: this.shaftWidth,
        shaftDepth: this.shaftDepth,
        depthOfPit: this.depthOfPit,
        cabinStandHeight: this.cabinStandHeight,
        counterWeightStandHeight: this.counterWeightStandHeight,
        standsDistance: this.standsDistance,
        counterWeightToStandDistance: this.counterWeightToStandDistance,
        cabinRailDistance: this.cabinRailDistance,
        counterWeightRailDistance: this.counterWeightRailDistance,
        cabinRailTypeId: this.cabinRailTypeId,
        cabinRailCount: this.cabinRailCount,
        locationTypeId: this.locationTypeId,
        balanceWeightTypeId: this.balanceWeightTypeId,
        balanceWeightCount: this.balanceWeightCount,
        bracketDistance: this.bracketDistance,
        shaftHeight: this.shaftHeight,
        overHead: this.overHead,
        railLength: this.railLength,
        ropeTypeId: this.ropeTypeId,
        ropeCount: this.ropeCount,
        cableDiameter: this.cableDiameter,
        cabinToCounterWeightDistance: this.cabinToCounterWeightDistance,
        suspendedLength: this.suspendedLength,
        hasIncpectorDoorInPit: this.hasIncpectorDoorInPit,
        isHalfCloseShaft: this.isHalfCloseShaft,
        hasShareShaft: this.hasShareShaft,
        hasEmergencyDoor: this.hasEmergencyDoor,
        hasVisitFromShaft: this.hasVisitFromShaft,
        railInstallationType: this.railInstallationType,
        k: this.k,
        b1: this.b1,
        h1: this.h1
    });
    
    constructor(private baseDataService: BaseDataService) { }
    ngOnChanges(changes: SimpleChanges): void {
        //throw new Error('Method not implemented.');
    }

    ngOnInit() { 
        this.baseDataService.getLocationTypes(5).subscribe(resp=> {
            this.locationTypes = resp.responseList;
        });

        this.baseDataService.getCounterWeightTypes().subscribe(resp => {
            this.locationTypes = resp.responseList;
        });
    }

    onLocationTypeChange(e) {
        this.locationTypeId.setValue(Number(e.target.value));
    }

    onWeightTypeFocus(e) {
        this.balanceWeightTypeId.setValue(Number(e.target.attributes['type-id'].value));
    }

    onRailInstallationType(e) {
        this.railInstallationType.setValue(Number(e.target.value));
    }
}