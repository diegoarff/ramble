import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ramble-views',
  templateUrl: './ramble-views.page.html',
  styleUrls: ['./ramble-views.page.scss'],
})
export class RambleViewsPage implements OnInit {

  image: string = "";
  
  constructor() { }

  ngOnInit() {
  }

}
