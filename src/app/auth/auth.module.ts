import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { GymFirebaseModule } from '../gym-firebase/gym-firebase.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginRequiredComponent } from './components/login-required/login-required.component';


@NgModule({
  declarations: [LoginComponent, LoginRequiredComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GymFirebaseModule,
    SharedModule
  ]
})
export class AuthModule { }
