import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TweetTemplateComponent } from './tweet-template/tweet-template.component';
import { IonicModule } from '@ionic/angular';
import { TweetComponent } from './tweet/tweet.component';
import { TweetListComponent } from './tweet-list/tweet-list.component';

@NgModule({
  declarations: [TweetTemplateComponent, TweetComponent, TweetListComponent],
  imports: [CommonModule, IonicModule.forRoot()],
  exports: [TweetTemplateComponent, TweetComponent, TweetListComponent],
})
export class SharedComponentsModule {}
