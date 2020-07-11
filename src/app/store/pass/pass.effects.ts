import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { AuthService } from 'src/app/gym-firebase/services/auth.service';
import { Router } from '@angular/router';
import * as fromActions from './pass.actions';
import { switchMap, map, take, catchError, tap } from 'rxjs/operators';
import { PassService } from 'src/app/gym-firebase/services/pass.service';
import * as fromUser from '../user';
import { select, Store } from '@ngrx/store';

@Injectable()
export class PassEffects {

    public getAllUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromActions.getAllPassesRequest),
            switchMap(() => this.passService.getAllPasses().pipe(
                map((response) => {
                    return fromActions.getAllPassesSuccess({passes: response})
                })
            ))
    ));

    public buyPass$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromActions.buyPass),
            switchMap(({pass}) =>
                this.store$.pipe(
                    select(fromUser.selectUserID),
                    take(1),
                    map((uid) => this.passService.addPassForUser(pass, uid))
                )
            ),
        ), {dispatch: false}
    );

    public getUserPasses$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromActions.getUserPassesRequest),
            switchMap(({userID}) =>
                this.passService.getUserPasses(userID).pipe(
                    map((passes) => fromActions.getUserPassesSuccess({passes}),
                    catchError(() => fromActions.getUserPassesFailure))
                ))
        )
    );

    public savePass$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromActions.savePass),
            map(({pass}) =>this.passService.savePass(pass))
        ), { dispatch: false}
    );

    deletePass$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromActions.deletePass),
            map(({passID}) => this.passService.deletePass(passID))
        ), {dispatch: false}
    );

    constructor(
        private actions$: Actions,
        private store$: Store,
        private router: Router,
        private authService: AuthService,
        private passService: PassService
    ) {

    }
}