import { createAction, props } from '@ngrx/store';
import { Pass } from 'src/app/shared/models/pass.model';

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
