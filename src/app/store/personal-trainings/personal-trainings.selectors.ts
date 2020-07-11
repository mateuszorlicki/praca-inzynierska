import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromReducer from './personal-trainings.reducer';
import * as fromRoom from '../training-room/training-room.reducer'
import * as fromUsers from '../users/users.reducer';
import * as fromUserTraining from '../user-training';


export const selectAllPersonalTrainingEvents = createSelector(
    fromReducer.getPersonalTrainingState,
    fromReducer.getAllPersonalTrainingEvents
);

export const selectUserPersonalTrainingsEvents = createSelector(
    fromReducer.getPersonalTrainingState,
    selectAllPersonalTrainingEvents,
    fromUserTraining.selectUserTrainings,
    (state,allEvents,userTraining) => {
        if(!userTraining) {
            return [];
        }
        return allEvents.filter(e => userTraining.trainingsIDs.includes(e.eventID))
    }
)

export const selectAcceptedPersonalTrainings = createSelector(
    fromReducer.getPersonalTrainingState,
    selectAllPersonalTrainingEvents,
    (state, allEvents) => {
        return allEvents.filter(e => e.isAccepted);
    }
)

export const selectAcceptedPersonalTrainingsCount = createSelector(
    fromReducer.getPersonalTrainingState,
    selectAllPersonalTrainingEvents,
    (state, allEvents) => {
        return allEvents.filter(e => e.isAccepted).length;
    }
)

export const selectNotAcceptedPersonalTrainings = createSelector(
    fromReducer.getPersonalTrainingState,
    selectAllPersonalTrainingEvents,
    (state, allEvents) => {
        return allEvents.filter(e => !e.isAccepted);
    }
)

export const selectNotAcceptedPersonalTrainingsCount = createSelector(
    fromReducer.getPersonalTrainingState,
    selectAllPersonalTrainingEvents,
    (state, allEvents) => {
        return allEvents.filter(e => !e.isAccepted).length;
    }
)