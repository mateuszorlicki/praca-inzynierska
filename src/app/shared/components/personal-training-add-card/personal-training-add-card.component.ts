import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserProfile } from '../../models/user.models';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import * as fromPersonal from '../../../store/personal-trainings'
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-personal-training-add-card',
  templateUrl: './personal-training-add-card.component.html',
  styleUrls: ['./personal-training-add-card.component.scss']
})
export class PersonalTrainingAddCardComponent implements OnInit {

  @Input() trainer: UserProfile;
  @Output() onSubmit: EventEmitter<FormGroup> = new EventEmitter();

  selectHours = [
    {value: "06:00"},
    {value: "07:00"},
    {value: "08:00"},
    {value: "09:00"},
    {value: "10:00"},
    {value: "11:00"},
    {value: "12:00"},
    {value: "13:00"},
    {value: "14:00"},
    {value: "15:00"},
    {value: "16:00"},
    {value: "17:00"},
    {value: "18:00"},
    {value: "19:00"},
    {value: "20:00"},
    {value: "21:00"}
  ];

  public newPersonalForm: FormGroup = this.fb.group({
    dateStart: new FormControl(moment().locale('pl'), [Validators.required]),
    hourStart: new FormControl("06:00", [Validators.required]),
  })

  constructor(private fb: FormBuilder, private store$: Store) { }

  ngOnInit(): void {
  }

  save() {
    this.onSubmit.emit(this.newPersonalForm);
  }

  canAdd(date) {
    return this.store$.pipe(select(fromPersonal.selectCanUserAddThisDate(date)))
  }

  notColideWithTrainer(hour) {
    return this.store$.pipe(select(fromPersonal.selectNotColideWithTrainer(this.trainer.uid, this.newPersonalForm.controls.dateStart.value, hour)))
  }

  notColideWithUser(hour) {
    return this.store$.pipe(select(fromPersonal.selectNotColideWithUser(this.newPersonalForm.controls.dateStart.value, hour)))
  }

  dateFilter = (d: Date | null): boolean => {
    let canAddDate: boolean = false;
    this.canAdd(d).subscribe(res => {
      canAddDate = res
    });
    return canAddDate
  }
}
