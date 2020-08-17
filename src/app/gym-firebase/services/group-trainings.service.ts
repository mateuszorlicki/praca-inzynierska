import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, from, of } from 'rxjs';
import { AuthService } from './auth.service';
import { UserProfile } from 'src/app/shared/models/user.models';
import { TrainingRoom } from 'src/app/shared/models/training-room.model';
import { GroupTraining, GroupTrainingEvent } from 'src/app/shared/models/group-training.model';
import RRule, { Options, Frequency, WeekdayStr } from 'rrule';
import * as moment from 'moment';
import { firestore } from 'firebase';
import { CalendarEvent } from 'angular-calendar';

@Injectable({
  providedIn: 'root'
})
export class GroupTrainingService {

  private basePath: string = '/group-training';

  constructor(private authService: AuthService, private afs: AngularFirestore) { 
  }

  getGroupTraining(groupID: string) {
    return this.afs.doc(`${this.basePath}/${groupID}`).valueChanges() as Observable<TrainingRoom>;
  }

  getAllGroupTrainings() {
    return this.afs.collection(this.basePath).valueChanges({idField: 'groupID'}) as Observable<Array<GroupTraining>>;
  }

  getAllGroupTrainingEvents() {
    return this.afs.collection(`${this.basePath}-event`).valueChanges({idField: 'eventID'}) as Observable<Array<GroupTrainingEvent>>;
  }

  saveGroupTraining(groupTraining: GroupTraining) {
    if(groupTraining.groupID) {
      this.afs.collection(this.basePath).doc(groupTraining.groupID).set(groupTraining, {merge: true});
      this.afs.collection(`${this.basePath}-event`).ref.where('groupID', '==', groupTraining.groupID).get().then((data) => {
        data.forEach(event => {
          console.log(event.data());
          event.ref.set({
            color: groupTraining.color
          }, { merge: true})
        })
      })

    } else {
      this.afs.collection(this.basePath).add(groupTraining);
    }
  }

  deleteGroupTraining(groupTraining: GroupTraining) {
    console.log('delete')
    this.afs.collection(this.basePath).doc(groupTraining.groupID).delete();
    this.afs.collection(`${this.basePath}-event`).ref.where('groupID', '==', groupTraining.groupID).get().then((data) => {
      data.forEach(event => {
        this.afs.collection('/user-trainings').ref.where('trainingsIDs', 'array-contains', event.id).get().then(userTrainings => {
          userTrainings.forEach(userTraining => {
            console.log(userTraining.data())
            userTraining.ref.set({
              trainingsIDs: userTraining.data().trainingsIDs.filter(id => id !== event.id)
            }, { merge: true})
          })
        })
        event.ref.delete();
      })
    })
  }

  saveGroupTrainingEvent(groupTrainingEvent: GroupTrainingEvent) {
    if(groupTrainingEvent.eventID) {
      this.afs.collection(`${this.basePath}-event`).doc(groupTrainingEvent.eventID).set(groupTrainingEvent, {merge: true});
    } else {
      this.afs.collection(`${this.basePath}-event`).add(groupTrainingEvent);
    }
  }


  mapGroupTrainingEventsToRRuleEvents(groupTrainingEvent: Array<GroupTrainingEvent>) {
    
    return groupTrainingEvent.map(e => {
      let rrule = {
        dtstart: moment().startOf('month').set('hour',parseInt(e.hourStart.split(':')[0])).set('minute',parseInt(e.hourStart.split(':')[1])).toDate(),
        byweekday: e.byweekday - 1,
        freq: Frequency.WEEKLY,
        wkst: 1
      }
      return {
        start: moment().startOf('month').startOf('day').set('hour',parseInt(e.hourStart.split(':')[0])).set('minute',parseInt(e.hourStart.split(':')[1])),
        end: moment().startOf('month').startOf('day').set('hour',parseInt(e.hourEnd.split(':')[0])).set('minute',parseInt(e.hourEnd.split(':')[1])),
        title: e.title,
        color: e.color,
        rrule,
        eventID: e.eventID
      }
    })
  }

  mapRRuleEventsToCalendarEvents(rruleEvents: Array<any>) {
    let calendarEvents: Array<CalendarEvent> = [];
    rruleEvents.forEach((event) => {
      const rule: RRule = new RRule({
        ...event.rrule,
        count: 30,
      });
      const { title } = event;

      let timeDifferential = event.end.diff(event.start, 'minutes')

      rule.all().forEach((date) => {
        calendarEvents.push({
          title,
          start: moment(date).toDate(),
          end: moment(date).add(timeDifferential, 'minutes').toDate(),
          color: {
          primary: event.color,
          secondary: event.color
          },
          resizable: {
            beforeStart: true,
            afterEnd: true,
          },
          draggable: false,
          meta: {
            tmpEvent: true,
            eventID: event.eventID
          },
        });
      });
    });
    return calendarEvents;
  }

}
