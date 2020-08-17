import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, from, of } from 'rxjs';
import { AuthService } from './auth.service';
import { UserProfile } from 'src/app/shared/models/user.models';
import { TrainingRoom } from 'src/app/shared/models/training-room.model';

@Injectable({
  providedIn: 'root'
})
export class TrainingRoomService {

  private basePath: string = '/training-room';

  constructor(private authService: AuthService, private afs: AngularFirestore) { 
  }

  getTrainingRoom(roomID: string) {
    return this.afs.doc(`${this.basePath}/${roomID}`).valueChanges() as Observable<TrainingRoom>;
  }

  getAllTrainingRooms() {
    return this.afs.collection(this.basePath).valueChanges({idField: 'roomID'}) as Observable<Array<TrainingRoom>>;
  }

  saveTrainingRoom(trainingRoom: TrainingRoom) {
    if(trainingRoom.roomID) {
      this.afs.collection(this.basePath).doc(trainingRoom.roomID).set(trainingRoom, {merge: true});
    } else {
      this.afs.collection(this.basePath).add(trainingRoom);
    }
  }

  deleteTrainingRoom(trainingRoom: TrainingRoom) {
    this.afs.collection(this.basePath).doc(trainingRoom.roomID).delete();
  }
}
