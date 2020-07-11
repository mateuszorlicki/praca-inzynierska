import { createAction, props } from '@ngrx/store';
import { Pass, UserPass } from 'src/app/shared/models/pass.model';

export const getAllPassesRequest = createAction(
    '[PASS] Get all users Request',
)

export const getAllPassesSuccess = createAction(
    '[PASS] Get all users Success',
    props<{ passes: Array<Pass>}>()
)

export const getAllPassesFailure = createAction(
    '[PASS] Get all users Failure',
)

export const buyPass = createAction(
    '[PASS] Buy',
    props<{pass: Pass}>()
)

export const getUserPassesRequest = createAction(
    '[PASS] Get user passes Request',
    props<{userID: string}>()
)

export const getUserPassesSuccess = createAction(
    '[PASS] Get user passes Success',
    props<{passes: Array<UserPass>}>()
)

export const getUserPassesFailure = createAction(
    '[PASS] Get user passes Failure',
)

export const savePass = createAction(
    '[PASS] Save pass',
    props<{pass: Pass}>()
);

export const savePassSuccess = createAction(
    '[PASS] Save pass success',
);

export const savePassFailure = createAction(
    '[PASS] Save pass failure',
)

export const deletePass = createAction(
    '[PASS] Delete pass',
    props<{passID: string}>()
)