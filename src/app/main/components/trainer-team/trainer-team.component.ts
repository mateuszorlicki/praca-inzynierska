import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromUsers from '../../../store/users';
import { UserProfile } from 'src/app/shared/models/user.models';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-trainer-team',
  templateUrl: './trainer-team.component.html',
  styleUrls: ['./trainer-team.component.scss']
})
export class TrainerTeamComponent implements OnInit {

  trainers$: Observable<Array<UserProfile>> = this.store$.pipe(select(fromUsers.selectAllTrainers));

  constructor(
    private store$: Store<fromUsers.State>
  ) { }

  ngOnInit(): void {
  }

}
