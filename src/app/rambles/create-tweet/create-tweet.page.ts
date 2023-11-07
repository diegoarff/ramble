import { Component, OnInit } from '@angular/core';
import { GetImageService } from 'src/app/services/get-image.service';

@Component({
  selector: 'app-create-tweet',
  templateUrl: './create-tweet.page.html',
  styleUrls: ['./create-tweet.page.scss'],
})
export class CreateTweetPage implements OnInit {
  image: any;
  constructor( private getImage: GetImageService ) { }

async takePicture() {
  this.image = await this.getImage.takePicture();
}

  ngOnInit() {
  }

}
