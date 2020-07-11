import { createAction, props } from '@ngrx/store';
import { UserPersonal } from 'src/app/shared/models/user.models';

export const createUserGroupIfNotExist = createAction(
    '[UERS PERSONAL] Create user personal if not exist',
)

export const getUserPersonalRequest = createAction(
    '[UERS PERSONAL] Get all user training personals Request',
)

export const getUserPersonalSuccess = createAction(
    '[UERS PERSONAL] Get all user training personals Success',
    props<{ userPersonals: UserPersonal}>()
)

export const getUserPersonalFailure = createAction(
    '[UERS PERSONAL] Get all user training personals Failure',
)

export const askForTraining = createAction(
    '[UERS PERSONAL] Sign group',
    props<{personalTrainingID: string}>()
);

export const setTrainer = createAction(
    '[UERS PERSONAL] Set trainer',
    props<{trainerID: string}>()
)
