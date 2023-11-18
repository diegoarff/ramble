import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import {
  ITweetResponse,
  ITweetArrayResponse,
  ITweetBasicResponse,
  IResponse,
} from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class TweetsService {
  http = inject(HttpClient);
  baseUrl = 'https://ramble.cyclic.app/tweets';
  // baseUrl = 'http://localhost:3000/tweets';

  async getTweet(tweetId: string): Promise<ITweetResponse> {
    return lastValueFrom(
      this.http.get<ITweetResponse>(`${this.baseUrl}/${tweetId}`)
    );
  }

  async createTweet(tweet: object): Promise<ITweetBasicResponse> {
    return lastValueFrom(
      this.http.post<ITweetBasicResponse>(`${this.baseUrl}`, tweet)
    );
  }

  async updateTweet(
    tweetId: string,
    tweet: object,
  ): Promise<ITweetBasicResponse> {
    return lastValueFrom(
      this.http.put<ITweetBasicResponse>(`${this.baseUrl}/${tweetId}`, tweet)
    );
  }

  async deleteTweet(tweetId: string): Promise<ITweetBasicResponse> {
    return lastValueFrom(
      this.http.delete<ITweetBasicResponse>(`${this.baseUrl}/${tweetId}`)
    );
  }

  async replyToTweet(
    tweetId: string,
    tweet: object
  ): Promise<ITweetBasicResponse> {
    return lastValueFrom(
      this.http.post<ITweetBasicResponse>(
        `${this.baseUrl}/${tweetId}/reply`,
        tweet
      )
    );
  }

  async likeTweet(tweetId: string): Promise<IResponse> {
    return lastValueFrom(
      this.http.post<IResponse>(`${this.baseUrl}/${tweetId}/like`, {})
    );
  }

  async getRepliesFromTweet(
    tweetId: string,
    queryParams?: any
  ): Promise<ITweetArrayResponse> {
    const params = this.constructQueryParams(queryParams);
    return lastValueFrom(
      this.http.get<ITweetArrayResponse>(`${this.baseUrl}/${tweetId}/replies`, {
        params,
      })
    );
  }

  async getRecentTweets(queryParams?: any): Promise<ITweetArrayResponse> {
    const params = this.constructQueryParams(queryParams);
    return lastValueFrom(
      this.http.get<ITweetArrayResponse>(`${this.baseUrl}/recent`, {
        params,
      })
    );
  }

  async getFollowingTweets(queryParams?: any): Promise<ITweetArrayResponse> {
    const params = this.constructQueryParams(queryParams);
    return lastValueFrom(
      this.http.get<ITweetArrayResponse>(`${this.baseUrl}/following`, {
        params,
      })
    );
  }

  async getTweetsFromUser(
    userId: string,
    queryParams?: any
  ): Promise<ITweetArrayResponse> {
    const params = this.constructQueryParams(queryParams);
    return lastValueFrom(
      this.http.get<ITweetArrayResponse>(`${this.baseUrl}/user/${userId}`, {
        params,
      })
    );
  }

  async getReplyTweetsFromUser(
    userId: string,
    queryParams?: any
  ): Promise<ITweetArrayResponse> {
    const params = this.constructQueryParams(queryParams);
    return lastValueFrom(
      this.http.get<ITweetArrayResponse>(
        `${this.baseUrl}/user/${userId}/replies`,
        { params }
      )
    );
  }

  async getLikedTweetsFromUser(
    userId: string,
    queryParams?: any
  ): Promise<ITweetArrayResponse> {
    const params = this.constructQueryParams(queryParams);
    return lastValueFrom(
      this.http.get<ITweetArrayResponse>(
        `${this.baseUrl}/user/${userId}/liked`,
        { params }
      )
    );
  }

  async searchTweets(queryParams?: any): Promise<ITweetArrayResponse> {
    const params = this.constructQueryParams(queryParams);
    return lastValueFrom(
      this.http.get<ITweetArrayResponse>(`${this.baseUrl}/search`, {
        params,
      })
    );
  }

  constructQueryParams = (queryParams: any): HttpParams => {
    let params = new HttpParams();

    if (queryParams && typeof queryParams === 'object') {
      for (const key in queryParams) {
        if (queryParams.hasOwnProperty(key)) {
          params = params.set(key, queryParams[key]);
        }
      }
    }

    return params;
  };

  getMethod(method: string) {
    switch (method) {
      case 'getRecentTweets':
        return this.getRecentTweets;
      case 'getFollowingTweets':
        return this.getFollowingTweets;
      case 'getTweetsFromUser':
        return this.getTweetsFromUser;
      case 'getReplyTweetsFromUser':
        return this.getReplyTweetsFromUser;
      case 'getLikedTweetsFromUser':
        return this.getLikedTweetsFromUser;
      case 'getRepliesFromTweet':
        return this.getRepliesFromTweet;
      case 'searchTweets':
        return this.searchTweets;
      default:
        return this.getRecentTweets;
    }
  }
}
