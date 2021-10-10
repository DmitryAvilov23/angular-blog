import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { PostsService } from './../../services/posts.service';

import { IPost } from './../../models/interfaces';
@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss'],
})
export class PostPageComponent implements OnInit {
  postData$!: Observable<IPost>;
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _postsService: PostsService
  ) {}

  ngOnInit(): void {
    this.postData$ = this._activatedRoute.params.pipe(
      switchMap((params: Params) => this._postsService.getPostById(params?.id))
    );
  }
}
