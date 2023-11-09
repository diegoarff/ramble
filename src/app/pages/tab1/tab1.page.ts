import { Component, OnInit, inject } from '@angular/core';
import { TweetsService } from 'src/app/services/tweets.service';
import { ITweet } from 'src/app/interfaces/Tweets';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  tweetsService = inject(TweetsService);
  segment: string = 'recent';
  tweets: ITweet[] = [];

  async ngOnInit() {
    await this.getRecentTweets();
  }

  async getRecentTweets() {
    const res = await this.tweetsService.getRecentTweets();
    this.tweets = res.data;
    console.log(this.tweets);
  }
}
