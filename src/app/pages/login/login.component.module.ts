import { NgModule } from '@angular/core';
import { LoginRoutingModule } from './login.component.routing';
import { LoginComponent } from './login.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  imports: [
    LoginRoutingModule,
    SharedModule.forRoot()
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule { }
