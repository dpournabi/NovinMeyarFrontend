import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { GET_INSTALLATION_USER_RESOLVER } from 'src/app/shared/Resolvers/resolvers';
import { AuthService } from 'src/app/shared/services/core/auth.service';
import { AppStorage } from 'src/app/shared/storage/storage.swaps';

@Component({
    selector: 'panel-layout',
    templateUrl: 'panel-layout.component.html',
    encapsulation: ViewEncapsulation.None
})

export class PanelLayoutComponent implements OnInit {
    isCollapsed = false;
    version: string = '1.3.3';

    today: string = ''; 

    userInfo: any;
    frst_Route ;
    second_Route ;
    third_Route ;
    c_;

    constructor(private storage: AppStorage, 
        private auth: AuthService , 
        private resolver_ : GET_INSTALLATION_USER_RESOLVER,
        public router: Router,
        private route:ActivatedRoute
        ) {
        this.today = new Date().toLocaleDateString('fa-IR');

        this.userInfo = auth.getUserInfo();
     }

    ngOnInit() {
       this.c_ =  JSON.parse(localStorage.getItem('C_'))
     }

     isClient(){
       var Role =  JSON.parse(localStorage.getItem('Role'));
         
         if (Role === 'Client') {
             return true;
             
         }
         return false;

     }
     isRoot(){
        var Role =  JSON.parse(localStorage.getItem('Role'));
         
        if (Role === 'Root') {
            return true;
            
        }
        return false;
    }
    isAdmin(){
        var Role =  JSON.parse(localStorage.getItem('Role'));
         
        if (Role === 'Administrator') {
            return true;            
        }
        return false;
    }

    isBranchManager(){
        var Role =  JSON.parse(localStorage.getItem('Role'));
         
        if (Role === 'Branch Manager') {
            return true;            
        }
        return false;
    }

    isTechnicalExpert(){
        var Role =  JSON.parse(localStorage.getItem('Role'));
         
        if (Role === 'Technical Expert') {
            return true;            
        }
        return false;
    }

    isTechnicalManager(){
        var Role =  JSON.parse(localStorage.getItem('Role'));
        if (Role === 'Technical Manager') {
            return true;            
        }
        return false;
    }

    logout() {
        this.storage.remove('token');
        this.storage.remove('Role');
        this.storage.remove('userInfo');
        this.storage.remove('C_');
        window.location.replace('/login');
    }

    activeUser(e){
        this.router.navigate(['/users/Clients/' + e])
    }
}