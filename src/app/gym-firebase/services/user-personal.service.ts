import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, from, of } from 'rxjs';
import { AuthService } from './auth.service';
import { UserPersonal } from 'src/app/shared/models/user.models';

@Injectable({
  providedIn: 'root'
})
export class UserPersonalService {

  private basePath: string = '/user-personal';

  constructor(private authService: AuthService, private afs: AngularFirestore) { 
  }

  getUserPersonals(userID: string) {
    return this.afs.collection(this.basePath, ref => {
      return ref.where('userID', '==', userID);
    }).valueChanges({idField: 'userPersonalID'}) as Observable<Array<UserPersonal>>;
  }

  setTrainer(userID: string, trainerID: string) {
    let data: UserPersonal = {
      userID,
      trainerID,
      personalTrainingIDs: []
    }
    this.afs.collection(this.basePath).add(data);
  }

  signPersonal(userID: string, trainerID: string, userPersonal: UserPersonal, personalTrainingID: string) {
    if(userPersonal) {
      let data: UserPersonal = {
        ...userPersonal,
        personalTrainingIDs: [
          ...userPersonal.personalTrainingIDs,
          personalTrainingID
        ],
        
      }
      return from(this.afs.doc(`${this.basePath}/${userPersonal.userPersonalID}`).set(data, {merge: true}));
    } else {
      let data: UserPersonal = {
        userID,
        trainerID,
        personalTrainingIDs: [
          ...userPersonal.personalTrainingIDs,
          personalTrainingID
        ],
      }
      this.afs.collection(this.basePath).add(data)
    }

  }

}
