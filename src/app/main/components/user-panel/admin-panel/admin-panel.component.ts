import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromUsers from '../../../../store/users'
import { Observable } from 'rxjs';
import { UserProfile, Roles } from 'src/app/shared/models/user.models';
import * as fromUser from '../../../../store/user';
@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  color

  trainerUsers$: Observable<Array<UserProfile>>;
  noTrainerUsers$: Observable<Array<UserProfile>>;
  adminUsers$: Observable<Array<UserProfile>>;
  noAdminUsers$: Observable<Array<UserProfile>>;

  Roles = Roles;
  constructor(
    private store$: Store<fromUsers.State>
  ) { }

  addRole(user: UserProfile, role: Roles) {
    const data: UserProfile = {
      roles: [...user.roles, role]
    }
    this.store$.dispatch(fromUsers.updateUser({ uid: user.uid, user: data}))
  }

  removeRole(user: UserProfile, role: Roles) {
    const data: UserProfile = {
      roles: user.roles.filter(r => r !== role)
    }
    this.store$.dispatch(fromUsers.updateUser({ uid: user.uid, user: data}))
  }

  ngOnInit(): void {

    this.trainerUsers$ = this.store$.pipe(select(fromUsers.selectAllTrainers));
    this.noTrainerUsers$ = this.store$.pipe(select(fromUsers.selectAllNotTrainers));

    this.adminUsers$ = this.store$.pipe(select(fromUsers.selectAllAdmins));
    this.noAdminUsers$ = this.store$.pipe(select(fromUsers.selectAllNotAdmins));

  }

}
