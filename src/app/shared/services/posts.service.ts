import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

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

  deletePostById(id: string): Observable<void> {
    return this._httpClient.delete<void>(
      `${environment.serverUrl}/posts/${id}.json`
    );
  }

  getPostById(id: string): Observable<IPost> {
    return this._httpClient
      .get<IPost>(`${environment.serverUrl}/posts/${id}.json`)
      .pipe(
        map((post: IPost) => {
          return {
            ...post,
            id,
            date: new Date(post?.date!),
          };
        })
      );
  }

  updatePostById(post: IPost): Observable<IPost> {
    return this._httpClient.patch<IPost>(
      `${environment.serverUrl}/posts/${post.id}.json`,
      post
    );
  }
}
