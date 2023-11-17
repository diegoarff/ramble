import { Component, OnInit, inject, Input } from '@angular/core';
import { ITweet } from 'src/app/interfaces/Tweets';
import { TweetsService } from 'src/app/services/tweets.service';

@Component({
  selector: 'app-user-segments',
  templateUrl: './user-segments.component.html',
  styleUrls: ['./user-segments.component.scss'],
})
export class UserSegmentsComponent implements OnInit {
  private tweetsService = inject(TweetsService);

  @Input() userId: string | null = '';
  segment: string = 'rambles';
  tweets: ITweet[] = [];

  segments: any = [
    {
      name: 'rambles',
      function: this.tweetsService.getTweetsFromUser.bind(this.tweetsService),
    },
    {
      name: 'replies',
      function: this.tweetsService.getReplyTweetsFromUser.bind(this.tweetsService),
    },
    {
      name: 'likes',
      function: this.tweetsService.getLikedTweetsFromUser.bind(this.tweetsService),
    },
  ];

  constructor() {}

  ngOnInit() {
    this.loadTweets();
  }

  async segmentChanged(event: any) {
    this.segment = event.target.value;
    await this.loadTweets();
  }

  async loadTweets() {
    const res = await this.segments
      .find((segment: any) => segment.name === this.segment).function(this.userId)

    if (res.status === 'success') {
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

    const res = await this.segments
      .find((segment: any) => segment.name === this.segment)
      .function(this.userId, queryParams);

    if (res.status === 'success') {
      this.tweets = this.tweets.concat(res.data);
    }

    event.target.complete();
  }
}
