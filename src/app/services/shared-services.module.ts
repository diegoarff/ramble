import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { TweetsService } from './tweets.service';
import { UsersService } from './users.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [AuthService, TweetsService, UsersService],
})
export class SharedServicesModule {}
