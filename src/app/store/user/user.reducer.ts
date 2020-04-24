import * as userActions from './user.actions';
import { createReducer, Action, on, createFeatureSelector } from '@ngrx/store';
import { Status, EMPTY_STATUS } from 'src/app/shared/models/store.models';
import { GUEST_USER, UserProfile } from 'src/app/shared/models/user.models';

export const userFeatureKey = 'user';

export interface State {
    user: UserProfile;
    userStatus: Status;
    isLoggedIn: boolean;
}

export const initialState: State = {
    user: GUEST_USER,
    userStatus: EMPTY_STATUS,
    isLoggedIn: false
}

const userReducer = createReducer(
    initialState,
    on(userActions.getProfileRequest, (state, { uid }) => ({
        ...state,
        isLoggedIn: true,
    })),
    on(userActions.getProfileSuccess, (state, { user }) => ({
        ...state,
        isLoggedIn: true,
        user
    })),
    on(userActions.userLoggedOut, (state) => ({
        ...state,
        isLoggedIn: false,
        user: GUEST_USER,
    }))
);

export function reducer(state: State | undefined, action: Action) {
    return userReducer(state, action);
}

export const getUserState = createFeatureSelector<State>('user');

export const getUserID = (state: State) => state.user.uid;

export const getUserProfile = (state: State) => state.user;

export const getUserRoles = (state: State) => state.user.roles;

export const getIsLoggedIn = (state: State) => state.isLoggedIn;

export const getStatus = (state: State) => state.userStatus;

export const getIsLoading = (state: State) => state.userStatus.loading;
export const getIsSuccess = (state: State) => state.userStatus.success;
export const getIsError = (state: State) => state.userStatus.error;
