import { Component, OnInit, Input } from '@angular/core';
import { ITweet } from 'src/app/interfaces/Tweets';

@Component({
  selector: 'app-tweet-template',
  templateUrl: './tweet-template.component.html',
  styleUrls: ['./tweet-template.component.scss'],
})
export class TweetTemplateComponent implements OnInit {
  @Input() tweet: ITweet = {} as ITweet;

  ngOnInit() {
    
  }
}
