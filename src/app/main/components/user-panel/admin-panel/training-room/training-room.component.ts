import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromTrainingRoom from '../../../../../store/training-room';
import { Observable } from 'rxjs';
import { TrainingRoom } from 'src/app/shared/models/training-room.model';
import { FormBuilder, FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { TrainingRoomService } from 'src/app/gym-firebase/services/training-room.service';
@Component({
  selector: 'app-training-room',
  templateUrl: './training-room.component.html',
  styleUrls: ['./training-room.component.scss']
})
export class TrainingRoomComponent implements OnInit {

  trainingRooms: Array<TrainingRoom>;

  newRoom: boolean = false;

  editedRooms: Array<string> = [];

  roomsForm: FormArray = this.fb.array([]);

  displayedColumns: string[] = ['name', 'actions'];
  constructor(
    private store$: Store,
    private fb: FormBuilder,
    private trainingRoomService: TrainingRoomService
  ) { }

  ngOnInit(): void {
    this.store$.pipe(select(fromTrainingRoom.selectAllTrainingRooms)).subscribe(rooms => {
      this.trainingRooms = rooms;
      this.trainingRooms.forEach((room, index) => {
        this.roomsForm.insert(index, this.createRoomFormFields(room))
      });
    })
  }

  createRoomFormFields(room?: TrainingRoom) {
    return new FormGroup({
      roomID: new FormControl(room? room.roomID : null, [Validators.required]),
      name: new FormControl(room? room.name : null, [Validators.required])
    });
  }

  addTrainingRoom() {
    this.newRoom = true;
    const roomsLength = this.roomsForm.length;
    this.roomsForm.insert(
      roomsLength, 
      this.createRoomFormFields()
    );
  }

  saveNewRoom(formGroup: FormGroup) {
    const room = formGroup.value;
    this.newRoom = false;
    this.roomsForm.removeAt(this.roomsForm.length - 1);
    this.store$.dispatch(fromTrainingRoom.saveTrainingRoom({trainingRoom: room}))
  }

  editTrainingRoom(room: TrainingRoom) {
    this.editedRooms.push(room.roomID);
  }

  cancelEditTrainingRoom(room: TrainingRoom) {
    this.editedRooms = this.editedRooms.filter(r => r !== room.roomID);
  }

  cancelAddTrainingRoom() {
    this.roomsForm.removeAt(this.roomsForm.length - 1);
    this.newRoom = false;
  }

  saveTrainingRoom(formGroup: FormGroup) {
    const room = formGroup.value;
    this.cancelEditTrainingRoom(room);
    this.store$.dispatch(fromTrainingRoom.saveTrainingRoom({trainingRoom: room}))
  }

  getFormGroupFromArray(index: number) {
    return this.roomsForm.at(index) as FormGroup;
  }
}
