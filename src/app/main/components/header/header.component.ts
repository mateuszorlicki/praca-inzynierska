import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/gym-firebase/services/auth.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from 'src/app/gym-firebase/services/user.service';
import { UserProfile, Roles } from 'src/app/shared/models/user.models';
import { Observable } from 'rxjs';
import * as fromUser from '../../../store/user';
import { Store, select } from '@ngrx/store';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user$: Observable<UserProfile>;
  isLoggedIn$: Observable<boolean>;

  Roles = Roles;

  logout() {
    this.store$.dispatch(fromUser.userLogOut());
  }

  login() {
    this.router.navigate(['/login']);
  }

  goTo(route: string) {
    this.router.navigate([route]);
  }
  
  constructor(
    private store$: Store<fromUser.State>,
    private router: Router) { }

  ngOnInit(): void {
    this.user$ = this.store$.pipe(select(fromUser.selectUserProfile));
    this.isLoggedIn$ = this.store$.pipe(select(fromUser.selectIsLoggedIn));

  }

}
