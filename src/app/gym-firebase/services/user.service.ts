import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, from, of } from 'rxjs';
import { AuthService } from './auth.service';
import { UserProfile } from 'src/app/shared/models/user.models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private basePath: string = '/users';

  constructor(private authService: AuthService, private afs: AngularFirestore) { 
  }

  getUser(uid: string) {
    return this.afs.doc(`${this.basePath}/${uid}`).valueChanges() as Observable<UserProfile>;
  }

  getAllUsers() {
    return this.afs.collection(this.basePath).valueChanges() as Observable<Array<UserProfile>>;
  }

  updateProfile(uid: string, user: UserProfile) {
    return from(this.afs.doc(`${this.basePath}/${uid}`).set(user, {merge: true}));
  }

}
