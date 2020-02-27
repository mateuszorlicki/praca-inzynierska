import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

interface Credentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly authState$: Observable<User | null> = this.fireAuth.authState;
  
  constructor(
    public fireAuth: AngularFireAuth,
    private router: Router,
  ) { }

  get user(): User | null {
    return this.fireAuth.auth.currentUser;
  }

  loginWithEmailAndPassword(credentials: Credentials) {
    return this.fireAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password).then(() => {
      this.router.navigate(['']);
    });
  }
  reqisterWithEmailAndPassword(credentials: Credentials) {
    return this.fireAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
  }

  loginWithGoogle() {
    return this.fireAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(() => {
      this.router.navigate(['']);
    });
  }  

  logout() {
    return this.fireAuth.auth.signOut().then(() => {
      console.log('signed out')
      this.router.navigate(['login']);
    });
  }
}
