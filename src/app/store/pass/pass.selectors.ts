import { createSelector } from '@ngrx/store';
import * as fromReducer from './pass.reducer';

export const selectAllPasses = createSelector(
    fromReducer.getPassState,
    fromReducer.getAllPasses
);

export const selectCountOfGroupTrainings = createSelector(
    fromReducer.getPassState,
    ({userPassesCurrent}) => {
        return userPassesCurrent.filter(pass => pass.isGroupTraining).reduce((acc, obj) => acc + obj.validityNumber, 0);
    }
);

export const selectCountOfPersonalTrainings = createSelector(
    fromReducer.getPassState,
    ({userPassesCurrent}) => {
        return userPassesCurrent.filter(pass => pass.isPersonalTraining).reduce((acc, obj) => acc + obj.validityNumber, 0);
    }
);
