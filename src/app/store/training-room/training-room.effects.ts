import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as fromActions from './training-room.actions';
import { switchMap, map, take, catchError, tap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { TrainingRoomService } from 'src/app/gym-firebase/services/training-room.service';

@Injectable()
export class TrainingRoomEffects {

    public getAllTrainingRoomsRequest$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromActions.getAllTrainingRoomsRequest),
            switchMap(() => this.trainingRoomService.getAllTrainingRooms().pipe(
                map((response) => {
                    return fromActions.getAllTrainingRoomsSuccess({trainingRooms: response})
                })
            ))
    ));

    public saveTrainingRoom$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromActions.saveTrainingRoom),
            map(({trainingRoom}) =>this.trainingRoomService.saveTrainingRoom(trainingRoom))
        ), { dispatch: false}
    );

    public deleteTrainingRoom$ = createEffect(() =>
    this.actions$.pipe(
        ofType(fromActions.deleteTrainingRoom),
        map(({trainingRoom}) =>this.trainingRoomService.deleteTrainingRoom(trainingRoom))
    ), { dispatch: false}
);

    constructor(
        private actions$: Actions,
        private store$: Store,
        private trainingRoomService: TrainingRoomService
    ) {

    }
}