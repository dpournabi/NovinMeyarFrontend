import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { fa_IR } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import fa from '@angular/common/locales/fa';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { FastRegisterComponent } from './pages/fast-registration/fast-registration.component';
import { SharedModule } from './shared/shared.module';
import { UsersModule } from './pages/users/users.module';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { ApiModule } from './shared/services/api.module';
import { PageNotFoundComponent } from './layouts/page-not-found/page-not-found.component';
import { PanelLayoutComponent } from './layouts/panel-layout/panel-layout.component';
import { BaseInfoComponent } from './pages/base-info/base-info.component';
import { PropertyComponent } from './pages/base-info/property.component';
import { NgxSignaturePadModule } from '@eve-sama/ngx-signature-pad';
import { FastRegistrationListComponent } from './pages/fast-registration/fast-registration-list.component';
import { InspectionComponent } from './pages/inspection/inspection.component';
import { PermissionsModule } from './pages/security/permissions.module';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { RouterModule } from '@angular/router';
import { DisplayInvoiceComponent } from './pages/invoice/display-invoice/display-invoice.component';
import { PaybackComponent } from './pages/invoice/payback/payback.component';
import { WorkflowComponent } from './pages/workflow/workflow.component';
import { PaymentLinkModalComponent } from './pages/inspection/payment-link-modal/payment-link-modal.component';
registerLocaleData(fa);

@NgModule({
  declarations: [
    AppComponent,
    LoginLayoutComponent,
    FastRegisterComponent,
    FastRegistrationListComponent,
    PageNotFoundComponent,
    PanelLayoutComponent,
    BaseInfoComponent,
    PropertyComponent,
    InspectionComponent,
    DisplayInvoiceComponent,
    PaybackComponent,
    WorkflowComponent,
    PaymentLinkModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    ApiModule.forRoot(),
    SharedModule.forRoot(),
    UsersModule,
    PermissionsModule,
    NgxSignaturePadModule,
    NzIconModule,
    NzBreadCrumbModule,
    RouterModule
  ],
  providers: [{ provide: NZ_I18N, useValue: fa_IR }],
  bootstrap: [AppComponent]
})
export class AppModule { }
