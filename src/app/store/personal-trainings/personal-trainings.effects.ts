import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as fromActions from './personal-trainings.actions';
import * as fromUsers from '../users';
import * as fromUser from '../user';
import { switchMap, map, take, catchError } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { PersonalTrainingService } from 'src/app/gym-firebase/services/personal-trainings.service';
import { Roles } from 'src/app/shared/models/user.models';
import { PersonalTrainingEvent } from 'src/app/shared/models/personal-training.model';

@Injectable()
export class PersonalTrainingEffects {

    // public getAllPersonalTrainingsRequest$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(fromActions.getAllPersonalTrainingsRequest),
    //         switchMap(() => this.personalTrainingService.getAllPersonalTrainings().pipe(
    //             map((response) => {
    //                 return fromActions.getAllPersonalTrainingsSuccess({personalTrainings: response})
    //             })
    //         ))
    // ));

    public getAllPersonalTrainingEventsRequest$ = createEffect(() =>
    this.actions$.pipe(
        ofType(fromActions.getAllPersonalTrainingEventRequest),
        switchMap(() => 
            this.store$.pipe(
                select(fromUser.selectUserID),
                map((userID) => ({userID}))
            )
        ),
        switchMap(({userID}) => 
            this.store$.pipe(
                select(fromUser.selectUserRoles),
                map((roles) => ({userID, isTrainer: roles.includes(Roles.TRAINER)}))
            )
        ),
        switchMap(({userID, isTrainer}) => this.personalTrainingService.getAllPersonalTrainingEvents(userID, isTrainer).pipe(
            map((response) => {
                return fromActions.getAllPersonalTrainingEventSuccess({personalTrainingEvents: response})
            })
        ))
    ));

    public savePersonalTrainingEvent$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromActions.savePersonalTrainingEvent),
            map(({personalTrainingEvent}) => this.personalTrainingService.savePersonalTrainingEvent(personalTrainingEvent))
        ), { dispatch: false}
    );

    public askForTraining$ = createEffect(() =>
        this.actions$.pipe(
                ofType(fromActions.askForTraining),
                switchMap(({personalTrainingEvent}) => 
                    this.store$.pipe(
                        select(fromUsers.selectSingleUser(personalTrainingEvent.userID)),
                        map((user) => ({personalTrainingEvent, userName: user.displayName}))
                    )
                ),
                switchMap(({personalTrainingEvent, userName}) =>
                    this.store$.pipe(
                        select(fromUsers.selectSingleUser(personalTrainingEvent.trainerID)),
                        map((user) => ({event: personalTrainingEvent, userName, trainerName: user.displayName}))
                    )
                ),
                map(({event, userName, trainerName}) => {
                    let personalTrainingEvent: PersonalTrainingEvent = {
                        ...event,
                        titleForTrainer: `Trening personalny - ${userName}`,
                        titleForUser: `Trening personalny - ${trainerName}`,
                    }
                    this.personalTrainingService.savePersonalTrainingEvent(personalTrainingEvent)
                })
    ), {dispatch: false});

    public acceptTraining$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromActions.acceptTraining),
            map(({personalTrainingEvent}) => this.personalTrainingService.savePersonalTrainingEvent(personalTrainingEvent))
        ), { dispatch: false}
    );

    public declineTraining$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromActions.declineTraining),
            map(({personalTrainingEvent}) => this.personalTrainingService.declineTraining(personalTrainingEvent))
        ), { dispatch: false}
    );

    // public savePersonalTraining$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(fromActions.savePersonalTraining),
    //         map(({personalTraining}) =>this.personalTrainingService.savePersonalTraining(personalTraining))
    //     ), { dispatch: false}
    // );

    constructor(
        private actions$: Actions,
        private store$: Store,
        private personalTrainingService: PersonalTrainingService
    ) {

    }
}