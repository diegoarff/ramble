import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TweetComponent } from './tweet/tweet.component';
import { UserComponent } from './user/user.component';
import { ModalCreateTweetComponent } from './modal-create-tweet/modal-create-tweet.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserSegmentsComponent } from './user-segments/user-segments.component';
import { ModalEditTweetComponent } from './modal-edit-tweet/modal-edit-tweet.component';

@NgModule({
  declarations: [TweetComponent, UserComponent, ModalCreateTweetComponent, UserSegmentsComponent, ModalEditTweetComponent],
  imports: [CommonModule, IonicModule.forRoot(), FormsModule, ReactiveFormsModule],
  exports: [TweetComponent, UserComponent, ModalCreateTweetComponent, UserSegmentsComponent, ModalEditTweetComponent],
})
export class SharedComponentsModule {}
