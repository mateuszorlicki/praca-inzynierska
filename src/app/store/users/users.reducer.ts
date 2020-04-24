
import * as usersActions from './users.actions';
import { createReducer, Action, on, createFeatureSelector, Store } from '@ngrx/store';
import { UserProfile } from 'src/app/shared/models/user.models';

export interface State {
    users: Array<UserProfile>;
}
export const usersFeatureKey = 'users';

export const initialState: State = {
    users: [],
}

const usersReducer = createReducer(
    initialState,
    on(usersActions.getAllUsersSuccess, (state, { users }) => ({
        ...state,
        users
    })),
);

export function reducer(state: State | undefined, action: Action) {
    return usersReducer(state, action);
}

export const getUsersState = createFeatureSelector<State>('users');

export const getAllAdmins = (state: State) => state.users.filter(u => u.roles.some(r => r === 'ADMIN'));
export const getAllNotAdmins = (state: State) => state.users.filter(u => u.roles.every(r => r !== 'ADMIN'));

export const getAllUsers = (state: State) => state.users.filter(u => u.roles.some(r => r === 'USER' || r === 'USER_WITH_PASS'));

export const getAllTrainers = (state: State) => state.users.filter(u => u.roles.some(r => r === 'TRAINER'));
export const getAllNotTrainers = (state: State) => state.users.filter(u => u.roles.every(r => r !== 'TRAINER'));
