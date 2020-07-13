import { Component, OnInit } from '@angular/core';
import { Observable, forkJoin, Subscription } from 'rxjs';
import { UserProfile, UserPersonal } from 'src/app/shared/models/user.models';
import * as fromUsers from '../../../store/users';
import * as fromPersonal from '../../../store/user-personal';
import * as fromPersonalTraining from '../../../store/personal-trainings';
import * as moment from 'moment';

import { select, Store } from '@ngrx/store';
import { tap, first } from 'rxjs/operators';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { PersonalTrainingEvent } from 'src/app/shared/models/personal-training.model';

@Component({
  selector: 'app-personal-trainings-trainer',
  templateUrl: './personal-trainings-trainer.component.html',
  styleUrls: ['./personal-trainings-trainer.component.scss']
})
export class PersonalTrainingsTrainerComponent implements OnInit {

  trainers$: Observable<Array<UserProfile>> = this.store$.pipe(select(fromUsers.selectAllTrainers));

  acceptedTrainings$: Observable<Array<PersonalTrainingEvent>> = this.store$.pipe(select(fromPersonalTraining.selectAcceptedPersonalTrainings));
  notAcceptedTrainings$: Observable<Array<PersonalTrainingEvent>> = this.store$.pipe(select(fromPersonalTraining.selectNotAcceptedPersonalTrainings));

  newPersonalForm: FormGroup = this.fb.group({
    dateStart: new FormControl(null, [Validators.required]),
    hourStart: new FormControl(null, [Validators.required]),
  })

  constructor(private store$: Store, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  setTrainer(trainerID: string) {
    this.store$.dispatch(fromPersonal.setTrainer({trainerID}))
  }

  acceptTraining(event: PersonalTrainingEvent){ 
    let personalTrainingEvent: PersonalTrainingEvent = {
      ...event,
      isAccepted: true
    }
    this.store$.dispatch(fromPersonalTraining.acceptTraining({personalTrainingEvent}))
  }

  declineTraining(personalTrainingEvent: PersonalTrainingEvent){ 
    this.store$.dispatch(fromPersonalTraining.declineTraining({personalTrainingEvent}))
  }

  trainingCollides(personalTrainingEvent: PersonalTrainingEvent) {
    return this.store$.pipe(select(fromPersonalTraining.selectTrainingCollides(personalTrainingEvent.eventID)))
  }

}
