import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IUserListResponse,
  IUserProfile,
  IUserSearchResponse,
  IUserWithCounts,
  IResponse,
} from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  http = inject(HttpClient);
  baseUrl = 'http://localhost:3000/users';

  getMe(): Observable<IUserWithCounts> {
    return this.http.get<IUserWithCounts>(`${this.baseUrl}/me`);
  }

  updateProfile(user: FormData): Observable<IUserWithCounts> {
    return this.http.put<IUserWithCounts>(`${this.baseUrl}/me`, user);
  }

  updatePassword(passwords: FormData): Observable<IResponse> {
    return this.http.put<IResponse>(`${this.baseUrl}/me/password`, passwords);
  }

  deleteAccount(): Observable<IResponse> {
    return this.http.delete<IResponse>(`${this.baseUrl}/me`);
  }

  getUser(userId: string): Observable<IUserProfile> {
    return this.http.get<IUserProfile>(`${this.baseUrl}/${userId}`);
  }

  followUser(userId: string): Observable<IResponse> {
    return this.http.post<IResponse>(`${this.baseUrl}/${userId}/follow`, {});
  }

  blockUser(userId: string): Observable<IResponse> {
    return this.http.post<IResponse>(`${this.baseUrl}/${userId}/block`, {});
  }

  getFollowersFromUser(userId: string): Observable<IUserListResponse[]> {
    return this.http.get<IUserListResponse[]>(
      `${this.baseUrl}/${userId}/followers`
    );
  }

  getFollowingFromUser(userId: string): Observable<IUserListResponse[]> {
    return this.http.get<IUserListResponse[]>(
      `${this.baseUrl}/${userId}/following`
    );
  }

  searchUsers(queryParams?: any): Observable<IUserSearchResponse[]> {
    const params = this.constructQueryParams(queryParams);
    return this.http.get<IUserSearchResponse[]>(`${this.baseUrl}/search`, {
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
