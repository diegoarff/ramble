import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import {
  IUserListResponse,
  IUserProfile,
  IUserSearchResponse,
  IUserWithCounts,
  IResponse,
} from '../interfaces';
import { lastValueFrom } from 'rxjs';
import { IUserResponse, IUserWithCountsResponse } from '../interfaces/Users';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  http = inject(HttpClient);
  // baseUrl = 'https://ramble.cyclic.app/users';
  baseUrl = 'http://localhost:3000/users';

  async getMe(): Promise<IUserWithCountsResponse> {
    return lastValueFrom(
      this.http.get<IUserWithCountsResponse>(`${this.baseUrl}/me`)
    );
  }

  async updateProfile(user: FormData): Promise<IUserWithCountsResponse> {
    return lastValueFrom(
      this.http.put<IUserWithCountsResponse>(`${this.baseUrl}/me`, user)
    );
  }

  async updatePassword(passwords: FormData): Promise<IResponse> {
    return lastValueFrom(
      this.http.put<IResponse>(`${this.baseUrl}/me/password`, passwords)
    );
  }

  async deleteAccount(): Promise<IResponse> {
    return lastValueFrom(this.http.delete<IResponse>(`${this.baseUrl}/me`));
  }

  async getUser(userId: string): Promise<IUserResponse> {
    return lastValueFrom(
      this.http.get<IUserResponse>(`${this.baseUrl}/${userId}`)
    );
  }

  async followUser(userId: string): Promise<IResponse> {
    return lastValueFrom(
      this.http.post<IResponse>(`${this.baseUrl}/${userId}/follow`, {})
    );
  }

  async blockUser(userId: string): Promise<IResponse> {
    return lastValueFrom(
      this.http.post<IResponse>(`${this.baseUrl}/${userId}/block`, {})
    );
  }

  async getFollowersFromUser(userId: string): Promise<IUserListResponse> {
    return lastValueFrom(
      this.http.get<IUserListResponse>(`${this.baseUrl}/${userId}/followers`)
    );
  }

  async getFollowingFromUser(userId: string): Promise<IUserListResponse> {
    return lastValueFrom(
      this.http.get<IUserListResponse>(`${this.baseUrl}/${userId}/following`)
    );
  }

  async searchUsers(queryParams?: any): Promise<IUserSearchResponse> {
    const params = this.constructQueryParams(queryParams);
    return lastValueFrom(
      this.http.get<IUserSearchResponse>(`${this.baseUrl}/search`, {
        params,
      })
    );
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
