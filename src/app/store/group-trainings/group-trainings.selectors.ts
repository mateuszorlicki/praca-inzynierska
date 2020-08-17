import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromReducer from './group-trainings.reducer';
import * as fromRoom from '../training-room/training-room.reducer'
import * as fromUsers from '../users/users.reducer';
import * as fromUser from '../user';
import * as fromUserTraining from '../user-training';

export const selectAllGroupTrainings = createSelector(
    fromReducer.getGroupTrainingState,
    fromReducer.getAllGroupTrainings
);

export const selectAllGroupTrainingEvents = createSelector(
    fromReducer.getGroupTrainingState,
    fromReducer.getAllGroupTrainingEvents
);

export const selectUserGroupTrainingsEvents = createSelector(
    fromReducer.getGroupTrainingState,
    selectAllGroupTrainingEvents,
    fromUserTraining.selectUserTrainings,
    (state,allEvents,userTraining) => {
        if(!userTraining) {
            return [];
        }
        return allEvents.filter(e => userTraining.trainingsIDs.includes(e.eventID))
    }
);

export const selectTrainerGroupTrainingsEvents = createSelector(
    selectAllGroupTrainingEvents,
    selectAllGroupTrainings,
    fromUser.selectUserID,
    (allEvents, allGroups, trainerID) => {
        let filteredGroups = allGroups.filter(group => group.trainerID === trainerID);
        return allEvents.filter(event => filteredGroups.some(g => g.groupID === event.groupID));
    }
)

export const selectTrainerGroupTrainingsEventsById = (trainerID: string) => createSelector(
    selectAllGroupTrainingEvents,
    selectAllGroupTrainings,
    (allEvents, allGroups) => {
        let filteredGroups = allGroups.filter(group => group.trainerID === trainerID);
        return allEvents.filter(event => filteredGroups.some(g => g.groupID === event.groupID));
    }
)

export const selectAllGroupTrainingsWithData = createSelector(
    fromReducer.getGroupTrainingState,
    fromRoom.getTrainingRoomState,
    fromUsers.getUsersState,
    (state, trainingRoom, users) => {
        return state.groupTrainings.map(group => {
            const trainer = users.users.find(u => u.uid === group.trainerID);
            const room = trainingRoom.trainingRooms.find(t => t.roomID === group.roomID);
            return {
                groupID: group.groupID,
                name: group.name,
                trainer: trainer.displayName,
                room: room.name,
                color: group.color

            }
        })
    }
);

export const selectTrainerTraining = (trainerID: string) => createSelector(
    selectAllGroupTrainingEvents,
    selectAllGroupTrainings,
    (trainings, groups) => {
        let trainerGroups = groups.filter(group => group.trainerID === trainerID);
        return trainings.filter(training => trainerGroups.some(group => group.groupID === training.groupID))
    }
)

export const selectAllGroupsByRoom = (roomID: string) => createSelector(
    selectAllGroupTrainings,
    (trainings) => {
        return trainings.filter(training => training.roomID === roomID);
    }
)