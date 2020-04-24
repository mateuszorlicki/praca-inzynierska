import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { AuthService } from 'src/app/gym-firebase/services/auth.service';
import { Router } from '@angular/router';
import * as fromActions from './pass.actions';
import { switchMap, map } from 'rxjs/operators';
import { PassService } from 'src/app/gym-firebase/services/pass.service';

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



    constructor(
        private actions$: Actions,
        private router: Router,
        private authService: AuthService,
        private passService: PassService
    ) {

    }
}