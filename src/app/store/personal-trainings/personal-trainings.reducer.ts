
import * as personalActions from './personal-trainings.actions';
import * as userActions from '../user/user.actions';

import { createReducer, Action, on, createFeatureSelector, Store } from '@ngrx/store';
import { PersonalTrainingEvent } from 'src/app/shared/models/personal-training.model';

export interface State {
    personalTrainingEvents: Array<PersonalTrainingEvent>;
}
export const personalTrainingsFeatureKey = 'personal-trainings';

export const initialState: State = {
    personalTrainingEvents: [],
}

const personalTrainingReducer = createReducer(
    initialState,
    on(personalActions.getAllPersonalTrainingEventSuccess, (state, { personalTrainingEvents }) => {
        return {
            ...state,
            personalTrainingEvents
        }
    }
),
on(userActions.userLoggedOut, (state) => ({
    ...initialState
}))
);

export function reducer(state: State | undefined, action: Action) {
    return personalTrainingReducer(state, action);
}

export const getPersonalTrainingState = createFeatureSelector<State>('personal-trainings');


export const getAllPersonalTrainingEvents = (state: State) => state.personalTrainingEvents;