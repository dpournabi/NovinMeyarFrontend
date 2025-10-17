import { NgModule } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NZ_I18N, fa_IR } from 'ng-zorro-antd/i18n';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';

@NgModule({
    imports: [
    ],
    exports: [
        NzTableModule,
        NzSkeletonModule,
        NzLayoutModule,
        NzMenuModule,
        NzButtonModule,
        NzCardModule,
        NzAffixModule,
        NzTreeModule,
        NzSelectModule,
        NzSpaceModule,
        NzGridModule,
        NzDatePickerModule,
        NzRadioModule,
        NzTagModule,
        NzMessageModule,
        NzInputModule,
        NzFormModule,
        NzDividerModule,
        NzModalModule,
        NzDropDownModule,
        NzPaginationModule,
        NzPopoverModule,
        NzToolTipModule,
        NzPopconfirmModule,
        NzSpinModule,
        NzTimelineModule,
        NzProgressModule,
        NzSwitchModule,
        NzNotificationModule,
        NzTabsModule,
        NzCheckboxModule,
        NzStepsModule,
        NzUploadModule,
        NzDescriptionsModule,
        NzAvatarModule,
        NzTimePickerModule,
        NzCollapseModule,
        NzAutocompleteModule,
        NzBreadCrumbModule,
        NzStatisticModule
    ],
    providers: [
        { provide: NZ_I18N, useValue: fa_IR }
    ]
})
export class AntDesignModule { }
