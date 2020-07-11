import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, from, of } from 'rxjs';
import { AuthService } from './auth.service';
import { UserProfile, UserTraining } from 'src/app/shared/models/user.models';

@Injectable({
  providedIn: 'root'
})
export class UserTrainingsService {

  private basePath: string = '/user-trainings';

  constructor(private authService: AuthService, private afs: AngularFirestore) { 
  }

  getUserGroups(userID: string) {
    return this.afs.collection(this.basePath, ref => {
      return ref.where('userID', '==', userID);
    }).valueChanges({idField: 'userTrainingID'}) as Observable<Array<UserTraining>>;
  }

  createEmptyUserGroup(userID: string) {
    let userTraining: UserTraining = {
      trainingsIDs: [],
      userID
    }
    this.afs.collection(this.basePath).add(userTraining)
  }

  signGroup(userID: string, userTraining: UserTraining, groupID: string) {
    if(userTraining) {
      let data = {
        ...userTraining,
        trainingsIDs: [
          ...userTraining.trainingsIDs,
          groupID
        ]
      }
      return from(this.afs.doc(`${this.basePath}/${userTraining.userTrainingID}`).set(data, {merge: true}));
    } else {
      let data: UserTraining = {
        userID,
        trainingsIDs: [
          groupID
        ]
      }
      this.afs.collection(this.basePath).add(data)
    }

  }

}
