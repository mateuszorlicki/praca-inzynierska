import { createAction, props } from '@ngrx/store';
import { GroupTraining, GroupTrainingEvent } from 'src/app/shared/models/group-training.model';

export const getAllGroupTrainingsRequest = createAction(
    '[GROUP-TRAININGS] Get all Request'
);

export const getAllGroupTrainingsSuccess = createAction(
    '[GROUP-TRAININGS] Get all Success',
    props<{groupTrainings: Array<GroupTraining>}>()
);

export const getAllGroupTrainingsFailure = createAction(
    '[GROUP-TRAININGS] Get all Failure'
);

export const getAllGroupTrainingEventRequest = createAction(
    '[GROUP-TRAININGS] Get all events Request'
);

export const getAllGroupTrainingEventSuccess = createAction(
    '[GROUP-TRAININGS] Get all events Success',
    props<{groupTrainingEvents: Array<GroupTrainingEvent>}>()
);

export const getAllGroupTrainingEventFailure = createAction(
    '[GROUP-TRAININGS] Get all events Failure'
);

export const saveGroupTrainingEvent = createAction(
    '[GROUP-TRAINING] Save event request',
    props<{ groupTrainingEvent: GroupTrainingEvent}>()
)

export const saveGroupTraining = createAction(
    '[GROUP-TRAININGS] Save request',
    props<{groupTraining: GroupTraining}>()
)

export const deleteGroupTraining = createAction(
    '[GROUP-TRAININGS] Delete request',
    props<{groupTraining: GroupTraining}>()
)
