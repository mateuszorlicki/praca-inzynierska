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
  selector: 'app-personal-trainings',
  templateUrl: './personal-trainings.component.html',
  styleUrls: ['./personal-trainings.component.scss']
})
export class PersonalTrainingsComponent implements OnInit {

  trainers$: Observable<Array<UserProfile>> = this.store$.pipe(select(fromUsers.selectAllTrainers));

  userPersonal: UserPersonal;

  count$: Observable<number> = this.store$.pipe(select(fromPersonal.selectCountUserLeftPersonal));

  acceptedTrainings$: Observable<Array<PersonalTrainingEvent>> = this.store$.pipe(select(fromPersonalTraining.selectAcceptedPersonalTrainings));
  notAcceptedTrainings$: Observable<Array<PersonalTrainingEvent>> = this.store$.pipe(select(fromPersonalTraining.selectNotAcceptedPersonalTrainings));

  newPersonalForm: FormGroup = this.fb.group({
    dateStart: new FormControl(null, [Validators.required]),
    hourStart: new FormControl(null, [Validators.required]),
  })

  constructor(private store$: Store, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.store$.pipe(
      select(fromPersonal.selectUserPersonals)).subscribe(res => {
        console.log(res);
        this.userPersonal = res
      })
  }

  setTrainer(trainerID: string) {
    this.store$.dispatch(fromPersonal.setTrainer({trainerID}))
  }

  getTrainer() {
    return this.store$.pipe(select(fromUsers.selectSingleUser(this.userPersonal.trainerID)))
  }

  getUser() {
    return this.store$.pipe(select(fromUsers.selectSingleUser(this.userPersonal.userID)))
  }

  saveTraining(){ 
    const date = new Date(this.newPersonalForm.controls.dateStart.value);
    let time = (this.newPersonalForm.controls.hourStart.value as string).split(':');
    const dateStart = moment(date).set('hour',  parseInt(time[0])).set('minute',  parseInt(time[1]));
    const dateEnd = moment(date).set('hour',  parseInt(time[0]) + 1).set('minute',  parseInt(time[1]));
    let personalTrainingEvent: PersonalTrainingEvent = {
      userID: this.userPersonal.userID,
      trainerID: this.userPersonal.trainerID,
      dateStart: dateStart.toISOString(),
      dateEnd: dateEnd.toISOString(),
      isAccepted: false,
      titleForTrainer: '',
      titleForUser: '',
    }
    console.log('train', personalTrainingEvent);
    this.store$.dispatch(fromPersonalTraining.askForTraining({personalTrainingEvent}))
  }

}
