import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromReducer from './personal-trainings.reducer';
import * as fromRoom from '../training-room/training-room.reducer'
import * as fromUsers from '../users/users.reducer';
import * as fromUserTraining from '../user-training';
import * as fromPass from '../pass';
import * as moment from 'moment';
import * as fromGroupTraining from '../group-trainings'


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

export const selectTrainingCollides = (trainingID: string) => createSelector(
    selectAllPersonalTrainingEvents,
    (trainings) => {
        let trainingToCheck = trainings.find(training => training.eventID === trainingID);
        let trainingsToMatch = trainings.filter(training => training.eventID !== trainingID);
        return trainingsToMatch.some(training => trainingToCheck.dateStart === training.dateStart)
    }
)

export const selectCanUserAddPersonal = createSelector(
    fromReducer.getPersonalTrainingState,
    fromPass.selectCountOfPersonalTrainings,
    selectAcceptedPersonalTrainingsCount,
    selectNotAcceptedPersonalTrainingsCount,
    (state, count, acceptedCount, notAcceptedCount) => {

        return count - (acceptedCount + notAcceptedCount) > 0;
    }
)

export const selectCanUserAddThisDate = (date) => createSelector(
    fromPass.selectPersonalTrainingsPassesCapacityToDate(moment(date).toDate()),
    selectPersonalTrainingEventsToDate(moment(date).toDate()),
    (passesCapacity, eventsToDate) => {
        return passesCapacity - eventsToDate > 0
    }

)

export const selectPersonalTrainingEventsToDate = (date: Date) => createSelector(
    selectAllPersonalTrainingEvents,
    fromPass.selectPassValidToClosestToDate(moment(date).toDate()),
    fromPass.selectPersonalTrainingsPassesCapacityToDate(moment(date).toDate()),
    (events, validTo, passesCapacity) => {
        if(validTo === null) {
            return passesCapacity
        }
        return events.filter(event => moment(event.dateStart).isSameOrBefore(validTo)).length
    }
)

export const selectCountUserLeftPersonal = createSelector(
    fromReducer.getPersonalTrainingState,
    fromPass.selectCountOfPersonalTrainings,
    selectAcceptedPersonalTrainingsCount,
    selectNotAcceptedPersonalTrainingsCount,
    (state, count, acceptedCount, notAcceptedCount) => {

        return count - (acceptedCount + notAcceptedCount);
    }
)

export const selectNotColideWithTrainer = (trainerID: string, date: string, hour: string) => createSelector(
    fromGroupTraining.selectTrainerTraining(trainerID),
    (trainings) => {
        let splittedHour = hour.split(':')[0];
        let dateWeekDay = moment(date).weekday() + 1;
        return trainings.some(training => dateWeekDay === training.byweekday && isSameOrBetween(splittedHour, training.hourStart.split(':')[0], training.hourEnd.split(':')[0])) === false
    }
)

export const selectNotColideWithUser = (date: string, hour: string) => createSelector(
    fromGroupTraining.selectUserGroupTrainingsEvents,
    (trainings) => {
        let splittedHour = hour.split(':')[0];
        let dateWeekDay = moment(date).weekday() + 1;
        return trainings.some(training => dateWeekDay === training.byweekday && isSameOrBetween(splittedHour, training.hourStart.split(':')[0], training.hourEnd.split(':')[0])) === false
    }
)

function isSameOrBetween(number, min, max) {
    return parseInt(number) >=parseInt(min) && parseInt(number) < parseInt(max);
} 