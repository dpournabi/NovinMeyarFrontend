import { Component, OnInit } from '@angular/core';
import { PermissionService } from 'src/app/shared/services/custom/permission.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'user-permissions',
  templateUrl: 'user-permissions.component.html',
})
export class UserPermissionsComponent implements OnInit {
  accessTypeList: Array<any> = [];
  accessTypeOptions: Array<any> = [];
  accessType: string = 'ROLE';
  accessLevel: string = '';
  roleOrUsername: string = '';
  disablePagination = true;
  accessLevelList: Array<any> = [];
  accessListOptions: Array<any> = [];

  workingAccessLevels: Array<any> = [];

  constructor(
    private permissionService: PermissionService,
    private messageService: NzMessageService
  ) {
    this.loadRoles();
  }

  ngOnInit() {
    this.onSubsystemChange('Technical');
  }

  onAccessTypeInput(e) {
    let value = e.target.value;

    if (this.accessType == 'ROLE') {
      this.accessTypeOptions = this.accessTypeList.filter(
        (x) => x.roleName.toLowerCase().indexOf(value) > -1
      );
    } else {
      this.accessTypeOptions = this.accessTypeList.filter(
        (x) => x.userName.toLowerCase().indexOf(value) > -1
      );
    }
  }

  onAccessLevelInput(e) {
    let value = e.target.value;

    this.accessListOptions = this.accessLevelList.filter(
      (x) => x.toLowerCase().indexOf(value) > -1
    );
  }

  onAccessLevelChange(e) {
    if (e.isUserInput) {
      console.log('access level: ', e);
      this.roleOrUsername = e.source.nzValue;
      this.loadAccessLevelList(e.source.nzValue);
    }
  }

  changeAccessType(type: string) {
    this.accessType = type;

    if (type == 'ROLE') {
      this.loadRoles();
    } else {
      this.loadUsers();
    }
  }

  loadRoles() {
    this.permissionService.getRoles().subscribe(
      (roles) => {
        this.accessTypeList = roles.responseList;
        this.accessTypeOptions = [...this.accessTypeList];
      },
      (err) => {
        console.error('error: ', err);
      }
    );
  }

  addPermission(): void {
    this.permissionService
      .addPermission({
        usernameOrRolename: this.roleOrUsername,
        newClaimRequest: {
          accessType: this.accessType,
          claimType: 'Permission',
          claimValue: this.accessLevel,
        },
      })
      .subscribe(
        (res) => {
          if (res.succeed) {
            this.messageService.success(res.message);
            this.accessLevel = '';
            return;
          }
          this.messageService.error(res.message);
        },
        (err) => {
          console.error('error: ', err);
          this.messageService.error(err);
        }
      );
  }

  removePermission(data) {
    this.permissionService.removePermission(data).subscribe(
      (res) => {
        if (res.succeed) {
          this.messageService.success(res.message);
          return;
        }
        this.messageService.error(res.message);
      },
      (err) => {
        console.error('error: ', err);
        this.messageService.error(err);
      }
    );
  }

  loadUsers() {
    this.permissionService.getUsers().subscribe(
      (users) => {
        this.accessTypeList = users.responseList;
        this.accessTypeOptions = [...this.accessTypeList];
      },
      (err) => {
        console.error('error: ', err);
      }
    );
  }

  onSubsystemChange(subsystemName) {
    this.accessLevelList = [];
    this.accessListOptions = [];
    this.permissionService.getAccessLevels(subsystemName).subscribe(
      (resp) => {
        this.accessLevelList = resp;
        this.accessListOptions = [...this.accessLevelList];
      },
      (err) => {
        console.error('error: ', err);
      }
    );
  }

  loadAccessLevelList(accessLevelName) {
    if (this.accessType == 'ROLE') {
      this.permissionService.loadAccessLevels('', accessLevelName).subscribe(
        (resp) => {
          this.workingAccessLevels = resp;
        },
        (err) => {
          console.error('error: ', err);
        }
      );
    } else {
      this.permissionService.loadAccessLevels(accessLevelName, '').subscribe(
        (resp) => {
          this.workingAccessLevels = resp;
        },
        (err) => {
          console.error('error: ', err);
        }
      );
    }
  }
}
