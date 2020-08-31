import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromUsers from './store/users';
import * as fromUser from './store/user';

import * as fromPass from './store/pass';
import * as fromTrainingRoom from './store/training-room';
import * as fromGroupTrainings from './store/group-trainings';
import * as fromUserGroups from './store/user-training';
import * as fromUserPersonal from './store/user-personal';
import * as fromPersonalTraining from './store/personal-trainings';

import { take, map, filter, first, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'gym';

  constructor(
    private store$: Store,
  ) {
    this.store$.pipe(
      select(fromUser.selectIsLoggedIn)
    ).subscribe(isLogged => {
      if(isLogged) {
        this.store$.dispatch(fromUsers.getAllUsersRequest());
        this.store$.dispatch(fromPass.getAllPassesRequest());
        this.store$.dispatch(fromTrainingRoom.getAllTrainingRoomsRequest());
        this.store$.dispatch(fromGroupTrainings.getAllGroupTrainingsRequest());
        this.store$.dispatch(fromGroupTrainings.getAllGroupTrainingEventRequest());
        this.store$.dispatch(fromUserGroups.getUserGroupsRequest());
        this.store$.dispatch(fromUserPersonal.getUserPersonalRequest());
        this.store$.dispatch(fromPersonalTraining.getAllPersonalTrainingEventRequest());
      }
      if (!isLogged) {
        this.store$.dispatch(fromUsers.getAllUsersRequest());
        this.store$.dispatch(fromPass.getAllPassesRequest());
        this.store$.dispatch(fromGroupTrainings.getAllGroupTrainingEventRequest());
      }
    })
  }
}
