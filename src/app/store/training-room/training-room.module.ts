import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as trainingRoom from './training-room.reducer'


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(trainingRoom.trainingRoomFeatureKey, trainingRoom.reducer)
  ]
})
export class TrainingRoomModule { }
