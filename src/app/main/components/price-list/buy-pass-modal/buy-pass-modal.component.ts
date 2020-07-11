import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pass, Validity } from 'src/app/shared/models/pass.model';
import * as moment from 'moment';
import * as fromPass from '../../../../store/pass';

import { PassService } from 'src/app/gym-firebase/services/pass.service';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-buy-pass-modal',
  templateUrl: './buy-pass-modal.component.html',
  styleUrls: ['./buy-pass-modal.component.scss']
})
export class BuyPassModalComponent implements OnInit {

  @Input() pass: Pass;
  @Output() onClose: EventEmitter<any> = new EventEmitter();

  now = moment();

  constructor(private passService: PassService, private store$: Store) { }

  ngOnInit(): void {
  }
  
  getPassValidTo() {
    return this.passService.getPassValidTo(this.pass);
  }

  close() {
    this.onClose.emit();
  }

  buyPass() {
    this.store$.dispatch(fromPass.buyPass({pass: this.pass}));
    this.close();
  }
}
