import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalCreateTweetComponent } from 'src/app/components/modal-create-tweet/modal-create-tweet.component';
import { ITweet } from 'src/app/interfaces/Tweets';
import { TweetsService } from 'src/app/services/tweets.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  private tweetsService = inject(TweetsService);
  private modalCtrl = inject(ModalController);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  segment: string = 'recent';
  tweets: ITweet[] = [];

  ngOnInit() {
    this.loadTweets();

    this.activatedRoute.queryParams.subscribe((params) => {
      if (this.tweets.length === 0) {
        return;
      }

      if (params['filterOut']) {
        this.tweets = this.tweets.filter(
          (tweet) => tweet._id !== params['filterOut']
        );
      }
    });
  }

  async segmentChanged(event: any) {
    this.segment = event.target.value;
    await this.loadTweets();
  }

  async createTweet() {
    const modal = await this.modalCtrl.create({
      component: ModalCreateTweetComponent,
      componentProps: {
        tweetId: '',
      },
    });

    modal.present();

    const { data } = await modal.onWillDismiss();

    if (data) {
      this.loadTweets();
    }
  }

  async redirectToProfile() {
    this.router.navigate(['/my-profile']);
  }

  async loadTweets() {
    if (this.segment === 'recent') {
      const res = await this.tweetsService.getRecentTweets();
      if (res.status === 'success') {
        this.tweets = res.data;
      }
    }

    if (this.segment === 'following') {
      const res = await this.tweetsService.getFollowingTweets();
      if (res.status === 'success') {
        this.tweets = res.data;
      }
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
