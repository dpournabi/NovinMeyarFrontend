import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'other',
    templateUrl: 'other.component.html'
})

export class OtherComponent implements OnInit {
    loading: boolean = false;
    @Input('fastInfo') fastInfo:any = {};

    otherForm: FormGroup = new FormGroup({
        
    });
    
    constructor() { }

    ngOnInit() { }
}