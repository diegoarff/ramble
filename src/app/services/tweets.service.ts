import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
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
  baseUrl = 'http://localhost:3000/tweets';

  getTweet(tweetId: string): Observable<ITweetResponse> {
    return this.http.get<ITweetResponse>(`${this.baseUrl}/${tweetId}`);
  }

  createTweet(tweet: FormData): Observable<ITweetBasicResponse> {
    return this.http.post<ITweetBasicResponse>(`${this.baseUrl}`, tweet);
  }

  updateTweet(
    tweetId: string,
    tweet: FormData
  ): Observable<ITweetBasicResponse> {
    return this.http.put<ITweetBasicResponse>(
      `${this.baseUrl}/${tweetId}`,
      tweet
    );
  }

  deleteTweet(tweetId: string): Observable<ITweetBasicResponse> {
    return this.http.delete<ITweetBasicResponse>(`${this.baseUrl}/${tweetId}`);
  }

  replyToTweet(
    tweetId: string,
    tweet: FormData
  ): Observable<ITweetBasicResponse> {
    return this.http.post<ITweetBasicResponse>(
      `${this.baseUrl}/${tweetId}/reply`,
      tweet
    );
  }

  likeTweet(tweetId: string): Observable<IResponse> {
    return this.http.post<IResponse>(`${this.baseUrl}/${tweetId}/like`, {});
  }

  getRepliesFromTweet(
    tweetId: string,
    queryParams?: any
  ): Observable<ITweetArrayResponse> {
    const params = this.constructQueryParams(queryParams);
    return this.http.get<ITweetArrayResponse>(
      `${this.baseUrl}/${tweetId}/replies`,
      { params }
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

  getFollowingTweets(queryParams?: any): Observable<ITweetArrayResponse> {
    const params = this.constructQueryParams(queryParams);
    return this.http.get<ITweetArrayResponse>(`${this.baseUrl}/following`, {
      params,
    });
  }

  getTweetsFromUser(
    userId: string,
    queryParams?: any
  ): Observable<ITweetArrayResponse> {
    const params = this.constructQueryParams(queryParams);
    return this.http.get<ITweetArrayResponse>(
      `${this.baseUrl}/user/${userId}`,
      { params }
    );
  }

  getReplyTweetsFromUser(
    userId: string,
    queryParams?: any
  ): Observable<ITweetArrayResponse> {
    const params = this.constructQueryParams(queryParams);
    return this.http.get<ITweetArrayResponse>(
      `${this.baseUrl}/user/${userId}/replies`,
      { params }
    );
  }

  getLikedTweetsFromUser(
    userId: string,
    queryParams?: any
  ): Observable<ITweetArrayResponse> {
    const params = this.constructQueryParams(queryParams);
    return this.http.get<ITweetArrayResponse>(
      `${this.baseUrl}/user/${userId}/likes`,
      { params }
    );
  }

  searchTweets(queryParams?: any): Observable<ITweetArrayResponse> {
    const params = this.constructQueryParams(queryParams);
    return this.http.get<ITweetArrayResponse>(`${this.baseUrl}/search`, {
      params,
    });
  }

  private constructQueryParams(queryParams: any): HttpParams {
    let params = new HttpParams();

    if (queryParams && typeof queryParams === 'object') {
      for (const key in queryParams) {
        if (queryParams.hasOwnProperty(key)) {
          params = params.set(key, queryParams[key]);
        }
      }
    }

    return params;
  }
}
