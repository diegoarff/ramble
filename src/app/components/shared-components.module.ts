import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TweetComponent } from './tweet/tweet.component';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [TweetComponent, UserComponent],
  imports: [CommonModule, IonicModule.forRoot()],
  exports: [TweetComponent, UserComponent],
})
export class SharedComponentsModule {}
