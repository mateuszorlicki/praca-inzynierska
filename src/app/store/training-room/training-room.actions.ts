import { createAction, props } from '@ngrx/store';
import { TrainingRoom } from 'src/app/shared/models/training-room.model';

export const getAllTrainingRoomsRequest = createAction(
    '[TRAINING-ROOM] Get all Request'
);

export const getAllTrainingRoomsSuccess = createAction(
    '[TRAINING-ROOM] Get all Success',
    props<{trainingRooms: Array<TrainingRoom>}>()
);

export const getAllTrainingRoomsFailure = createAction(
    '[TRAINING-ROOM] Get all Failure'
);

export const saveTrainingRoom = createAction(
    '[TRAINING-ROOM] Save request',
    props<{trainingRoom: TrainingRoom}>()
)