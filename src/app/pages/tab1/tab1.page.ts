import { Component, OnInit, inject } from '@angular/core';
import { TweetsService } from 'src/app/services/tweets.service';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  tweetsService = inject(TweetsService);

  async ngOnInit() {
    await this.getRecentTweets();
  }

  async getRecentTweets() {
    const res = await this.tweetsService.getRecentTweets();
    console.log(res);
  }
}
