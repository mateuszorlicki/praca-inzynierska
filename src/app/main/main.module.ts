import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './components/main/main.component';
import { HeaderComponent } from './components/header/header.component';
import { TrainerTeamComponent } from './components/trainer-team/trainer-team.component';
import { PersonalTrainingsComponent } from './components/personal-trainings/personal-trainings.component';
import { TrainingCoursesComponent } from './components/training-courses/training-courses.component';
import { TimetableComponent } from './components/timetable/timetable.component';
import { PriceListComponent } from './components/price-list/price-list.component';
import { ContactComponent } from './components/contact/contact.component';



@NgModule({
  declarations: [MainComponent, HeaderComponent, TrainerTeamComponent, PersonalTrainingsComponent, TrainingCoursesComponent, TimetableComponent, PriceListComponent, ContactComponent],
  exports: [HeaderComponent],
  imports: [
    CommonModule
  ],
})
export class MainModule { }
