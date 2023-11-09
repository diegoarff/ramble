import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tweet-template',
  templateUrl: './tweet-template.component.html',
  styleUrls: ['./tweet-template.component.scss'],
})
export class TweetTemplateComponent  implements OnInit {

  image: string = "";

  constructor() { }

  ngOnInit() {}

}
