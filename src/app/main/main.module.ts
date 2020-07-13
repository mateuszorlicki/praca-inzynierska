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
import { UserPanelComponent } from './components/user-panel/user-panel.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminPanelComponent } from './components/user-panel/admin-panel/admin-panel.component';
import { SingleTrainerComponent } from './components/trainer-team/single-trainer/single-trainer.component';
import { TrainerProfileComponent } from './components/trainer-team/trainer-profile/trainer-profile.component';
import { BuyPassModalComponent } from './components/price-list/buy-pass-modal/buy-pass-modal.component';
import { AddEditPassModalComponent } from './components/price-list/add-edit-pass-modal/add-edit-pass-modal.component';
import { TrainerPanelComponent } from './components/user-panel/trainer-panel/trainer-panel.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { GroupTrainingsComponent } from './components/user-panel/admin-panel/group-trainings/group-trainings.component';
import { ColorCircleModule } from 'ngx-color/circle';
import { TrainingRoomComponent } from './components/user-panel/admin-panel/training-room/training-room.component';
import { GroupTrainingsTimetableComponent } from './components/user-panel/admin-panel/group-trainings-timetable/group-trainings-timetable.component';
import { TypeaheadModule } from 'ngx-bootstrap';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';
import { AddEventModalComponent } from './components/user-panel/admin-panel/group-trainings-timetable/add-event-modal/add-event-modal.component';
import { WeekdayPipe } from './pipes/weekday.pipe';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { PersonalTrainingsTrainerComponent } from './components/personal-trainings-trainer/personal-trainings-trainer.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    TrainerTeamComponent,
    PersonalTrainingsComponent,
    PersonalTrainingsTrainerComponent,
    TrainingCoursesComponent,
    TimetableComponent,
    PriceListComponent,
    ContactComponent,
    UserPanelComponent,
    AdminPanelComponent,
    SingleTrainerComponent,
    TrainerProfileComponent,
    BuyPassModalComponent,
    AddEditPassModalComponent,
    TrainerPanelComponent,
    GroupTrainingsComponent,
    TrainingRoomComponent,
    GroupTrainingsTimetableComponent,
    AddEventModalComponent,
    WeekdayPipe,
  ],
  exports: [HeaderComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ColorCircleModule,
    SharedModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    TypeaheadModule.forRoot(),
    MatMomentDateModule,
    MaterialModule,
    RouterModule
  ],
  providers: [
    
  ],
  entryComponents: [
    AddEventModalComponent
  ]
})
export class MainModule { }
