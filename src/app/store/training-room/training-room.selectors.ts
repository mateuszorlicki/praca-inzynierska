import { createSelector } from '@ngrx/store';
import * as fromReducer from './training-room.reducer';

export const selectAllTrainingRooms = createSelector(
    fromReducer.getTrainingRoomState,
    fromReducer.getAllTrainingRooms
);

export const selectSingleTrainingRoom = createSelector(
    fromReducer.getTrainingRoomState,
    (state, props) => state.trainingRooms.find(r => r.roomID === props.id)
)