import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
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

  tweetId: string = '';
  image: any = null;
  blob: any = null;
  content: any;

  ngOnInit() {
    console.log(this.tweetId);
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
    if (this.createTweetForm.invalid) return;
    const { content } = this.createTweetForm.value;

    let image = '';

    if (this.image) {
      image = await this.imageService.uploadImage(this.blob, this.image);
    }

    const tweet = { content, image };

    if (this.tweetId) {
      await this.tweetsService.replyToTweet(this.tweetId, tweet);
    } else {
      await this.tweetsService.createTweet(tweet);
    }

    return this.modalCtrl.dismiss(true);
  }

  dismissModal() {
    return this.modalCtrl.dismiss(true);
  }

  removeImage() {
    this.image = null;
    this.blob = null;
  }
}
