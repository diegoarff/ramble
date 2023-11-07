import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateTweetPageRoutingModule } from './create-tweet-routing.module';

import { CreateTweetPage } from './create-tweet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateTweetPageRoutingModule
  ],
  declarations: [CreateTweetPage]
})
export class CreateTweetPageModule {}
