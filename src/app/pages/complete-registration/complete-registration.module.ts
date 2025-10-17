import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadService } from 'src/app/shared/services/core/upload.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { CompleteRegistrationTabsComponent } from './complete-registration-tabs.component';
import { HeaderInfoComponent } from './header-info.component';
import { DoorsCobinsComponent } from './sub-components/doors-cobins.component';
import { MotealeghatComponent } from './sub-components/motealeghat.component';
import { NirooMoharekeComponent } from './sub-components/niroo-mohareke.component';
import { OtherComponent } from './sub-components/other.component';
import { SafetyComponent } from './sub-components/safety.component';
import { TechnicalInfoComponent } from './sub-components/technical-info.component';

const routes: Routes = [
    {
        path: 'tabs',
        component: CompleteRegistrationTabsComponent
    }
];

@NgModule({
    imports: [
        SharedModule.forRoot(),
        RouterModule.forChild(routes)
    ],
    exports: [],
    declarations: [CompleteRegistrationTabsComponent, TechnicalInfoComponent, MotealeghatComponent, SafetyComponent, NirooMoharekeComponent
        , DoorsCobinsComponent, HeaderInfoComponent, OtherComponent],
    providers: [UploadService],
})
export class CompleteRegistrationModule { }
