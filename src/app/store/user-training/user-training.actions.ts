import { createAction, props } from '@ngrx/store';
import { Pass, UserPass } from 'src/app/shared/models/pass.model';
import { UserTraining } from 'src/app/shared/models/user.models';

export const createUserGroupIfNotExist = createAction(
    '[PASS] Create user group if not exist',
)

export const getUserGroupsRequest = createAction(
    '[PASS] Get all user training groups Request',
)

export const getUserGroupsSuccess = createAction(
    '[PASS] Get all user training groups Success',
    props<{ userTrainings: UserTraining}>()
)

export const getUserGroupsFailure = createAction(
    '[PASS] Get all user training groups Failure',
)

export const signGroup = createAction(
    '[PASS] Sign group',
    props<{trainingID: string}>()
)
