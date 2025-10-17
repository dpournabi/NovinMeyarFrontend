
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/core/auth.service';

@Component({
    selector: 'header-info',
    templateUrl: 'header-info.component.html'
})

export class HeaderInfoComponent implements OnInit {
    userInfo: any;
    @Input('fastInfo') fastInfo:any = {};
    constructor(public auth: AuthService) { 
        this.userInfo = auth.getUserInfo();
    }

    ngOnInit() { }
}