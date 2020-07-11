import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UserProfile } from 'src/app/shared/models/user.models';
import { Store, select } from '@ngrx/store';
import * as fromUsers from '../../../../store/users';

@Component({
  selector: 'app-trainer-profile',
  templateUrl: './trainer-profile.component.html',
  styleUrls: ['./trainer-profile.component.scss']
})
export class TrainerProfileComponent implements OnInit {

  trainer$: Observable<UserProfile>;

  constructor(
    private route: ActivatedRoute,
    private store$: Store<fromUsers.State>
  ) {
    this.route.params.subscribe(res => {
      this.trainer$ = this.store$.pipe(select(fromUsers.selectSingleUser(res.id)));
    })
   }

  ngOnInit(): void {

  }

}
