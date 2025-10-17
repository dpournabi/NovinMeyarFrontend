
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';

@Component({
    selector: 'niroo-mohareke',
    templateUrl: 'niroo-mohareke.component.html'
})

export class NirooMoharekeComponent implements OnInit {
    loading: boolean = false;
    @Input('fastInfo') fastInfo:any = {};


    SerialNo:FormControl = new FormControl(0, []);
    ObjectDetailGeerType:FormControl = new FormControl(0, []);
    NuminalStream:FormControl = new FormControl(0, []);
    GeerRatio:FormControl = new FormControl(0, []);
    StartStream:FormControl = new FormControl(0, []);
    HighSpeed:FormControl = new FormControl(0, []);
    LowSpeed:FormControl = new FormControl(0, []);
    OutputPower:FormControl = new FormControl(0, []);
    ModelName:FormControl = new FormControl(0, []);
    ObjectDetailEngineType:FormControl = new FormControl(0, []);
    UnderCut:FormControl = new FormControl(0, []);
    GrooveCount:FormControl = new FormControl(0, []);
    ShoesTypeId:FormControl = new FormControl(0, []);
    SquareReverseCount:FormControl = new FormControl(0, []);


    nirooForm: FormGroup = new FormGroup({
        SerialNo:this.SerialNo,
        ObjectDetailGeerType:this.ObjectDetailGeerType,
        NuminalStream :this.NuminalStream ,
        StartStream:this.StartStream,
        GeerRatio:this.GeerRatio,
        HighSpeed:this.HighSpeed,
        LowSpeed:this.LowSpeed,
        OutputPower:this.OutputPower,
        ModelName:this. ModelName,
        ObjectDetailEngineType:this.ObjectDetailEngineType,
        UnderCut:this.UnderCut,
        GrooveCount:this.GrooveCount,
        ShoesTypeId:this.ShoesTypeId,
        SquareReverseCount:this.SquareReverseCount

        
    });

    constructor() { }

    ngOnInit() { }
}