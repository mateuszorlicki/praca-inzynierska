import { NgModule } from '@angular/core';
import { UserModule } from './user/user.module';
import { UsersModule } from './users/users.module';
import { PassModule } from './pass/pass.module';

@NgModule({
  declarations: [],
  imports: [
    UserModule,
    UsersModule,
    PassModule
  ]
})
export class CoreStoreModule { }
