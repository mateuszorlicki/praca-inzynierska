import { Component, OnInit } from '@angular/core';
import { GroupTraining } from 'src/app/shared/models/group-training.model';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { GroupTrainingService } from 'src/app/gym-firebase/services/group-trainings.service';
import * as fromGroupTrainings from '../../../../../store/group-trainings';
import * as fromUsers from '../../../../../store/users';
import * as fromTrainingRoom from '../../../../../store/training-room';
import { UserProfile } from 'src/app/shared/models/user.models';
import { Observable, of } from 'rxjs';
import { TrainingRoom } from 'src/app/shared/models/training-room.model';
import { filter, map } from 'rxjs/operators';

export interface EditedGroup {
  groupID: string,
  trainerAutocomplete: FormControl,
  roomAutocomplete: FormControl
}

@Component({
  selector: 'app-group-trainings',
  templateUrl: './group-trainings.component.html',
  styleUrls: ['./group-trainings.component.scss']
})
export class GroupTrainingsComponent implements OnInit {

  groupTrainings: Array<GroupTraining>;

  newGroup: boolean = false;

  editedGroups: Array<EditedGroup> = [];

  groupsForm: FormArray = this.fb.array([]);

  displayedColumns: string[] = ['name', 'trainer', 'room', 'color', 'actions'];

  newTrainerAutocomplete: FormControl = new FormControl(null);
  newRoomAutocomplete: FormControl = new FormControl(null);

  constructor(
    private store$: Store,
    private fb: FormBuilder,
    private groupTrainingService: GroupTrainingService
  ) { }

  ngOnInit(): void {
    this.store$.pipe(select(fromGroupTrainings.selectAllGroupTrainings)).subscribe(groups => {
      this.groupTrainings = groups;
      this.groupTrainings.forEach((group, index) => {
        this.groupsForm.insert(index, this.createGroupFormFields(group))
      });
    });


  }

  getUserByID(userID: string) {
    return this.store$.pipe(select(fromUsers.selectSingleUser(userID)));
  }

  getRoomByID(roomID: string) {
    return this.store$.pipe(select(fromTrainingRoom.selectSingleTrainingRoom, { id: roomID}));
  }

  getFilteredTrainers(phrase: string | UserProfile) {
    return typeof phrase === "string"? this.store$.pipe(
      select(fromUsers.selectAllTrainers),
      map(users =>  users.filter(u => (u.firstName.toLowerCase().includes(phrase.toLowerCase())) || (u.lastName.toLowerCase().includes(phrase.toLowerCase())) ))
    ) : of([]);
  }

  getFilteredRooms(phrase: string | UserProfile) {
    return typeof phrase === "string"? this.store$.pipe(
      select(fromTrainingRoom.selectAllTrainingRooms),
      map(users =>  users.filter(u => (u.name.toLowerCase().includes(phrase.toLowerCase()))))
    ) : of([]);
  }

  setColor(formIndex: number, event: any) {
    this.getFormGroupFromArray(formIndex).controls.color.setValue(event.color.hex);
  }

  createGroupFormFields(group?: GroupTraining) {
    return new FormGroup({
      groupID: new FormControl(group? group.groupID : null, [Validators.required]),
      trainerID: new FormControl(group? group.trainerID : null, [Validators.required]),
      roomID: new FormControl(group? group.roomID : null, [Validators.required]),
      name: new FormControl(group? group.name : null, [Validators.required]),
      color: new FormControl(group? group.color : null)
    });
  }

  cancelEditGroupTraining(group: GroupTraining) {
    this.editedGroups = this.editedGroups.filter(r => r.groupID !== group.groupID);
  }

  cancelAddGroupTraining() {
    this.groupsForm.removeAt(this.groupsForm.length - 1);
    this.newGroup = false;
  }

  saveGroupTraining(formGroup: FormGroup) {
    const group: GroupTraining = formGroup.value;
    this.cancelEditGroupTraining(group);
    this.store$.dispatch(fromGroupTrainings.saveGroupTraining({groupTraining: group}))
  }

  addGroupTraining() {
    this.newGroup = true;
    const groupsLength = this.groupsForm.length;
    this.groupsForm.insert(
      groupsLength, 
      this.createGroupFormFields()
    );
  }

  editGroupTraining(group: GroupTraining, trainer, room) {
    this.editedGroups.push({
      groupID: group.groupID,
      roomAutocomplete: new FormControl(room),
      trainerAutocomplete: new FormControl(trainer),
    });
  }

  getFormGroupFromArray(index: number) {
    return this.groupsForm.at(index) as FormGroup;
  }

  setTrainer(formIndex: number, event: any) {
    this.getFormGroupFromArray(formIndex).controls.trainerID.setValue(event.uid);
  }

  setTrainingRoom(formIndex: number, event: any) {
    this.getFormGroupFromArray(formIndex).controls.roomID.setValue(event.roomID);
  }

  displayTrainerFn(value: UserProfile): string {
    return value? value.displayName : '';
  }

  selectTrainer(event, index) {
    this.getFormGroupFromArray(index).controls.trainerID.setValue(event.option.value.uid);
  }

  displayRoomFn(value: TrainingRoom) {
    return value? value.name : '';
  }

  selectRoom(event, index) {
    this.getFormGroupFromArray(index).controls.roomID.setValue(event.option.value.roomID);
  }

  isEdited(groupID: string) {
    return this.editedGroups.find(e => e.groupID === groupID) !== undefined
  }

  getEditedGroupByID(groupID: string) {
    return this.editedGroups.find(e => e.groupID === groupID);
  }
}
