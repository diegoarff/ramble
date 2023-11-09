import { Component, Input, OnInit, inject } from '@angular/core';
import {
  InfiniteScrollCustomEvent,
  RefresherCustomEvent,
} from '@ionic/angular';
import { ITweet } from 'src/app/interfaces/Tweets';
import { TweetsService } from 'src/app/services/tweets.service';

type ITweetMethods =
  | ''
  | 'getRecentTweets'
  | 'getFollowingTweets'
  | 'getTweetsFromUser'
  | 'getReplyTweetsFromUser'
  | 'getLikedTweetsFromUser'
  | 'getRepliesFromTweet'
  | 'searchTweets';

@Component({
  selector: 'app-tweet-list',
  templateUrl: './tweet-list.component.html',
  styleUrls: ['./tweet-list.component.scss'],
})
export class TweetListComponent implements OnInit {
  @Input() method: ITweetMethods = '';
  @Input() userId: string = '';

  tweets: ITweet[] = [];
  isLoading: boolean = false;
  tweetsService = inject(TweetsService);
  getTweetsFunction: any;

  ngOnInit() {
    this.getTweetsFunction = this.tweetsService
      .getMethod(this.method)
      .bind(this.tweetsService);
    this.loadTweets();
  }

  async loadTweets() {
    this.isLoading = true;
    let res;

    // Utiliza la función proporcionada para obtener tweets.
    if (this.userId === '') {
      res = await this.getTweetsFunction(this.userId);
    } else {
      res = await this.getTweetsFunction();
    }
    this.tweets = res.data;

    this.isLoading = false;
  }

  async loadMoreTweets(event: InfiniteScrollCustomEvent) {
    if (this.tweets.length === 0) {
      event.target.complete();
      return;
    }

    const lastTweet = this.tweets[this.tweets.length - 1];
    const queryParams = { date: lastTweet.createdAt };

    let res;

    if (this.userId === '') {
      res = await this.getTweetsFunction(queryParams);
    } else {
      res = await this.getTweetsFunction(this.userId, queryParams);
    }

    const moreTweets = res.data;

    if (moreTweets.length > 0) {
      this.tweets = this.tweets.concat(moreTweets);
    }

    event.target.complete();
  }

  onRefresh(event: RefresherCustomEvent) {
    this.loadTweets().then(() => {
      event.target.complete();
    });
  }
}
