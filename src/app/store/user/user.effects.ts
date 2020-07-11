import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as fromActions from './user.actions';
import * as fromPass from '../pass/pass.actions';
import { switchMap, map, tap, catchError, take, withLatestFrom } from 'rxjs/operators';
import { State } from './user.reducer';
import { Store, select } from '@ngrx/store';
import { GUEST_USER, UserProfile, Roles } from 'src/app/shared/models/user.models';
import { UserService } from 'src/app/gym-firebase/services/user.service';
import { AuthService } from 'src/app/gym-firebase/services/auth.service';
import { Router } from '@angular/router';
@Injectable()
export class UserEffects {

    public authStateChanged$ = createEffect(() =>
        this.authService.authState$.pipe(
            map((user) => {
                if (user && user.uid) {
                    return fromActions.getProfileRequest({ uid: user.uid});
                } else {
                    return fromActions.userLoggedOut();
                }
            })
        ), { dispatch: true}
    );

    public userLogInWithGoogle$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromActions.userLogInWithGoogle),
            switchMap(() => this.authService.loginWithGoogle().pipe(
                map(response => 
                {
                    if (response.additionalUserInfo.isNewUser) {
                        const newUser: UserProfile = {
                            uid: response.user.uid,
                            displayName: response.user.displayName,
                            firstName: response.user.displayName.split(' ')[0],
                            lastName: response.user.displayName.split(' ')[1],
                            email: response.user.email,
                            photoURL: 'https://cdn1.iconfinder.com/data/icons/sport-avatar-6/64/29-avatar-fitness-weightlifter-weightlifting-gymnast-sports-gym-512.png',
                            roles: [Roles.USER]
                        }
                        return fromActions.updateProfile({uid: response.user.uid, user: newUser})
                    } else {
                        return fromActions.getProfileRequest({uid: response.user.uid})
                    }
                }),
                tap(() => { this.router.navigate(['']) })
            ))
        )
    );

    public userLogInWithEmail$ = createEffect(() =>
         this.actions$.pipe(
            ofType(fromActions.userLogInWithEmail),
            switchMap(({credentials, newUser}) => this.authService.loginWithEmailAndPassword(credentials).pipe(
                map((response) => {
                    if (newUser) {
                        return fromActions.updateProfile({uid: response.user.uid, user: newUser});
                    } else {
                        return fromActions.getProfileRequest({uid: response.user.uid})
                    }
                }),
                tap(() => { this.router.navigate(['']) })
            ))
        )
    );

    public updateProfile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromActions.updateProfile),
            switchMap(({uid, user}) => this.userService.updateProfile(uid, user).pipe(
                map(() => fromActions.getProfileRequest({uid}))
            ))
    ));

    public userRegisterWithEmail$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromActions.userRegisterWithEmail),
            switchMap(({credentials, displayName}) => this.authService.reqisterWithEmailAndPassword(credentials).pipe(
                map(response => {
                    const newUser: UserProfile = {
                        uid: response.user.uid,
                        displayName: displayName,
                        firstName: displayName.split(' ')[0],
                        lastName: displayName.split(' ')[1],
                        email: response.user.email,
                        photoURL: 'https://cdn1.iconfinder.com/data/icons/sport-avatar-6/64/29-avatar-fitness-weightlifter-weightlifting-gymnast-sports-gym-512.png',
                        roles: [Roles.USER]
                    }
                    return fromActions.userLogInWithEmail({credentials: credentials, newUser})
                })
            ))
        )
    );

    public getProfileRequest$ = createEffect(() => 
        this.actions$.pipe(
                ofType(fromActions.getProfileRequest),
                switchMap(({uid}) => this.userService.getUser(uid).pipe(
                    map((response) => {
                            return fromActions.getProfileSuccess({user: response})
                        }
                    ),
                    catchError((error) => fromActions.getProfileError)
                ))
    ));

    public getProfileSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromActions.getProfileSuccess),
            map((user) => fromPass.getUserPassesRequest({userID: user.user.uid}))
        )
    );
                
    public userLogOut$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromActions.userLogOut),
            switchMap(() => this.authService.logout().pipe(
                map(() => fromActions.userLoggedOut())
            ))
        )
    );


    constructor(
        private actions$: Actions,
        private router: Router,
        private authService: AuthService,
        private userService: UserService
    ) {

    }
}