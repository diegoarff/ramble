import { Component, inject } from '@angular/core';
import { SearchbarCustomEvent } from '@ionic/angular';
import { ITweet } from 'src/app/interfaces/Tweets';
import { TweetsService } from 'src/app/services/tweets.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  usersService = inject(UsersService);
  tweetsService = inject(TweetsService);

  query?: string | null = '';
  segment: string = 'rambles';
  filter: string = 'latest';
  page: number = 1;
  tweets: ITweet[] = [];
  users: any[] = [];

  async loadSearchData() {
    this.page = 1;

    if (!this.query) {
      this.tweets = [];
      this.users = [];
      return;
    }

    if (this.segment === 'rambles') {
      const res = await this.tweetsService.searchTweets({
        query: this.query,
        filter: this.filter,
        page: this.page,
      });
      this.tweets = res.data;
    }

    if (this.segment === 'users') {
      const res = await this.usersService.searchUsers({ query: this.query });
      this.users = res.data;
    }
  }

  async setFilter(filter: string) {
    this.filter = filter;
    await this.loadSearchData();
  }

  async handleInput(event: SearchbarCustomEvent) {
    this.query = event.target.value?.toLowerCase();
    await this.loadSearchData();
  }

  onRefresh(event: any) {
    this.loadSearchData();
    event.target.complete();
  }

  loadMore(event: any) {
    if (this.segment === 'rambles') {
      this.loadMoreTweets();
    }

    if (this.segment === 'users') {
      this.loadMoreUsers();
    }

    event.target.complete();
  }

  async loadMoreTweets() {
    this.page = this.page + 1;

    const queryParams = {
      query: this.query,
      page: this.page,
      filter: this.filter,
    };

    const res = await this.tweetsService.searchTweets(queryParams);
    this.tweets = this.tweets.concat(res.data);
  }

  async loadMoreUsers() {
    const lastUser = this.users[this.users.length - 1];
    const queryParams = { query: this.query, date: lastUser.createdAt };

    const res = await this.usersService.searchUsers(queryParams);
    this.users = this.users.concat(res.data);
  }
}
