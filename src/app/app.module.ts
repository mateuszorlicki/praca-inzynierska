import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import 'firebase';
import { environment } from '../environments/environment';
import { AuthModule } from './auth/auth.module';
import { MainModule } from './main/main.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AuthModule,
    MainModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
