import { createSelector } from '@ngrx/store';
import * as fromReducer from './user-personal.reducer';
import * as fromPass from '../pass';

export const selectUserPersonals = createSelector(
    fromReducer.getUserPersonalState,
    fromReducer.getUserPersonals
);

// export const selectIsUserSigned = (groupID) => createSelector(
//     fromReducer.getUserTrainingState,
//     selectUserTrainings,
//     (state) => {
//         if(!state.userTrainings) {
//             return true
//         }
//         return !state.userTrainings.trainingsIDs.includes(groupID);
//     }
// )