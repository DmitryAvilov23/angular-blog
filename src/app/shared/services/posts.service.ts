import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from './../../../environments/environment';

import { IPost } from './../models/interfaces';

@Injectable({ providedIn: 'root' })
export class PostsService {
  constructor(private _httpClient: HttpClient) {}

  createNewPost(post: IPost): Observable<IPost> {
    return this._httpClient
      .post(`${environment.serverUrl}/posts.json`, post)
      .pipe(
        map((response: any) => {
          const newPost: IPost = {
            ...post,
            id: response.name,
            date: new Date(post.date!),
          };

          return post;
        })
      );
  }

  getAllPosts(): Observable<IPost[]> {
    return this._httpClient.get(`${environment.serverUrl}/posts.json`).pipe(
      map((response: { [key: string]: any }) => {
        return Object.keys(response).map((key) => ({
          ...response[key],
          id: key,
          date: new Date(response[key].date),
        }));
      })
    );
  }
}
