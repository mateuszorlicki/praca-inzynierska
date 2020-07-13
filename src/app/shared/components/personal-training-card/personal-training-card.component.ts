import { Component, OnInit, Input } from '@angular/core';
import { PersonalTrainingEvent } from 'src/app/shared/models/personal-training.model';
import { UserProfile } from 'src/app/shared/models/user.models';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import * as fromUsers from '../../../store/users'
import * as fromPersonal from '../../../store/personal-trainings'

@Component({
  selector: 'app-personal-training-card',
  templateUrl: './personal-training-card.component.html',
  styleUrls: ['./personal-training-card.component.scss']
})
export class PersonalTrainingCardComponent implements OnInit {

  @Input() training: PersonalTrainingEvent;
  @Input() forTrainer: boolean = false;
  @Input() collision: boolean = false;

  trainer$: Observable<UserProfile>;
  user$: Observable<UserProfile>;

  constructor(private store$: Store) { }

  ngOnInit(): void {
    this.trainer$ = this.store$.pipe(select(fromUsers.selectSingleUser(this.training.trainerID)))
    this.user$ = this.store$.pipe(select(fromUsers.selectSingleUser(this.training.userID)))
  }

}
