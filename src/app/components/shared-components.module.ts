import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TweetTemplateComponent } from './tweet-template/tweet-template.component';
import { IonicModule } from '@ionic/angular';
import { TweetComponent } from './tweet/tweet.component';
import { TweetListComponent } from './tweet-list/tweet-list.component';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [
    TweetTemplateComponent,
    TweetComponent,
    TweetListComponent,
    UserComponent,
  ],
  imports: [CommonModule, IonicModule.forRoot()],
  exports: [
    TweetTemplateComponent,
    TweetComponent,
    TweetListComponent,
    UserComponent,
  ],
})
export class SharedComponentsModule {}
