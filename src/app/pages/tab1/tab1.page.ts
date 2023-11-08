import { Component, OnInit, inject } from '@angular/core';
import { TweetsService } from 'src/app/services/tweets.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  tweetsService = inject(TweetsService);

  ngOnInit(): void {
    this.tweetsService.getRecentTweets().subscribe((response) => {
      console.log(response.data);
    });
  }
}
