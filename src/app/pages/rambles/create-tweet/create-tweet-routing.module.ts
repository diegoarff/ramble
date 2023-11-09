import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateTweetPage } from './create-tweet.page';

const routes: Routes = [
  {
    path: '',
    component: CreateTweetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateTweetPageRoutingModule {}
