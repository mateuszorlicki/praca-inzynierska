
import * as userTrainingActions from './user-training.actions';
import { createReducer, Action, on, createFeatureSelector, Store } from '@ngrx/store';
import { UserTraining } from 'src/app/shared/models/user.models';

export interface State {
    userTrainings: UserTraining;
}
export const userTrainingFeatureKey = 'user-training';

export const initialState: State = {
    userTrainings: null,
}

const userTrainingReducer = createReducer(
    initialState,
    on(userTrainingActions.getUserGroupsSuccess, (state, { userTrainings }) => ({
        ...state,
        userTrainings
    })),
);

export function reducer(state: State | undefined, action: Action) {
    return userTrainingReducer(state, action);
}

export const getUserTrainingState = createFeatureSelector<State>('user-training');


export const getUserTrainings = (state: State) => state.userTrainings;
