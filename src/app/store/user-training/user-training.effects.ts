import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { AuthService } from 'src/app/gym-firebase/services/auth.service';
import { Router } from '@angular/router';
import * as fromActions from './user-training.actions';
import * as fromSelectors from './user-training.selectors';
import { switchMap, map, take, catchError, tap, filter } from 'rxjs/operators';
import { PassService } from 'src/app/gym-firebase/services/pass.service';
import * as fromUser from '../user';
import { select, Store } from '@ngrx/store';
import { UserTrainingsService } from 'src/app/gym-firebase/services/user-training.service';

@Injectable()
export class UserTrainingEffects {

    public getAllUserGroups$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromActions.getUserGroupsRequest),
            switchMap(() =>
                this.store$.pipe(
                    select(fromUser.selectUserID),
                    filter((uid) => !!uid),
                    take(1),
                    map((uid) => ({userID: uid})),
                )
            ),
            switchMap(({userID}) => this.userTrainingService.getUserGroups(userID).pipe(
                map((response) => {
                    return fromActions.getUserGroupsSuccess({userTrainings: response[0]})
                })
            ))
    ));

    public createUserGroupIfNotExist$ = createEffect(() =>
                this.actions$.pipe(
                    ofType(fromActions.createUserGroupIfNotExist),
                    switchMap(() =>
                        this.store$.pipe(
                            select(fromUser.selectUserID),
                            take(1),
                            // map((uid) => this.userTrainingService.createEmptyUserGroup(uid))
                        )
                    ),
                ), {dispatch: false}
    );

    public signGroup$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromActions.signGroup),
                switchMap(({trainingID}) =>
                this.store$.pipe(
                    select(fromUser.selectUserID),
                    take(1),
                    map((uid) => ({userID: uid, trainingID}))
                )
            ),
            switchMap(({userID, trainingID}) =>
                this.store$.pipe(
                    select(fromSelectors.selectUserTrainings),
                    take(1),
                    map((userTraining) => this.userTrainingService.signGroup(userID, userTraining, trainingID))
                )
            ),
        ), { dispatch: false}
    );

    constructor(
        private actions$: Actions,
        private store$: Store,
        private router: Router,
        private authService: AuthService,
        private userTrainingService: UserTrainingsService
    ) {

    }
}