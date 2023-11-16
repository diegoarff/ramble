import { Component, Input, OnInit, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ITweet } from 'src/app/interfaces/Tweets';
import { TweetsService } from 'src/app/services/tweets.service';
import { Preferences } from '@capacitor/preferences';
import {
  AlertController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { ModalEditTweetComponent } from '../modal-edit-tweet/modal-edit-tweet.component';
import { terminate } from '@angular/fire/firestore';
import { Output, EventEmitter } from '@angular/core';
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
  private alertCtrl = inject(AlertController);

  @Output() reloadEvent = new EventEmitter();
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

  redirectToUser(event: Event) {
    event.stopPropagation();

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
    event.stopPropagation();

    this.popover.event = event;
    this.popover.present();
  }

  presentAlert() {
    this.alertCtrl
      .create({
        header: 'Delete Tweet',
        message: 'Are you sure you want to delete this tweet?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              this.popover.dismiss();
            },
          },
          {
            text: 'Delete',
            handler: async () => {
              await this.deleteTweet();
              await this.popover.dismiss();
            },
          },
        ],
      })
      .then((alert) => {
        alert.present();
      });
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

        this.reloadEvent.emit();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async sendToReply(event: Event) {
    event.stopPropagation();

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
      this.popover.dismiss();
      this.reloadEvent.emit();
    }
  }
}
