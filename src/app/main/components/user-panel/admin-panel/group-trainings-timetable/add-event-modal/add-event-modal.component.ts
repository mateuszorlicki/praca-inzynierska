import { Component, OnInit, Input, Inject } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { Store, select } from '@ngrx/store';
import * as fromGroup from '../../../../../../store/group-trainings';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { GroupTrainingToDisplay, GroupTrainingEvent } from 'src/app/shared/models/group-training.model';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';

import { Frequency } from 'rrule';
import { WeekDay } from '@angular/common';

import * as moment from 'moment';
import { GroupTrainingService } from 'src/app/gym-firebase/services/group-trainings.service';

export enum RecurrenceOption {
  ONCE = 'ONCE',
  EVERY_WEEK = 'EVERY_WEEK',
  EVERY_MONTH = 'EVERY_MONTH'
}

@Component({
  selector: 'app-add-event-modal',
  templateUrl: './add-event-modal.component.html',
  styleUrls: ['./add-event-modal.component.scss']
})
export class AddEventModalComponent implements OnInit {

  frequency = Frequency;

  eventForm: FormGroup



  constructor(private dialog: MatDialog, private store$: Store, private fb: FormBuilder, private groupTrainingService: GroupTrainingService, @Inject(MAT_DIALOG_DATA) public data: {event: CalendarEvent}) { }

  ngOnInit(): void {
    this.store$.pipe(
      select(fromGroup.selectAllGroupTrainingsWithData)
    ).subscribe(res => {

      let start = this.data.event.start;
      let weekday = moment(this.data.event.start).weekday();
      let startTime = moment(this.data.event.start).format('HH:mm');
      let endTime = moment(this.data.event.end).format('HH:mm');
      let monthday = moment(this.data.event.start).date();
      this.eventForm = this.fb.group({
        groupTraining: new FormControl(this.data.event.title? res.find(g => g.name.toLowerCase().includes(this.data.event.title.toLowerCase())) : '', [Validators.required]),
        start: new FormControl(startTime),
        end: new FormControl(endTime),
        byweekday: new FormControl(weekday),
      });
    });

  }

  getFilteredGroups(phrase: string | GroupTrainingToDisplay) {
    return typeof phrase === "string"? this.store$.pipe(
      select(fromGroup.selectAllGroupTrainingsWithData),
      map(group =>  group.filter(g => (g.name.toLowerCase().includes(phrase.toLowerCase()) || g.trainer.toLowerCase().includes(phrase.toLowerCase()) || g.room.toLowerCase().includes(phrase.toLowerCase()))))
    ) : of([]);
  }

  displayFn(value) {
    return value? `${value.name} - ${value.trainer} | ${value.room}` : '';
  }

  saveEvent() {
    if (this.eventForm.valid) {
      let form = this.eventForm.value;
      let finalEvent = this.data.event;
      let splittedStart = form.start.split(':');
      let splittedEnd = form.end.split(':');
      let weekday = moment(this.data.event.start).weekday();
      let weekdayShift = 0;
      if (weekday !== form.byweekday) {
        weekday < form.byweekday? weekdayShift = form.byweekday - weekday : weekdayShift = -1 * (weekday - form.byweekday);
      }
      finalEvent.start = moment(finalEvent.start).set('hour', splittedStart[0]).set('minute', splittedStart[1]).toDate();
      finalEvent.end = moment(finalEvent.end).set('hour', splittedEnd[0]).set('minute', splittedEnd[1]).toDate();
      finalEvent.start = moment(finalEvent.start).add(weekdayShift, 'day').toDate();
      finalEvent.end = moment(finalEvent.end).add(weekdayShift, 'day').toDate();

      let event: GroupTrainingEvent = {
        groupID: form.groupTraining.groupID,
        byweekday: form.byweekday,
        hourStart: form.start,
        hourEnd: form.end,
        color: form.groupTraining.color,
        title: form.groupTraining.name,
        eventID: this.data.event.meta.eventID? this.data.event.meta.eventID : null,
      }

      this.groupTrainingService.saveGroupTrainingEvent(event);
      this.dialog.closeAll();
      
    } else {
    }

  }

}
