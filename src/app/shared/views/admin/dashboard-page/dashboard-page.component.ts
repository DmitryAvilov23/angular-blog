import { IPost } from './../../../models/interfaces';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { PostsService } from './../../../services/posts.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  posts: IPost[] = [];

  searchRequest = '';

  postsSubscr!: Subscription;
  deleteSubscr!: Subscription;

  constructor(private _postsService: PostsService) {}

  ngOnInit(): void {
    this.postsSubscr = this._postsService.getAllPosts().subscribe((posts) => {
      this.posts = posts;
    });
  }

  ngOnDestroy() {
    this.removeSubscriptions();
  }

  deletePostById(id: string) {
    this.deleteSubscr = this._postsService.deletePostById(id).subscribe(() => {
      const postIdToDelete = this.posts.findIndex(
        (post: IPost) => post.id === id
      );

      this.posts.splice(postIdToDelete, 1);
    });
  }

  private removeSubscriptions() {
    if (this.postsSubscr) {
      this.postsSubscr?.unsubscribe();
    }

    if (this.deleteSubscr) {
      this.deleteSubscr?.unsubscribe();
    }
  }
}
