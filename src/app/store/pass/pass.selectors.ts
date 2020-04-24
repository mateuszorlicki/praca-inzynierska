import { createSelector } from '@ngrx/store';
import * as fromReducer from './pass.reducer';

export const selectAllPasses = createSelector(
    fromReducer.getPassState,
    fromReducer.getAllPasses
);
