import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private basePath: string = '/users';

  constructor(private db: AngularFireDatabase) { }

  getAllUsers(): AngularFireList<any> {
    return this.db.list(this.basePath);
  }
}
