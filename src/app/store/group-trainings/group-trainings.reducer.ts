
import * as passActions from './group-trainings.actions';
import * as userActions from '../user/user.actions';

import { createReducer, Action, on, createFeatureSelector, Store } from '@ngrx/store';
import { UserPass } from 'src/app/shared/models/pass.model';
import { GroupTraining, GroupTrainingEvent } from 'src/app/shared/models/group-training.model';

export interface State {
    groupTrainings: Array<GroupTraining>;
    groupTrainingEvents: Array<GroupTrainingEvent>;
}
export const groupTrainingsFeatureKey = 'group-trainings';

export const initialState: State = {
    groupTrainings: [],
    groupTrainingEvents: [],
}

const groupTrainingReducer = createReducer(
    initialState,
    on(passActions.getAllGroupTrainingsSuccess, (state, { groupTrainings }) => ({
        ...state,
        groupTrainings
    })),
    on(passActions.getAllGroupTrainingEventSuccess, (state, { groupTrainingEvents }) => ({
        ...state,
        groupTrainingEvents
    })),
    on(userActions.userLoggedOut, (state) => ({
        ...initialState
    }))
);

export function reducer(state: State | undefined, action: Action) {
    return groupTrainingReducer(state, action);
}

export const getGroupTrainingState = createFeatureSelector<State>('group-trainings');


export const getAllGroupTrainings = (state: State) => state.groupTrainings;
export const getAllGroupTrainingEvents = (state: State) => state.groupTrainingEvents;