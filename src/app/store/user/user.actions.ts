import { createAction, props } from '@ngrx/store';
import { UserProfile, Credentials } from 'src/app/shared/models/user.models';

export const userLogInWithGoogle = createAction(
    '[USER] Log in with google'
);

export const userLogInWithEmail = createAction(
    '[USER] Log in with email',
    props<{ credentials: Credentials, newUser: UserProfile}>()
);

export const userRegisterWithEmail = createAction(
    '[USER] Register with Email and Password',
    props<{ credentials: Credentials, displayName: string}>()
);

export const userLogOut = createAction(
    '[USER] Log out'
);

export const userLoggedIn = createAction(
    '[USER]Logged in',
    props<{ uid: string}>()
);

export const userLoggedOut = createAction(
    '[USER] Logged out',
);

export const getProfileRequest = createAction(
    '[USER - GET PROFILE] Get profile REQUEST',
    props<{ uid: string}>()

);

export const getProfileSuccess = createAction(
    '[USER - GET PROFILE] Get profile SUCCESS',
    props<{user: UserProfile}>()
);


export const getProfileError = createAction(
    '[USER - GET PROFILE] Get profile FAILED',
);

export const getUserData = createAction(
    '[USER - GET PROFILE] Get profile REQUEST'
);

export const updateProfile = createAction(
    '[USER] Update profile',
    props<{uid: string; user: UserProfile}>()

)
