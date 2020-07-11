import { Component, OnInit } from '@angular/core';
import * as fromUser from '../../../store/user'
import { Store, select } from '@ngrx/store';
import { UserProfile } from 'src/app/shared/models/user.models';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent implements OnInit {

  user$: Observable<UserProfile>;

  editUserForm: FormGroup

  constructor(
    private store$: Store<fromUser.State>,
    private fb: FormBuilder,
  ) { }

  updateProfile(userId) {
    if (this.editUserForm.valid) {
      let controls = this.editUserForm.controls;
      const data: UserProfile = {
        displayName: `${controls.firstName.value} ${controls.lastName.value}`,
        firstName: controls.firstName.value,
        lastName: controls.lastName.value,
        photoURL: controls.photoURL.value,
        aboutMe: controls.aboutMe.value
      }
      this.store$.dispatch(fromUser.updateProfile({ uid: userId, user: data}));
    }
  }

  ngOnInit(): void {
    this.user$ = this.store$.pipe(select(fromUser.selectUserProfile));

    this.store$.pipe(select(fromUser.selectUserProfile)).subscribe(user => {
      this.editUserForm = this.fb.group({
        firstName: new FormControl(user.firstName),
        lastName: new FormControl(user.lastName),
        photoURL: new FormControl(user.photoURL),
        aboutMe: new FormControl(user.aboutMe),
      });
    });

  }

}
