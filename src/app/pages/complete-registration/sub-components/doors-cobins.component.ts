
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';

@Component({
    selector: 'doors-cobins',
    templateUrl: 'doors-cobins.component.html'
})

export class DoorsCobinsComponent implements OnInit {
    loading: boolean = false;
    @Input('fastInfo') fastInfo:any = {};

    CabinDepth:FormControl = new FormControl(0, []);
    DoorWidth:FormControl = new FormControl(0, []);
    CabinWidth:FormControl = new FormControl(0, []);
    CabinHeight:FormControl = new FormControl(0, []);
    WallMaterialTypeId:FormControl = new FormControl(0, []);
    BedMaterialTypeIdh:FormControl = new FormControl(0, []);
    BedMaterialTypeId:FormControl = new FormControl(0, []);
    CarWeight:FormControl = new FormControl(0, []);
    CabinTrayHeight:FormControl = new FormControl(0, []);
    VerticalShoesDistance:FormControl = new FormControl(0, []);
    ThresholdDepth:FormControl = new FormControl(0, []);
    CabinCenterDistanceFromRailX:FormControl = new FormControl(0, []);
    CabinCenterDistanceFromRailY:FormControl = new FormControl(0, []);
    CabinCenterDistanceMassFromRailX:FormControl = new FormControl(0, []);
    CabinCenterDistanceMassFromRailY:FormControl = new FormControl(0, []);
    AnchorCenterDistanceFromRailX:FormControl = new FormControl(0, []);
    AnchorCenterDistanceFromRailY:FormControl = new FormControl(0, []);
    CabinDoorDistanceFromRailX:FormControl = new FormControl(0, []);
    CabinDoorDistanceFromRailY:FormControl = new FormControl(0, []);
    CabinDoorDepth:FormControl = new FormControl(0, []);


    doorsCobinsForm: FormGroup = new FormGroup({
        CabinDepth:this.CabinDepth,
        DoorWidth:this.DoorWidth,
        CabinWidth:this.CabinWidth,
        CabinHeight :this.CabinHeight ,
        WallMaterialTypeId:this.WallMaterialTypeId,
        BedMaterialTypeId:this.BedMaterialTypeId,
        CarWeight:this.CarWeight,
        CabinTrayHeight:this.CabinTrayHeight,
        VerticalShoesDistance:this.VerticalShoesDistance,
        ThresholdDepth:this.ThresholdDepth,
        CabinCenterDistanceFromRailX:this.CabinCenterDistanceFromRailX,
        CabinCenterDistanceFromRailY :this. CabinCenterDistanceFromRailY ,
        CabinCenterDistanceMassFromRailX:this.CabinCenterDistanceMassFromRailX,
        CabinCenterDistanceMassFromRailY:this.CabinCenterDistanceMassFromRailY,
        AnchorCenterDistanceFromRailX:this.AnchorCenterDistanceFromRailX,
        AnchorCenterDistanceFromRailY:this.AnchorCenterDistanceFromRailY,
        CabinDoorDistanceFromRailX :this.CabinDoorDistanceFromRailX ,
        CabinDoorDistanceFromRailY:this.CabinDoorDistanceFromRailY,
        CabinDoorDepth:this.CabinDoorDepth



    });

    constructor() { }

    ngOnInit() { }
}