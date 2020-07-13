import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { AuthService } from 'src/app/gym-firebase/services/auth.service';
import { Router } from '@angular/router';
import * as fromActions from './user-personal.actions';
import * as fromSelectors from './user-personal.selectors';
import { switchMap, map, take, catchError, tap, filter } from 'rxjs/operators';
import { PassService } from 'src/app/gym-firebase/services/pass.service';
import * as fromUser from '../user';
import { select, Store } from '@ngrx/store';
import { UserPersonalService } from 'src/app/gym-firebase/services/user-personal.service';

@Injectable()
export class UserPersonalEffects {

    public getAllUserGroups$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromActions.getUserPersonalRequest),
            switchMap(() =>
                this.store$.pipe(
                    select(fromUser.selectUserID),
                    filter((uid) => !!uid),
                    take(1),
                    map((uid) => ({userID: uid})),
                )
            ),
            switchMap(({userID}) => this.userPersonalService.getUserPersonals(userID).pipe(
                map((response) => {
                    return fromActions.getUserPersonalSuccess({userPersonals: response[0]})
                })
            ))
    ));

    public setTrainer$ = createEffect(() => 
        this.actions$.pipe(
            ofType(fromActions.setTrainer),
            switchMap(({trainerID}) =>
                this.store$.pipe(
                    select(fromUser.selectUserID),
                    take(1),
                    map((uid) => this.userPersonalService.setTrainer(uid, trainerID))
                )
            ),
        ), {dispatch: false}
    );

    constructor(
        private actions$: Actions,
        private store$: Store,
        private router: Router,
        private authService: AuthService,
        private userPersonalService: UserPersonalService
    ) {

    }
}