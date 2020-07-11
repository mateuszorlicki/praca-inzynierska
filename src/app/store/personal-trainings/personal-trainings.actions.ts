import { createAction, props } from '@ngrx/store';
import { PersonalTrainingEvent } from 'src/app/shared/models/personal-training.model';


export const getAllPersonalTrainingEventRequest = createAction(
    '[PERSONAL-TRAININGS] Get all events Request',
);

export const getAllPersonalTrainingEventSuccess = createAction(
    '[PERSONAL-TRAININGS] Get all events Success',
    props<{personalTrainingEvents: Array<PersonalTrainingEvent>}>()
);

export const getAllPersonalTrainingEventFailure = createAction(
    '[PERSONAL-TRAININGS] Get all events Failure'
);

export const savePersonalTrainingEvent = createAction(
    '[PERSONAL-TRAINING] Save event request',
    props<{ personalTrainingEvent: PersonalTrainingEvent}>()
)

export const askForTraining = createAction(
    '[PERSONAL-TRAININGS] Ask for Training',
    props<{ personalTrainingEvent: PersonalTrainingEvent}>()
)

export const acceptTraining = createAction(
    '[PERSONAL-TRAININGS] Accept Training',
    props<{ personalTrainingEvent: PersonalTrainingEvent}>()
)

export const declineTraining = createAction(
    '[PERSONAL-TRAININGS] Decline Training',
    props<{ personalTrainingEvent: PersonalTrainingEvent}>()
)