import { NgModule } from '@angular/core';
import { UserModule } from './user/user.module';
import { UsersModule } from './users/users.module';
import { PassModule } from './pass/pass.module';
import { TrainingRoomModule } from './training-room/training-room.module';
import { GroupTrainingsModule } from './group-trainings/group-trainings.module';
import { UserTrainingModule } from './user-training/user-training.module';
import { UserPersonalModule } from './user-personal/user-personal.module';
import { PersonalTrainingsModule } from './personal-trainings/personal-trainings.module';

@NgModule({
  declarations: [],
  imports: [
    UserModule,
    UsersModule,
    PassModule,
    TrainingRoomModule,
    GroupTrainingsModule,
    UserTrainingModule,
    UserPersonalModule,
    PersonalTrainingsModule
  ]
})
export class CoreStoreModule { }
