import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as personalTrainings from './personal-trainings.reducer'


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(personalTrainings.personalTrainingsFeatureKey, personalTrainings.reducer)
  ]
})
export class PersonalTrainingsModule { }
