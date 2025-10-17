
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserPermissionsComponent } from './permissions/user-permissions.component';
import { ChangePasswordComponent } from '../users/change-password/change-password.component';
import { UserManagementComponent } from '../users/user-management/user-management.component';

const routes: Routes = [
    {
        path: 'user-permissions',
        component: UserPermissionsComponent
    }    
]


@NgModule({
    imports: [
        SharedModule.forRoot(),
        RouterModule.forChild(routes)
    ],
    exports: [],
    declarations: [UserPermissionsComponent, ChangePasswordComponent, UserManagementComponent],
    providers: [],
})
export class PermissionsModule { }
