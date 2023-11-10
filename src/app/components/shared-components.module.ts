import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TweetComponent } from './tweet/tweet.component';
import { UserComponent } from './user/user.component';
import { ModalCreateTweetComponent } from './modal-create-tweet/modal-create-tweet.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserSegmentsComponent } from './user-segments/user-segments.component';

@NgModule({
  declarations: [TweetComponent, UserComponent, ModalCreateTweetComponent, UserSegmentsComponent],
  imports: [CommonModule, IonicModule.forRoot(), FormsModule, ReactiveFormsModule],
  exports: [TweetComponent, UserComponent, ModalCreateTweetComponent, UserSegmentsComponent],
})
export class SharedComponentsModule {}
