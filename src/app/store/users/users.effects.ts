import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { UserService } from 'src/app/gym-firebase/services/user.service';
import { AuthService } from 'src/app/gym-firebase/services/auth.service';
import { Router } from '@angular/router';
import * as fromActions from './users.actions';
import { switchMap, map } from 'rxjs/operators';

@Injectable()
export class UsersEffects {

    public getAllUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromActions.getAllUsersRequest),
            switchMap(() => this.userService.getAllUsers().pipe(
                map((response) => {
                    return fromActions.getAllUsersSuccess({users: response})
                })
            ))
    ));

    public updateUser$ = createEffect(() =>
    this.actions$.pipe(
        ofType(fromActions.updateUser),
        switchMap(({uid, user}) => this.userService.updateProfile(uid, user).pipe())
), { dispatch: false});

    constructor(
        private actions$: Actions,
        private router: Router,
        private authService: AuthService,
        private userService: UserService
    ) {

    }
}