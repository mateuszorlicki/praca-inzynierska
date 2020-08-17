
import * as passActions from './pass.actions';
import * as userActions from '../user/user.actions';

import { createReducer, Action, on, createFeatureSelector, Store } from '@ngrx/store';
import { UserProfile } from 'src/app/shared/models/user.models';
import { Pass, UserPass } from 'src/app/shared/models/pass.model';
import * as moment from 'moment';

export interface State {
    passes: Array<Pass>;
    userPassesCurrent: Array<UserPass>,
    userPassesPast: Array<UserPass>
}
export const passFeatureKey = 'pass';

export const initialState: State = {
    passes: [],
    userPassesCurrent: [],
    userPassesPast: [],
}

const passReducer = createReducer(
    initialState,
    on(passActions.getAllPassesSuccess, (state, { passes }) => ({
        ...state,
        passes
    })),
    on(passActions.getUserPassesSuccess, (state, { passes }) => {
        let userPassesCurrent = passes.filter(p => isCurrentPass(p));
        let userPassesPast = passes.filter(p => !isCurrentPass(p));

        return ({
            ...state,
            userPassesCurrent,
            userPassesPast
        })
    }),
    on(userActions.userLoggedOut, (state) => ({
        ...initialState
    }))
);

export function reducer(state: State | undefined, action: Action) {
    return passReducer(state, action);
}

export const getPassState = createFeatureSelector<State>('pass');


export const getAllPasses = (state: State) => state.passes;
export const getCurrentPasses = (state: State) => state.userPassesCurrent;


function isCurrentPass(pass: UserPass) {
    let dateFrom = moment(pass.validFrom);
    let dateTo = moment(pass.validTo);
    return moment().isBetween(dateFrom, dateTo);
}