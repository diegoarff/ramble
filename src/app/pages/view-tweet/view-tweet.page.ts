import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalCreateTweetComponent } from 'src/app/components/modal-create-tweet/modal-create-tweet.component';
import { ITweet } from 'src/app/interfaces/Tweets';
import { TweetsService } from 'src/app/services/tweets.service';

@Component({
  selector: 'app-view-tweet',
  templateUrl: './view-tweet.page.html',
  styleUrls: ['./view-tweet.page.scss'],
})
export class ViewTweetPage implements OnInit {
  private tweetService = inject(TweetsService);
  private modalCtrl = inject(ModalController);
  private activatedRoute = inject(ActivatedRoute);
  tweet: ITweet | null = null;
  replies: ITweet[] = [];
  tweetId: string | null = this.activatedRoute.snapshot.paramMap.get('id');

  ngOnInit() {
    this.getTweet();
    this.getReplies();
  }

  async getTweet() {
    try {
      const res = await this.tweetService.getTweet(this.tweetId!);
      if (res.status === 'success') {
        this.tweet = res.data;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getReplies() {
    try {
      const res = await this.tweetService.getRepliesFromTweet(this.tweetId!);
      if (res.status === 'success') {
        this.replies = res.data;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async reply() {
    const modal = await this.modalCtrl.create({
      component: ModalCreateTweetComponent,
      componentProps: {
        tweetId: this.tweetId,
      },
    });

    modal.present();

    const { data } = await modal.onWillDismiss();

    if (data) {
      this.getTweet();
      this.getReplies();
    }
  }
}
