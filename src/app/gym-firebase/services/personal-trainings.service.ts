import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, from, of } from 'rxjs';
import { AuthService } from './auth.service';
import { PersonalTrainingEvent } from 'src/app/shared/models/personal-training.model';
import RRule, { Options, Frequency, WeekdayStr } from 'rrule';
import * as moment from 'moment';
import { firestore } from 'firebase';
import { CalendarEvent } from 'angular-calendar';

@Injectable({
  providedIn: 'root'
})
export class PersonalTrainingService {

  private basePath: string = '/personal-training-event';

  constructor(private authService: AuthService, private afs: AngularFirestore) { 
  }

  getAllPersonalTrainingEvents(userID: string, isTrainer: boolean = false) {
    return this.afs.collection(this.basePath, ref => {
      return ref.where(isTrainer? 'trainerID' : 'userID', '==', userID);
    }).valueChanges({idField: 'eventID'}) as Observable<Array<PersonalTrainingEvent>>;
  }

  savePersonalTrainingEvent(groupTrainingEvent: PersonalTrainingEvent) {
    if(groupTrainingEvent.eventID) {
      this.afs.collection(`${this.basePath}`).doc(groupTrainingEvent.eventID).set(groupTrainingEvent, {merge: true});
    } else {
      this.afs.collection(`${this.basePath}`).add(groupTrainingEvent);
    }
  }

  declineTraining(groupTrainingEvent: PersonalTrainingEvent) {
    this.afs.collection(`${this.basePath}`).doc(groupTrainingEvent.eventID).delete();
  }

  mapPersonalEventsToCalendarEvents(personalEvents: Array<PersonalTrainingEvent>, forTrainer: boolean = false) {
    let calendarEvents: Array<CalendarEvent> = [];
    personalEvents.forEach((event) => {
      const title = forTrainer? event.titleForTrainer : event.titleForUser;
      calendarEvents.push({
        title,
        start: moment(event.dateStart).toDate(),
        end: moment(event.dateEnd).toDate(),
        color: {
        primary: forTrainer? this.stringToColour(event.userID) : this.stringToColour(event.trainerID) ,
        secondary:  forTrainer? this.stringToColour(event.userID) : this.stringToColour(event.trainerID)
        },
        resizable: {
          beforeStart: false,
          afterEnd: false,
        },
        draggable: false,
        meta: {
          tmpEvent: true,
          eventID: event.eventID
        },
      });
    });
    return calendarEvents;
  }

  stringToColour(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = '#';
    for (var i = 0; i < 3; i++) {
      var value = (hash >> (i * 8)) & 0xFF;
      colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
  }

}
