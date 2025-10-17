
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { UploadService } from 'src/app/shared/services/core/upload.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddCustomerTabsComponent } from './add-customer-tabs/add-customer-tabs.component';
import { AddLegalCustomerComponent } from './add-legal-customer/add-legal-customer.component';
import { AddRealCustomerComponent } from './add-real-customer/add-real-customer.component';
import { AddSellerComponent } from './add-seller/add-seller.component';
import { LagalCustomersComponent } from './legal-customers/legal-customers.component';
import { RealCustomersComponent } from './real-customers/real-customers.component';
import { SellersComponent } from './sellers/sellers.component';
import { RegisteredClientsComponent } from './registered-clients/registered-clients.component';
import { FastRegCommentComponent } from '../fast-registration/fast-reg-comment/fast-reg-comment.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UserModalComponent } from './user-management/user-modal/user-modal.component';
import { DateHelperService } from 'ng-zorro-antd/i18n';
import { PersianDateHelperService } from 'src/app/shared/services/persian-date-helper.service';


const routes: Routes = [
    {
        path: 'legal-customers',
        component: LagalCustomersComponent
    },
    {
        path: 'real-customers',
        component: RealCustomersComponent
    },
    {
        path: 'sellers',
        component: SellersComponent
    },
    {
        path: 'profile',
        component: AddSellerComponent,
        
    },
    {
        path: 'Clients/:id',
        component: RegisteredClientsComponent
    }
]
@NgModule({
    imports: [        
        SharedModule.forRoot(),
        RouterModule.forChild(routes)
    ],
    exports: [],
    declarations: [AddCustomerTabsComponent, AddLegalCustomerComponent, AddRealCustomerComponent, AddSellerComponent, LagalCustomersComponent
        , RealCustomersComponent, SellersComponent , RegisteredClientsComponent,FastRegCommentComponent, ResetPasswordComponent, UserModalComponent],
    providers: [UploadService, PersianDateHelperService],

})
export class UsersModule { }
