import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule,  } from '@angular/fire';
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { environment } from '../environments/environment';
import { AuthModule } from './auth/auth.module';
import { MainModule } from './main/main.module';
import { StoreModule } from '@ngrx/store';
import { CoreStoreModule } from './store/core-store.module';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/user/user.effects';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { UsersEffects } from './store/users/users.effects';
import { PassEffects } from './store/pass';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import * as moment from 'moment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import localePl from '@angular/common/locales/pl';
import { registerLocaleData } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TrainingRoomEffects } from './store/training-room';
import { GroupTrainingEffects } from './store/group-trainings';
import { UserTrainingEffects } from './store/user-training';
import { UserPersonalEffects } from './store/user-personal';
import { PersonalTrainingEffects } from './store/personal-trainings';

registerLocaleData(localePl);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AuthModule,
    MainModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([PersonalTrainingEffects, UserPersonalEffects, UserTrainingEffects, UserEffects, UsersEffects, PassEffects, TrainingRoomEffects, GroupTrainingEffects]),
    CoreStoreModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    DragDropModule,
    NgbModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pl' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
