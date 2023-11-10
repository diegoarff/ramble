import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewTweetPageRoutingModule } from './view-tweet-routing.module';

import { ViewTweetPage } from './view-tweet.page';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewTweetPageRoutingModule,
    SharedComponentsModule
  ],
  declarations: [ViewTweetPage]
})
export class ViewTweetPageModule {}
