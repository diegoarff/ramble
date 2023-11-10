import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ITweet } from 'src/app/interfaces/Tweets';

@Component({
  selector: 'app-view-tweet',
  templateUrl: './view-tweet.page.html',
  styleUrls: ['./view-tweet.page.scss'],
})
export class ViewTweetPage implements OnInit {
  router = inject(Router);
  constructor() { }
tweet: ITweet  = this.router.getCurrentNavigation()!.extras.state!["tweet"];
  ngOnInit() {
    console.log(this.router.getCurrentNavigation()!.extras.state);
  }

}
