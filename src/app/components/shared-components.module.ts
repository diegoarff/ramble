import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TweetTemplateComponent } from './tweet-template/tweet-template.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [TweetTemplateComponent],
  imports: [
    CommonModule,
    IonicModule.forRoot()
  ],
   exports: [TweetTemplateComponent]
})
export class SharedComponentsModule { }
