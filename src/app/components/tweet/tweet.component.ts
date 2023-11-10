import { Component, Input, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ITweet } from 'src/app/interfaces/Tweets';
import { TweetsService } from 'src/app/services/tweets.service';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss'],
})
export class TweetComponent implements OnInit {
  private router = inject(Router);
  private tweetService = inject(TweetsService);
  @Input() tweet: ITweet = {} as ITweet;
  loading: boolean = false;

  ngOnInit() {}

  redirectToTweet() {
    this.router.navigate(['/view-tweet', this.tweet._id], {
      state: { tweet: this.tweet },
    });
  }

  redirectToUser() {
    this.router.navigate(['/view-user', this.tweet.user._id]);
  }
  
  async likeTweet() {
    if (this.loading) return;
    this.loading = true;
    const res = await this.tweetService.likeTweet(this.tweet._id!);

    if (res.status === 'success') {
      if (res.message === 'Tweet liked') {
        this.tweet.likeCount++;
        this.tweet.liked = true;
      } else if (res.message === 'Tweet unliked') {
        this.tweet.likeCount--;
        this.tweet.liked = false;
      }
    }
    this.loading = false;
  }
}
