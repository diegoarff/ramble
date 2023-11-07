import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RambleViewsPage } from './ramble-views.page';

const routes: Routes = [
  {
    path: '',
    component: RambleViewsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RambleViewsPageRoutingModule {}
