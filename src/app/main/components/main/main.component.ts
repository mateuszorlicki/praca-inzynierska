import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/gym-firebase/services/auth.service';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import * as fromUser from '../../../store/user';
import { UserProfile } from 'src/app/shared/models/user.models';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  isLoggedIn$: Observable<boolean> = this.store$.pipe(select(fromUser.selectIsLoggedIn))
  user$: Observable<UserProfile> = this.store$.pipe(select(fromUser.selectUserProfile))
  constructor(private store$: Store) { }

  ngOnInit(): void {
  }

}
