
import * as passActions from './training-room.actions';
import * as userActions from '../user/user.actions';

import { createReducer, Action, on, createFeatureSelector, Store } from '@ngrx/store';
import { TrainingRoom } from 'src/app/shared/models/training-room.model';

export interface State {
    trainingRooms: Array<TrainingRoom>;
}
export const trainingRoomFeatureKey = 'training-room';

export const initialState: State = {
    trainingRooms: [],
}

const trainingRoomReducer = createReducer(
    initialState,
    on(passActions.getAllTrainingRoomsSuccess, (state, { trainingRooms }) => ({
        ...state,
        trainingRooms
    })),
    on(userActions.userLoggedOut, (state) => ({
        ...initialState
    }))
);

export function reducer(state: State | undefined, action: Action) {
    return trainingRoomReducer(state, action);
}

export const getTrainingRoomState = createFeatureSelector<State>('training-room');


export const getAllTrainingRooms = (state: State) => state.trainingRooms;
