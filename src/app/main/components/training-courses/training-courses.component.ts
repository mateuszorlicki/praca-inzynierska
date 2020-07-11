import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromTrainingGroups from '../../../store/group-trainings';
import * as fromPass from '../../../store/pass';
import * as fromUserTraining from '../../../store/user-training';
import * as fromGroupTraining from '../../../store/group-trainings';
import { GroupTraining, GroupTrainingEvent } from 'src/app/shared/models/group-training.model';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserTraining } from 'src/app/shared/models/user.models';
import { GroupTrainingService } from 'src/app/gym-firebase/services/group-trainings.service';
import { CalendarView, CalendarEvent } from 'angular-calendar';

@Component({
  selector: 'app-training-courses',
  templateUrl: './training-courses.component.html',
  styleUrls: ['./training-courses.component.scss']
})
export class TrainingCoursesComponent implements OnInit {

  view: CalendarView = CalendarView.Week;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];
  activeDayIsOpen: boolean = true;

  trainings$: Observable<Array<GroupTrainingEvent>>;
  count$: Observable<number>;
  userGroups$: Observable<UserTraining>;
  constructor(
    private store$: Store,
    private groupTrainingService: GroupTrainingService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.trainings$ = this.store$.pipe(
      select(fromTrainingGroups.selectAllGroupTrainingEvents),
      );

      this.count$ = this.store$.pipe(
        select(fromUserTraining.selectCountUserLeftTraining));

      this.userGroups$ = this.store$.pipe(
        select(fromUserTraining.selectUserTrainings)
      )

    this.store$.pipe(
        select(fromGroupTraining.selectAllGroupTrainingEvents)
      ).subscribe(res => {
        let rruleEvents = this.groupTrainingService.mapGroupTrainingEventsToRRuleEvents(res)
        this.events = [];
        this.events = [...this.groupTrainingService.mapRRuleEventsToCalendarEvents(rruleEvents)];
        this.refreshData();
      })
  }

  signGroup(trainingID: string) {
    this.store$.dispatch(fromUserTraining.signGroup({trainingID}))
  }

  isUserSignedInGroup(trainingID: string) {
    return this.store$.pipe(select(fromUserTraining.selectIsUserSigned(trainingID)))
  }

  canUserSignTraining() {
    return this.store$.pipe(select(fromUserTraining.selectCanUserAddTraining));
  }

  private refreshData() {
    this.events = [...this.events];
    this.cdr.detectChanges();
  }
}
