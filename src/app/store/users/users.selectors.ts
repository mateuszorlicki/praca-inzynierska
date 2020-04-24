import { createSelector } from '@ngrx/store';
import * as fromReducer from './users.reducer';

export const selectAllAdmins = createSelector(
    fromReducer.getUsersState,
    fromReducer.getAllAdmins
);

export const selectAllNotAdmins = createSelector(
    fromReducer.getUsersState,
    fromReducer.getAllNotAdmins
);

export const selectAllNotTrainers = createSelector(
    fromReducer.getUsersState,
    fromReducer.getAllNotTrainers
);

export const selectAllTrainers = createSelector(
    fromReducer.getUsersState,
    fromReducer.getAllTrainers
);

export const selectAllUsers = createSelector(
    fromReducer.getUsersState,
    fromReducer.getAllUsers
);

export const selectSingleUser =createSelector(
    fromReducer.getUsersState,
    (state, props) => state.users.find(u => u.uid === props.id)
)