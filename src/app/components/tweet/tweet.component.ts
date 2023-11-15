import { Component, Input, OnInit, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ITweet } from 'src/app/interfaces/Tweets';
import { TweetsService } from 'src/app/services/tweets.service';
import { Preferences } from '@capacitor/preferences';
import { ModalController, ToastController } from '@ionic/angular';
import { ModalEditTweetComponent } from '../modal-edit-tweet/modal-edit-tweet.component';
import { terminate } from '@angular/fire/firestore';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss'],
})
export class TweetComponent implements OnInit {
  private modalCtrl = inject(ModalController);
  private router = inject(Router);
  private tweetService = inject(TweetsService);
  private toastCtrl = inject(ToastController);

  @Input() tweet: ITweet = {} as ITweet;
  @ViewChild('popover') popover: any;

  loading: boolean = false;
  checkUser: boolean = false;
  authUserId: string | null = '';

  ngOnInit() {
    this.getUserID();
  }

  redirectToTweet() {
    this.router.navigate(['/view-tweet', this.tweet._id], {
      state: { tweet: this.tweet },
    });
  }

  async getUserID() {
    const { value } = await Preferences.get({ key: 'userId' });
    this.checkUser = this.tweet.user._id == value;
    this.authUserId = value;
  }

  redirectToUser() {
    if (this.tweet.user._id === this.authUserId) {
      this.router.navigate(['/my-profile']);
      return;
    }

    this.router.navigate(['/view-user', this.tweet.user._id]);
  }

  async likeTweet(event: Event) {
    event.stopPropagation();
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

  showOptions(event: any) {
    this.popover.event = event;
    this.popover.present();
  }

  async deleteTweet() {
    const toast = await this.toastCtrl.create({
      message: 'Tweet deleted',
      duration: 2000,
      position: 'bottom',
      icon: 'checkmark-circle-outline',
      color: 'success',
    });

    try {
      const res = await this.tweetService.deleteTweet(this.tweet._id);

      if (res.status === 'success') {
        await toast.present();
        // Consider removing this for a better approach
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.popover.dismiss();
    }
  }

  async sendToReply() {
    const res = await this.tweetService.getTweet(this.tweet.isReplyTo!);

    this.router.navigate(['/view-tweet', this.tweet.isReplyTo], {
      state: { tweet: res.data },
    });
  }

  async openEditModal() {
    const modal = await this.modalCtrl.create({
      component: ModalEditTweetComponent,
      componentProps: {
        tweet: this.tweet,
      },
    });

    modal.present();

    const { data } = await modal.onWillDismiss();

    if (data) {
      window.location.reload();
    }
  }
}
