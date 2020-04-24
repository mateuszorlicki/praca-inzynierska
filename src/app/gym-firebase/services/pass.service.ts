import { Injectable } from '@angular/core';
import { AngularFirestore, QueryFn } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Pass } from 'src/app/shared/models/pass.model';

@Injectable({
  providedIn: 'root'
})
export class PassService {

  private basePath: string = '/pass';
  test: QueryFn
  constructor(private afs: AngularFirestore) { }

  getAllPasses() {
    return this.afs.collection(this.basePath, ref => {
      return ref.orderBy('order', 'asc')
    }).valueChanges() as Observable<Array<Pass>>;
  }

}
