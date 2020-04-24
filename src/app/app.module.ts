import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AuthModule,
    MainModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([UserEffects, UsersEffects, PassEffects]),
    CoreStoreModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
