import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as userPersonal from './user-personal.reducer'


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(userPersonal.userPersonalFeatureKey, userPersonal.reducer)
  ]
})
export class UserPersonalModule { }
