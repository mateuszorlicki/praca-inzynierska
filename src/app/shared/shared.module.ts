import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { PersonalTrainingCardComponent } from './components/personal-training-card/personal-training-card.component';
import { PersonalTrainingAddCardComponent } from './components/personal-training-add-card/personal-training-add-card.component'
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PersonalTrainingCardComponent,
    PersonalTrainingAddCardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    PersonalTrainingCardComponent,
    PersonalTrainingAddCardComponent
  ]
})
export class SharedModule { }
