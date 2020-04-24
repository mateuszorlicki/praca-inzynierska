
import * as passActions from './pass.actions';
import { createReducer, Action, on, createFeatureSelector, Store } from '@ngrx/store';
import { UserProfile } from 'src/app/shared/models/user.models';
import { Pass } from 'src/app/shared/models/pass.model';

export interface State {
    passes: Array<Pass>;
}
export const passFeatureKey = 'pass';

export const initialState: State = {
    passes: [],
}

const passReducer = createReducer(
    initialState,
    on(passActions.getAllPassesSuccess, (state, { passes }) => ({
        ...state,
        passes
    })),
);

export function reducer(state: State | undefined, action: Action) {
    return passReducer(state, action);
}

export const getPassState = createFeatureSelector<State>('pass');


export const getAllPasses = (state: State) => state.passes;

