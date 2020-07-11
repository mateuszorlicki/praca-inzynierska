import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as fromActions from './group-trainings.actions';
import { switchMap, map, take, catchError } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { GroupTrainingService } from 'src/app/gym-firebase/services/group-trainings.service';

@Injectable()
export class GroupTrainingEffects {

    public getAllGroupTrainingsRequest$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromActions.getAllGroupTrainingsRequest),
            switchMap(() => this.groupTrainingService.getAllGroupTrainings().pipe(
                map((response) => {
                    return fromActions.getAllGroupTrainingsSuccess({groupTrainings: response})
                })
            ))
    ));

    public getAllGroupTrainingEventsRequest$ = createEffect(() =>
    this.actions$.pipe(
        ofType(fromActions.getAllGroupTrainingEventRequest),
        switchMap(() => this.groupTrainingService.getAllGroupTrainingEvents().pipe(
            map((response) => {
                return fromActions.getAllGroupTrainingEventSuccess({groupTrainingEvents: response})
            })
        ))
    ));

    public saveGroupTrainingEvent$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromActions.saveGroupTrainingEvent),
            map(({groupTrainingEvent}) => this.groupTrainingService.saveGroupTrainingEvent(groupTrainingEvent))
        ), { dispatch: false}
    );

    public saveGroupTraining$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromActions.saveGroupTraining),
            map(({groupTraining}) =>this.groupTrainingService.saveGroupTraining(groupTraining))
        ), { dispatch: false}
    );

    constructor(
        private actions$: Actions,
        private store$: Store,
        private groupTrainingService: GroupTrainingService
    ) {

    }
}