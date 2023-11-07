import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RambleViewsPageRoutingModule } from './ramble-views-routing.module';

import { RambleViewsPage } from './ramble-views.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RambleViewsPageRoutingModule
  ],
  declarations: [RambleViewsPage]
})
export class RambleViewsPageModule {}
