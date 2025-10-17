import { NgModule } from '@angular/core';

import { dashboardRoutingModule } from './dashboard-routing.module';

import { dashboardComponent } from './dashboard.component';


@NgModule({
  imports: [dashboardRoutingModule],
  declarations: [dashboardComponent],
  exports: [dashboardComponent]
})
export class dashboardModule { }
