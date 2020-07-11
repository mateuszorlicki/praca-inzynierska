import { Component, OnInit, Input, Output, EventEmitter, SimpleChange, SimpleChanges } from '@angular/core';
import { Pass } from 'src/app/shared/models/pass.model';
import * as moment from 'moment';
import { PassService } from 'src/app/gym-firebase/services/pass.service';
import { Store } from '@ngrx/store';
import * as fromPass from '../../../../store/pass';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-edit-pass-modal',
  templateUrl: './add-edit-pass-modal.component.html',
  styleUrls: ['./add-edit-pass-modal.component.scss']
})
export class AddEditPassModalComponent implements OnInit {

  @Input() pass: Pass;
  @Output() onClose: EventEmitter<any> = new EventEmitter();

  now = moment();
  passForm: FormGroup
  ngOnChanges(changes: SimpleChanges) {
    if (changes.pass) {
       this.passForm = this.fb.group({
        passID: new FormControl(this.pass? this.pass.passID : null, [Validators.required]),
        name: new FormControl(this.pass? this.pass.name : null, [Validators.required]),
        priceNormal: new FormControl(this.pass? this.pass.priceNormal : null, [Validators.required]),
        priceDiscount: new FormControl(this.pass? this.pass.priceDiscount : null, [Validators.required]),
        validityNumber: new FormControl(this.pass? this.pass.validityNumber : null, [Validators.required]),
        passType: new FormControl(1),
      })
    }
  }

  constructor(private passService: PassService, private store$: Store, private fb: FormBuilder) { }

  ngOnInit(): void {
  }
  
  getPassValidTo() {
    return this.passService.getPassValidTo(this.pass);
  }

  close() {
    this.onClose.emit();
  }

  savePass() {
    let pass: Pass = {
      ...this.passForm.value,
      isGroupTraining: this.passForm.controls.passType.value === 1,
      isPersonalTraining: this.passForm.controls.passType.value === 2,
      isOnlyGym: this.passForm.controls.passType.value === 3,
    }
    this.store$.dispatch(fromPass.savePass({pass}));
    this.close();
  }
}
