import { Component, OnInit, inject } from '@angular/core';
import { ITweet } from 'src/app/interfaces/Tweets';
import { TweetsService } from 'src/app/services/tweets.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  tweetsService = inject(TweetsService);
  segment: string = 'recent';
  tweets: ITweet[] = [];

  ngOnInit() {
    this.loadTweets();
  }

  // when segment changes, load tweets
  async segmentChanged(event: any) {
    this.segment = event.target.value;
    await this.loadTweets();
  }


  async loadTweets() {
    if (this.segment === 'recent') {
      const res = await this.tweetsService.getRecentTweets();
      console.log(res);
      this.tweets = res.data;
    }

    if (this.segment === 'following') {
      const res = await this.tweetsService.getFollowingTweets();
      this.tweets = res.data;
    }
  }

  onRefresh(event: any) {
    this.loadTweets();
    event.target.complete();
  }

  async loadMore(event: any) {
    const lastTweet = this.tweets[this.tweets.length - 1];
    const queryParams = {
      date: lastTweet.createdAt,
    };

    if (this.segment === 'recent') {
      const res = await this.tweetsService.getRecentTweets(queryParams);
      this.tweets = this.tweets.concat(res.data);
    }

    if (this.segment === 'following') {
      const res = await this.tweetsService.getFollowingTweets(queryParams);
      this.tweets = this.tweets.concat(res.data);
    }

    event.target.complete();
  }
}
