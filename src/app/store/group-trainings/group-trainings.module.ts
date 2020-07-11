import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as groupTrainings from './group-trainings.reducer'


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(groupTrainings.groupTrainingsFeatureKey, groupTrainings.reducer)
  ]
})
export class GroupTrainingsModule { }
