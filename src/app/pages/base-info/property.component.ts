

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseInfoService } from 'src/app/shared/services/custom/base-info/base-info.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableComponent } from 'ng-zorro-antd/table';

interface propModel {
    id: number,
    name: string,
    type: string
}

@Component({
    selector: 'property',
    templateUrl: 'property.component.html'
})

export class PropertyComponent implements OnInit {
    type:FormControl = new FormControl('', [Validators.required]);
    name:FormControl = new FormControl('', [Validators.required]);

    @ViewChild('basicTable') myTable: NzTableComponent<propModel>

    propertyForm: FormGroup = new FormGroup({
        type: this.type,
        name: this.name
    });

    propData: propModel[];

    constructor(private service: BaseInfoService, private messageService: NzMessageService) { }

    ngOnInit() {        
        console.log('table data: ', this.myTable);
     }

    deactiveProperty(data) {
        if (window.confirm('آیا از حذف این ویژگی اطمینان دارید؟')) {
            this.service.deleteProperty(data.id).subscribe(resp => {
                this.propData.removeTree(data.id, 'id', null);
            }, err => {
                console.log('delete property error: ', err);
                this.messageService.error('بروز خطا!');
            });
        }
    }

    editProperty(data) {

    }
}