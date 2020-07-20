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
  selector: 'app-training-courses-trainer',
  templateUrl: './training-courses-trainer.component.html',
  styleUrls: ['./training-courses-trainer.component.scss']
})
export class TrainingCoursesTrainerComponent implements OnInit {


  trainings$: Observable<Array<GroupTrainingEvent>>;
  constructor(
    private store$: Store,
    private groupTrainingService: GroupTrainingService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.trainings$ = this.store$.pipe(
      select(fromTrainingGroups.selectTrainerGroupTrainingsEvents),
      );
  }

}
