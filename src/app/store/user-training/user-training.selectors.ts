import { createSelector } from '@ngrx/store';
import * as fromReducer from './user-training.reducer';
import * as fromPass from '../pass';

export const selectUserTrainings = createSelector(
    fromReducer.getUserTrainingState,
    fromReducer.getUserTrainings
);

export const selectIsUserSigned = (groupID) => createSelector(
    fromReducer.getUserTrainingState,
    selectUserTrainings,
    (state) => {
        if(!state.userTrainings) {
            return true
        }
        return !state.userTrainings.trainingsIDs.includes(groupID);
    }
)

export const selectCanUserAddTraining = createSelector(
    fromReducer.getUserTrainingState,
    fromPass.selectCountOfGroupTrainings,
    (state, count) => {
        if (!state.userTrainings) {
            return count !== 0;
        }
        return count - state.userTrainings.trainingsIDs.length > 0;
    }
)

export const selectCountUserLeftTraining = createSelector(
    fromReducer.getUserTrainingState,
    fromPass.selectCountOfGroupTrainings,
    (state, count) => {
        if (!state.userTrainings) {
            return count;
        }
        return count - state.userTrainings.trainingsIDs.length;
    }
)