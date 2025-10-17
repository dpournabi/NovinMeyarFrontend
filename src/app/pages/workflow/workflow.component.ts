import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { IDatePickerConfig } from 'ng2-jalali-date-picker';
import { map } from 'rxjs/operators';
import { InstallationCompanyService } from 'src/app/shared/services/custom/installation-company/installation-company.service';
import { WorkflowService } from 'src/app/shared/services/custom/workflow/workflow.service';

@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.scss'],
})
export class WorkflowComponent implements OnInit {
  constructor(
    private service: WorkflowService,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
    private messageService: NzMessageService,
    private installationService: InstallationCompanyService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.GetPageRequestType();
  }

  isClient() {
    var Role = JSON.parse(localStorage.getItem('Role'));

    if (Role === 'Client') {
      return true;
    }
    return false;
  }

  registrations: Array<any> = [];
  total: number;
  pageSize: number = 10;
  pageIndex: number = 1;
  requestTypePagedRequest: {
    PageIndex: number;
    PageSize: number;
    title: string;
  } = { PageIndex: 1, PageSize: 10, title: '' };
  requestTypes: Array<any> = [];

  isLoadingRequestTypes: boolean = false;

  statesId: FormControl = new FormControl(null, []);
  lastStateID: FormControl = new FormControl(null, []);
  installationCompanyId: FormControl = new FormControl(null, []);
  documentNumber: FormControl = new FormControl(null, []);
  requestTypeId: FormControl = new FormControl(null, []);
  isSeen: FormControl = new FormControl(null, []);
  isActive: FormControl = new FormControl(null, []);
  fromDate: FormControl = new FormControl(null, []);
  toDate: FormControl = new FormControl(null, []);
  sellers: Array<any> = [];
  myForm: FormGroup = new FormGroup({
    statesId: this.statesId,
    lastStateID: this.lastStateID,
    requestTypeId: this.requestTypeId,
    isSeen: this.isSeen,
    isActive: this.isActive,
    fromDate: this.fromDate,
    toDate: this.toDate,
    documentNumber: this.documentNumber,
    installationCompanyId: this.installationCompanyId
  });
  datePickerConfig: IDatePickerConfig = {
    drops: 'down',
    format: 'jYYYY/jMM/jDD',
    showMultipleYearsNavigation: true,
  };
  onSellerInput(e) {
    this.installationService.search({
        "pageIndex": 1,
        "pageSize": 5,
        "name": e.target.value
    }).subscribe(resp => {
        console.log('seller resp: ', resp);
        if (resp.succeed) {
            this.sellers = resp.responseList;
        }
    }, err => {
        console.log('seller error: ', err);
    });
  };
  search(index?: number, size?: number) {
    this.pageIndex = index ?? this.pageIndex;
    this.pageSize = size ?? 10;
    this.getData({
      pageIndex: index ?? this.pageIndex,
      pageSize: size ?? 10,
      toDate: this.toDate.value,
      fromDate: this.fromDate.value,
      isActive: this.isActive.value,
      isSeen: this.isSeen.value,
      requestTypeId: this.requestTypeId.value,
      lastStateID: this.lastStateID.value,
      documentNumber: this.documentNumber.value,
      installationCompanyId: this.installationCompanyId.value
    });
  }
  undoRequestState(data:any)
  {
    debugger
    this.service.undoRequestState(data.id).subscribe((resp)=>{
      if (resp.succeed) {
        this.messageService.success(resp.message);
        this.search(1,10);
      } else {
        this.messageService.error(resp.message);
      }
    }, (err)=>{
      this.messageService.error(err.message);
    });
  }
  gridChanged(e: NzTableQueryParams) {
    this.search(e.pageIndex, e.pageSize);
  }
  scroll() {
    this.requestTypePagedRequest.PageIndex++;
    this.GetPageRequestType();
  }
  GetPageRequestType() {
    this.isLoadingRequestTypes = true;
    this.service.requestTypesPaged(this.requestTypePagedRequest).subscribe(
      (resp) => {
        if (resp.succeed) {
          this.requestTypes = [...this.requestTypes, ...resp.responseList];
        } else {
          this.requestTypePagedRequest.PageIndex--;
          this.messageService.error(resp.message);
        }
        this.isLoadingRequestTypes = false;
      },
      (err) => {
        console.error('get error: ', err);

        this.isLoadingRequestTypes = false;
      }
    );
  }
  searchPageRequestType(data): void {
    if (data) {
      this.requestTypePagedRequest.title = data;
      this.GetPageRequestType();
    }
  }
  edit(data) {
      this.router.navigate(['/fast-reg/'], { queryParams: { id: data.sourceTableKey } });
  }

  getShamsiDate(date) {
    return this.service.toPersianDateTime(date);
  }

  getData(searchModel) {
    this.service
      .SearchRequest(searchModel)
      .pipe(
        map((data) => {
          if (data.succeed && data.responseList) {
            data.responseList.map(
              (item) =>
                (item.createDate = this.service.toPersianDateTime(
                  item.createDate
                ))
            );
          }

          return data;
        })
      )
      .subscribe(
        (resp) => {
          if (resp.succeed) {
            this.registrations = resp.responseList;
            this.total = resp.exteraInformation;
          }
        },
        (err) => {
          console.error('get error: ', err);
        }
      );
  }
  onSearchChangeEvent(event: any)
  {
    //this.documentNumber=event.target.value;
    this.search(1,10);
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
}
