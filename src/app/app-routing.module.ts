import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { PageNotFoundComponent } from './layouts/page-not-found/page-not-found.component';
import { PanelLayoutComponent } from './layouts/panel-layout/panel-layout.component';
import { FastRegisterComponent } from './pages/fast-registration/fast-registration.component';
import { BaseInfoComponent } from './pages/base-info/base-info.component';
import { IPermissionGuardModel } from './shared/Ng2Permission/permission-guard.model';
import { PermissionGuard } from './shared/Ng2Permission/permission.guard';
import { FastRegistrationListComponent } from './pages/fast-registration/fast-registration-list.component';
import { InspectionComponent } from './pages/inspection/inspection.component';
import { CONFIRM_ADMIN, GET_INSTALLATION_USER_RESOLVER } from './shared/Resolvers/resolvers';
import { ChangePasswordComponent } from './pages/users/change-password/change-password.component';
import { UserManagementComponent } from './pages/users/user-management/user-management.component';
import { DisplayInvoiceComponent } from './pages/invoice/display-invoice/display-invoice.component'
import { PaybackComponent } from './pages/invoice/payback/payback.component';
import { WorkflowComponent } from './pages/workflow/workflow.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login'
  },
  {path:'payback',
      component:PaybackComponent},
  {
    path: '',
    component: LoginLayoutComponent,
    
    children: [
      {
        path: 'login',
        loadChildren: () => import('./pages/login/login.component.module').then(m => m.LoginModule)
      }
    ]
  },
  {
    path: '',
    component: PanelLayoutComponent,
    canActivate: [PermissionGuard],
    resolve:[GET_INSTALLATION_USER_RESOLVER],
    data: {
      Permission: {
        //Only: ['Administrator', 'Technical Manager', 'Technical Expert', 'Branch Manager'],
        RedirectTo: '/login'
      } as IPermissionGuardModel 

     
    },
    children: [
      {
        path: 'dashboard',
        // resolve :[CONFIRM_ADMIN],
        loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.dashboardModule),
      
      },
      {
        path: 'fast-reg',
        component: FastRegisterComponent
      },
      {
          path: 'change-password',
          component: ChangePasswordComponent
      },
      {
        path: 'user-management',
        component: UserManagementComponent
      },
      {
        path: 'fast-reg/:id',
        component: FastRegisterComponent
      },
      {
        path: 'fast-reg-list',
        component: FastRegistrationListComponent
      },
      {
        path: 'fast-reg-list/:id',
        component: FastRegistrationListComponent
      },
      {
        path: 'workflow',
        component: WorkflowComponent
      },
      {
        path: 'display-invoice/:id',
        component: DisplayInvoiceComponent,
        canActivate: [],
      },
      
      {
        path: 'base-info',
        component: BaseInfoComponent
      },
      {
        path: 'users',
        loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule),
        data :{ id:'1', name:"Angular"}
      },
      {
        path: 'complete-registration',
        loadChildren: () => import('./pages/complete-registration/complete-registration.module').then(m => m.CompleteRegistrationModule)
      },
      {
        path: 'inspection/:id',
        component: InspectionComponent
      },
      {
        path: 'permissions',
        loadChildren: () => import('./pages/security/permissions.module').then(m => m.PermissionsModule)
      }
    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
