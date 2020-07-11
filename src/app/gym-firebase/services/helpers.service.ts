import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor() { }

  convertTimestampToDate(date: any) {
    return (<firebase.firestore.Timestamp>date).toDate();
  }
}
