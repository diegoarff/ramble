import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TweetComponent } from './tweet/tweet.component';
import { UserComponent } from './user/user.component';
import { ModalCreateTweetComponent } from './modal-create-tweet/modal-create-tweet.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TweetComponent, UserComponent, ModalCreateTweetComponent],
  imports: [CommonModule, IonicModule.forRoot(), FormsModule, ReactiveFormsModule],
  exports: [TweetComponent, UserComponent, ModalCreateTweetComponent],
})
export class SharedComponentsModule {}
