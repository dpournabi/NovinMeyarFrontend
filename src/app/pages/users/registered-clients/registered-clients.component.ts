import { Component, OnChanges, OnInit, SimpleChanges, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { AuthService } from 'src/app/shared/services/core/auth.service';

@Component({
  selector: 'app-registered-clients',
  templateUrl: './registered-clients.component.html',
  styleUrls: ['./registered-clients.component.scss']
})
export class RegisteredClientsComponent implements OnInit  {
  clients 
  total: number;
  pageSize: number = 10;
  pageIndex: number = 1;
  client_req:boolean;
 
  
  constructor(private authservice : AuthService,
              private route : ActivatedRoute,
              private messageService: NzMessageService
  ) { }

  ngOnInit(): void {
   this.route.params.subscribe(res =>{
    this.client_req = res.id 
    console.log(typeof this.client_req);

    this.getAllNewClients(this.client_req) 
    if (res.id === 'true') {
      this.client_req = true
    } else {
      this.client_req = false
    }
    
    console.log(typeof this.client_req);
    
    // setTimeout(() => {
      
    // }, 20);
   })
  
  }

  gridChanged(e: NzTableQueryParams) {
    // this.search(e.pageIndex, e.pageSize);
}

getAllNewClients(e){

    this.authservice.getAllNewClients(e).subscribe(res=>{
      if (res.succeed) {
        this.clients =  res.responseList
        this.total = res.exteraInformation;
      }
  }, err => {
      console.error('real error: ', err);
  });
      
  }

  confirm(e){
    this.authservice.VARIYFY_BY_ADMIN(JSON.stringify(e.id)).subscribe(res=>{
        if (res.succeed) {
          this.messageService.success(res.message);
          if (!this.client_req) {
            this.getAllNewClients(false) 
          }
          else{
            this.getAllNewClients(true) 
          }
          
        }
      }, err => {
          console.error('real error: ', err);
      });
  }
  deactive(e){
    this.authservice.deactivateUser(JSON.stringify(e.id)).subscribe(res=>{
        if (res.succeed) {
          this.messageService.success(res.message);
          if (!this.client_req) {
            this.getAllNewClients(false) 
          }
          else{
            this.getAllNewClients(true) 
          }
          
        }
      }, err => {
          console.error('real error: ', err);
      });
  }
}