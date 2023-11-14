import { Component, OnInit, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  LoadingController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { ITweet } from 'src/app/interfaces/Tweets';
import { GetImageService } from 'src/app/services/get-image.service';
import { TweetsService } from 'src/app/services/tweets.service';

@Component({
  selector: 'app-modal-edit-tweet',
  templateUrl: './modal-edit-tweet.component.html',
  styleUrls: ['./modal-edit-tweet.component.scss'],
})
export class ModalEditTweetComponent implements OnInit {
  createTweetForm: FormGroup = new FormGroup({});
  @Input() tweet: ITweet = {} as ITweet;

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
  validateIMG: boolean = false;
  firebaseImage: any = null;

  ngOnInit() {
    this.image = this.tweet.image;
    this.createTweetForm = this.formBuilder.group({
      content: [this.tweet.content, [Validators.required]],
    });
  }

  async uploadImage() {
    const res = await this.imageService.takePicture();
    this.validateIMG = true;
    if (res) {
      this.image = res.image.dataUrl;
      this.firebaseImage = res.image;
      this.blob = res.blob;
    }
  }

  async editTweet() {
    if (this.createTweetForm.invalid) {
      return;
    }

    this.loading = true;

    const { content } = this.createTweetForm.value;

    let image = '';

    try {
      if (this.image && this.validateIMG == true) {
        const loading = await this.loadingCtrl.create({
          spinner: 'crescent',
        });

        await loading.present();
        image = await this.imageService.uploadImage(
          this.blob,
          this.firebaseImage
        );
        await loading.dismiss();
      } else {
        image = this.image;
      }

      const tweet = { content, image };

      const toast = await this.toastCtrl.create({
        message: 'Tweet edited',
        duration: 2000,
        icon: 'checkmark-circle-outline',
        color: 'success',
        position: 'bottom',
      });

      await this.tweetsService.updateTweet(this.tweet._id, tweet);

      await toast.present();

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
    this.firebaseImage = null;
    this.blob = null;
  }
}
