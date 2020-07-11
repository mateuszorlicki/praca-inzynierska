import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from 'firebase';
import { Observable, from } from 'rxjs';
import { Router } from '@angular/router';
import { UserProfile, Credentials } from 'src/app/shared/models/user.models';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly authState$: Observable<User | null> = this.fireAuth.authState;

  user$: Observable<UserProfile> ;
  
  constructor(
    public fireAuth: AngularFireAuth,
  ) { }

  loginWithEmailAndPassword(credentials: Credentials) {
    return from(this.fireAuth.signInWithEmailAndPassword(credentials.email, credentials.password));
  }
  reqisterWithEmailAndPassword(credentials: Credentials) {
    return from(this.fireAuth.createUserWithEmailAndPassword(credentials.email, credentials.password));
  }

  loginWithGoogle() {
    return from(this.fireAuth.signInWithPopup(new auth.GoogleAuthProvider())) ;
  }  

  logout() {
    return from(this.fireAuth.signOut());
  }
}
