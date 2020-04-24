import { createAction, props } from '@ngrx/store';
import { UserProfile } from 'src/app/shared/models/user.models';

export const getAllUsersRequest = createAction(
    '[USERS] Get all users Request',
)

export const getAllUsersSuccess = createAction(
    '[USERS] Get all users Success',
    props<{ users: Array<UserProfile>}>()
)

export const getAllUsersFailure = createAction(
    '[USERS] Get all users Failure',
)

export const updateUser = createAction(
    '[USERS] Update user',
    props<{uid: string; user: UserProfile}>()
)