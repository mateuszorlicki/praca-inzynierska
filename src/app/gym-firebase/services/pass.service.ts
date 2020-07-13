import { Injectable } from '@angular/core';
import { AngularFirestore, QueryFn } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Pass, UserPass, Validity } from 'src/app/shared/models/pass.model';
import * as moment from 'moment';
import { UserProfile } from 'src/app/shared/models/user.models';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PassService {

  private passPath: string = '/pass';
  private userPassPath: string ='/user-passes'
  constructor(private afs: AngularFirestore) { }

  getAllPasses() {
    return this.afs.collection(this.passPath, ref => {
      return ref.orderBy('order', 'asc')
    }).valueChanges({idField: 'passID'}) as Observable<Array<Pass>>;
  }

  addPassForUser(pass: Pass, userID: string) {
    let userPass: UserPass = ({
      ...pass,
      userID,
      boughtTime: moment().toDate(),
      validFrom: moment().toISOString(),
      validTo: this.getPassValidTo(pass).toISOString(),
    });
    this.afs.collection(this.userPassPath).add(userPass);
  }

  getUserPasses(userID: string) {
    return this.afs.collection(this.userPassPath, ref => {
      return ref.where('userID', '==', userID);
    }).valueChanges() as Observable<Array<UserPass>>;
  }

  getPassValidTo(pass: Pass) {
    let now = moment();
    if (!pass.isOnlyGym) {
       return now.add(1, 'month'); 
    } else {
      return now.add(pass.validityNumber, 'month');
    }
  }

  savePass(pass: Pass) {
    if(pass.passID) {
      this.afs.collection(this.passPath).doc(pass.passID).set(pass, {merge: true});
    } else {
      this.afs.collection(this.passPath).get().pipe(
        take(1),
      ).subscribe(res => {
        let order = res.docs[res.docs.length-1].data().order;
        this.afs.collection(this.passPath).add(({...pass, order}));
      })
    }
  }

  deletePass(passID: string) {
    return this.afs.collection(this.passPath).doc(passID).delete();
  }

}
