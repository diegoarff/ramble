import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
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
  private router = inject(Router);
  private tweetService = inject(TweetsService);
  private modalCtrl = inject(ModalController);

  replies: ITweet[] = [];

  constructor() {}
  tweet: ITweet = this.router.getCurrentNavigation()!.extras.state!['tweet'];

  ngOnInit() {
    this.getReplies();
  }

  async getReplies() {
    const res = await this.tweetService.getRepliesFromTweet(this.tweet._id!);
    if (res.status === 'success') {
      this.replies = res.data;
    } else {
      // show alert
    }
  }

  async reply() {
    const modal = await this.modalCtrl.create({
      component: ModalCreateTweetComponent,
      componentProps: {
        tweetId: this.tweet._id,
      },
    });

    modal.present();

    const { data } = await modal.onWillDismiss();

    if (data) {
      this.getReplies();
    }
  }
}
