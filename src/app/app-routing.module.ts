import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { MainComponent } from './main/components/main/main.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { LoginRequiredComponent } from './auth/components/login-required/login-required.component';
import { TrainerTeamComponent } from './main/components/trainer-team/trainer-team.component';
import { PersonalTrainingsComponent } from './main/components/personal-trainings/personal-trainings.component';
import { TrainingCoursesComponent } from './main/components/training-courses/training-courses.component';
import { TimetableComponent } from './main/components/timetable/timetable.component';
import { PriceListComponent } from './main/components/price-list/price-list.component';
import { ContactComponent } from './main/components/contact/contact.component';


const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full'},
  { path: 'main', component: MainComponent},
  { path: 'trainer-team', component: TrainerTeamComponent},
  { path: 'personal-trainings', component: PersonalTrainingsComponent, canActivate: [AuthGuard]},
  { path: 'training-courses', component: TrainingCoursesComponent},
  { path: 'timetable', component: TimetableComponent},
  { path: 'price-list', component: PriceListComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'login-required', component: LoginRequiredComponent},
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
