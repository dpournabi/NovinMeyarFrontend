import { NgModule, ModuleWithProviders } from '@angular/core';
import { InternalStorage, AppStorage } from '../storage/storage.swaps';
import { CookieBrowser } from '../storage/cookie.browser';
import { StorageBrowser } from '../storage/storage.browser';
import { JSONSearchParams } from './core/search.params';
import { ErrorHandler } from './core/error.service';
import { SignalRService } from './core/signalR.service';
import { AuthService } from './core/auth.service';
import { UserManagmentService } from './core/userManagentService';
import { PermissionGuard } from '../Ng2Permission/permission.guard';
import { Ng2PermissionService } from '../Ng2Permission/permission.service';
import { ReloadPermissionService } from '../Ng2Permission/reloadPermission.service';
import { BaseSyncService } from './core/basesync.service';
import { PermissionHelper } from '../Ng2Permission/permission-helper.service';
import { PermissionService } from './custom/permission.service';
import { TableUtil, LayoutsService, GlobalService, RoutingService, UserService, 
  ProfileService, DashboardService, RoleService, PersianCalendarService } from '../services/custom';
import { UtilitiesService } from './core/utilities.service';
import { BaseInfoService } from './custom/base-info/base-info.service';

@NgModule({
  providers: [ErrorHandler]
})
export class ApiModule {
  static forRoot(
    internalStorageProvider: any = {
      provide: InternalStorage,
      useClass: CookieBrowser
    }
  ): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        JSONSearchParams,
        RoutingService,
        ErrorHandler,
        SignalRService,
        AuthService,
        PermissionGuard,
        Ng2PermissionService,
        ReloadPermissionService,
        BaseSyncService,
        PermissionHelper,
        PermissionService,
        GlobalService,
        DashboardService,
        TableUtil,
        UserService,
        ProfileService,
        LayoutsService,
        RoleService,
        UtilitiesService,
        PersianCalendarService,
        UserManagmentService,
        BaseInfoService,
        {
          provide: AppStorage,
          useClass: StorageBrowser
        }
      ]
    };
  }
}
