import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromPass from '../../../store/pass';
import * as fromUser from '../../../store/user';

import { Pass } from 'src/app/shared/models/pass.model';
import { Observable } from 'rxjs';
import { Roles } from 'src/app/shared/models/user.models';
@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.scss']
})
export class PriceListComponent implements OnInit {

  allPasses$: Observable<Array<Pass>> = this.store$.pipe(select(fromPass.selectAllPasses));
  shouldBuyPass: boolean;
  isAdmin: boolean;

  isLoggedIn$ = this.store$.pipe(select(fromUser.selectIsLoggedIn))
  
  passModalOpened: boolean = false;
  addEditPassModalOpened: boolean = false;
  deleteConfirmModalOpened: boolean = false;

  selectedPass: Pass = null;
  constructor(
    private store$: Store<fromPass.State>
  ) { }

  buyPass(pass: Pass) {
    this.passModalOpened = true;
    this.selectedPass = pass;
  }

  editPass(pass?: Pass) {
    this.addEditPassModalOpened = true;
    this.selectedPass = pass? pass : null;
  }

  closeModal() {
    this.passModalOpened = false;
    this.addEditPassModalOpened = false;
    this.deleteConfirmModalOpened = false;
    this.selectedPass = null;
  }

  openDeleteModal(pass: Pass) {
    this.deleteConfirmModalOpened = true;
    this.selectedPass = pass;

  }

  drop(event) {
  }

  deletePass(pass: Pass) {
    this.store$.dispatch(fromPass.deletePass({passID: pass.passID}));
    this.closeModal();
  }

  ngOnInit(): void {
    this.store$.pipe(select(fromUser.selectUserRoles)).subscribe(roles => {
      this.shouldBuyPass = roles.every(r => r != Roles.TRAINER && r != Roles.GUEST && r != Roles.ADMIN);
      this.isAdmin = roles.includes(Roles.ADMIN);
    })
  }

}
