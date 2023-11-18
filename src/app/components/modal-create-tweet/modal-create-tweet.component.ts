import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  LoadingController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { GetImageService } from 'src/app/services/get-image.service';
import { TweetsService } from 'src/app/services/tweets.service';

@Component({
  selector: 'app-modal-create-tweet',
  templateUrl: './modal-create-tweet.component.html',
  styleUrls: ['./modal-create-tweet.component.scss'],
})
export class ModalCreateTweetComponent implements OnInit {
  createTweetForm: FormGroup = new FormGroup({});

  private imageService = inject(GetImageService);
  private tweetsService = inject(TweetsService);
  private modalCtrl = inject(ModalController);
  private formBuilder = inject(FormBuilder);
  private toastCtrl = inject(ToastController);
  private loadingCtrl = inject(LoadingController);

  tweetId: string = '';
  image: any = null;
  blob: any = null;
  content: any;
  loading: boolean = false;

  ngOnInit() {
    this.createTweetForm = this.formBuilder.group({
      content: ['', [Validators.required]],
    });
  }

  async uploadImage() {
    const res = await this.imageService.takePicture();
    if (res) {
      this.image = res.image;
      this.blob = res.blob;
    }
  }

  async createTweet() {
    if (this.createTweetForm.invalid) {
      return;
    }

    this.loading = true;

    const { content } = this.createTweetForm.value;

    let image = '';

    try {
      if (this.image) {
        const loading = await this.loadingCtrl.create({
          spinner: 'crescent',
        });

        await loading.present();
        image = await this.imageService.uploadImage(this.blob, this.image);
        await loading.dismiss();
      }

      const tweet = { content, image };

      const toast = await this.toastCtrl.create({
        message: 'Ramble created',
        duration: 2000,
        icon: 'checkmark-circle-outline',
        color: 'success',
        position: 'bottom',
      });

      if (this.tweetId) {
        await this.tweetsService.replyToTweet(this.tweetId, tweet);
      } else {
        await this.tweetsService.createTweet(tweet);
      }

      await toast.present();

      this.loading = false;

      return this.modalCtrl.dismiss(true);
    } catch (error) {
      console.log(error);
      return;
    }
  }

  dismissModal() {
    return this.modalCtrl.dismiss(true);
  }

  removeImage() {
    this.image = null;
    this.blob = null;
  }
}
