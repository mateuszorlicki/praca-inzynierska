import { State } from './user.reducer';
import { createSelector } from '@ngrx/store';
import * as fromReducer from './user.reducer'

export const selectUserID = createSelector(
    fromReducer.getUserState,
    fromReducer.getUserID
);
export const selectUserProfile = createSelector(
    fromReducer.getUserState,
    fromReducer.getUserProfile
);

export const selectUserRoles = createSelector(
    fromReducer.getUserState,
    fromReducer.getUserRoles
);

export const selectIsLoggedIn = createSelector(
    fromReducer.getUserState,
    fromReducer.getIsLoggedIn
);

export const selectStatus = createSelector(
    fromReducer.getUserState,
    fromReducer.getStatus
);

export const selectIsLoading = createSelector(
    fromReducer.getUserState,
    fromReducer.getIsLoading
);

export const selectIsSuccess = createSelector(
    fromReducer.getUserState,
    fromReducer.getIsSuccess
);

export const selectIsError = createSelector(
    fromReducer.getUserState,
    fromReducer.getIsError
);