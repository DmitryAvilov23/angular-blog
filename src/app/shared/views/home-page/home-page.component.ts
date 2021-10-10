import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { PostsService } from './../../services/posts.service';

import { IPost } from './../../models/interfaces';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  posts$!: Observable<IPost[]>;

  constructor(private _postsService: PostsService) {}

  ngOnInit(): void {
    this.posts$ = this._postsService.getAllPosts();
  }
}
