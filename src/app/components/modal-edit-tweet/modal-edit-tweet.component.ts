import { Component, OnInit, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ITweet } from 'src/app/interfaces/Tweets';
import { GetImageService } from 'src/app/services/get-image.service';
import { TweetsService } from 'src/app/services/tweets.service';

@Component({
  selector: 'app-modal-edit-tweet',
  templateUrl: './modal-edit-tweet.component.html',
  styleUrls: ['./modal-edit-tweet.component.scss'],
})
export class ModalEditTweetComponent  implements OnInit {

  createTweetForm: FormGroup = new FormGroup({});
  @Input() tweet: ITweet = {} as ITweet;

  private imageService = inject(GetImageService);
  private tweetsService = inject(TweetsService);
  private modalCtrl = inject(ModalController);
  private formBuilder = inject(FormBuilder);

  tweetId: string = '';
  image: any = null;
  blob: any = null;
  content: any;
  validateIMG: boolean = false;
  firebaseImage: any = null;
  ngOnInit() {
    this.image = this.tweet.image;
    console.log(this.tweetId);
    this.createTweetForm = this.formBuilder.group({
      content: [this.tweet.content, [Validators.required]],
    });
    console.log(this.tweet);
  }

  async uploadImage() {
    const res = await this.imageService.takePicture();
    this.validateIMG= true;
    if (res) {
      this.image = res.image.dataUrl;
      this.firebaseImage = res.image;
      this.blob = res.blob;
    }
  }

  async editTweet() {
    if (this.createTweetForm.invalid) return;
    const { content } = this.createTweetForm.value;

    let image = '';

    if (this.image && this.validateIMG == true) {
      image = await this.imageService.uploadImage(this.blob, this.firebaseImage);
    } else{
      image = this.image;
    }

    const tweet = { content, image };

    await this.tweetsService.updateTweet(this.tweet._id, tweet)

    return this.modalCtrl.dismiss(true);
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
