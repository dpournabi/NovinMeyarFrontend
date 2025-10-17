import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IconsProviderModule } from './components/icons-provider/icons-provider.module';
import { registerLocaleData } from '@angular/common';
import { AntDesignModule } from './components/ant-design/ant-design.module';
import fa from '@angular/common/locales/fa';
import { DpDatePickerModule } from 'ng2-jalali-date-picker';
import { HighchartsChartModule } from 'highcharts-angular';
import { JustNumberValidator } from './directives/validators.directive';
import { FocusSelect } from './directives/select-text.directive';
import { ExceptPermissionDirective } from './Ng2Permission/except-permission.directive';
import { HasPermissionDirective } from './Ng2Permission/has-permission.directive';


const IMPORTS = [
  AntDesignModule,
  CommonModule,
  ReactiveFormsModule,
  HttpClientModule,
  IconsProviderModule,
  FormsModule,
  DpDatePickerModule,
  HighchartsChartModule
];


const EXPORT = [
  AntDesignModule,
  FormsModule,
  CommonModule,
  ReactiveFormsModule,
  HttpClientModule,
  IconsProviderModule,
  DpDatePickerModule,
  HighchartsChartModule,
  HasPermissionDirective
];

registerLocaleData(fa);

@NgModule({
    imports: IMPORTS,
    declarations: [JustNumberValidator, FocusSelect, ExceptPermissionDirective, HasPermissionDirective],
    exports: EXPORT,
    providers: []
})

export class SharedModule {
  public static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: SharedModule,
    };
  }
}
