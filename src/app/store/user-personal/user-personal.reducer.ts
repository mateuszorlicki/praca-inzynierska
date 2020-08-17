
import * as userPersonalActions from './user-personal.actions';
import * as userActions from '../user/user.actions';

import { createReducer, Action, on, createFeatureSelector, Store } from '@ngrx/store';
import { UserPersonal } from 'src/app/shared/models/user.models';

export interface State {
    userPersonals: UserPersonal;
}
export const userPersonalFeatureKey = 'user-personal';

export const initialState: State = {
    userPersonals: null,
}

const userPersonalReducer = createReducer(
    initialState,
    on(userPersonalActions.getUserPersonalSuccess, (state, { userPersonals }) => {
        return {
            ...state,
            userPersonals
        }
    }),
    on(userActions.userLoggedOut, (state) => ({
        ...initialState
    }))
);

export function reducer(state: State | undefined, action: Action) {
    return userPersonalReducer(state, action);
}

export const getUserPersonalState = createFeatureSelector<State>('user-personal');


export const getUserPersonals = (state: State) => state.userPersonals;
