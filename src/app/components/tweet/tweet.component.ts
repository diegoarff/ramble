import { Component, Input, OnInit, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ITweet } from 'src/app/interfaces/Tweets';
import { TweetsService } from 'src/app/services/tweets.service';
import { Preferences } from '@capacitor/preferences';
import { ModalController } from '@ionic/angular';
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
  @Input() tweet: ITweet = {} as ITweet;
  loading: boolean = false;
  checkUser: boolean = false;

  @ViewChild('popover') popover: any;
  ngOnInit() {
    this.getUserID();
    console.log(this.tweet);
  }


  redirectToTweet() {
    this.router.navigate(['/view-tweet', this.tweet._id], {
      state: { tweet: this.tweet },
    });
  }

async getUserID(){
  const { value } =  await Preferences.get({ key: 'userId' });
  this.checkUser = (this.tweet.user._id == value);
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

  showOptions(event: any) {
    this.popover.event = event;
    this.popover.present();
  }

  async deleteTweet() {
    const res = await this.tweetService.deleteTweet(this.tweet._id);
    if (res.status === 'success') {
      window.location.reload();
    }
    this.popover.dismiss();
  }

async  sendToReply() {
    const res = await this.tweetService.getTweet(this.tweet.isReplyTo!)
    
  this.router.navigate(['/view-tweet', this.tweet.isReplyTo], {state: { tweet: res.data } })
  }

  async openEditModal(){
    
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
