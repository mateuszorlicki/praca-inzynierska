import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromUsers from './store/users';
import * as fromPass from './store/pass';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'gym';

  constructor(
    private store$: Store,
  ) {
    this.store$.dispatch(fromUsers.getAllUsersRequest());
    this.store$.dispatch(fromPass.getAllPassesRequest())
  }
}
