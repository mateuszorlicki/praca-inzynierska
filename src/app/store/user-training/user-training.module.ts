import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as userTraining from './user-training.reducer'


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(userTraining.userTrainingFeatureKey, userTraining.reducer)
  ]
})
export class UserTrainingModule { }
