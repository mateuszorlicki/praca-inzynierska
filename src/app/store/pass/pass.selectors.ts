import { createSelector } from '@ngrx/store';
import * as fromReducer from './pass.reducer';
import * as moment from 'moment'

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

export const selectPersonalTrainingsPassesCapacityToDate = (date: Date) => createSelector(
    fromReducer.getPassState,
    ({userPassesCurrent}) => {
        return userPassesCurrent.filter(pass => pass.isPersonalTraining && moment(date).isBetween(pass.validFrom, pass.validTo, 'day', '[]')).reduce((acc, obj) => acc + obj.validityNumber, 0);
    }
);

export const selectPassValidToClosestToDate = (date: Date) => createSelector(
    fromReducer.getPassState,
    ({userPassesCurrent}) => {
        return userPassesCurrent.find(pass => moment(date).isBefore(pass.validTo))? userPassesCurrent.find(pass => moment(date).isBefore(pass.validTo)).validTo : null
    }
)