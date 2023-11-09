import { Component, Input, OnInit } from '@angular/core';
import { ITweet } from 'src/app/interfaces/Tweets';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss'],
})
export class TweetComponent  implements OnInit {

  @Input() tweet: ITweet = {} as ITweet;

  ngOnInit() {
    
  }
}
