import { Component, Input, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ITweet } from 'src/app/interfaces/Tweets';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss'],
})
export class TweetComponent  implements OnInit {
router = inject(Router);
  @Input() tweet: ITweet = {} as ITweet;

  ngOnInit() {
    
  }
  redirectToTweet() {
    this.router.navigate(['/view-tweet', this.tweet._id], {state: {tweet: this.tweet}});
    }
  redirectToUser() {
    this.router.navigate(['/view-user', this.tweet.user[0]._id]);
    }


}
