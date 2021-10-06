import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import { PostsService } from './../../../services/posts.service';

import { IPost } from './../../../models/interfaces';
@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
})
export class EditPageComponent implements OnInit {
  form!: FormGroup;

  isFormSubmitted = false;

  private post!: IPost;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _postsService: PostsService
  ) {}

  ngOnInit(): void {
    this.getPostData();
  }

  updatePost() {
    if (this.form.invalid) {
      return;
    }

    const post = this.generatePostObj();

    this._postsService
      .updatePostById(post)
      .pipe(take(1))
      .subscribe(() => {
        this.isFormSubmitted = true;
      });
  }

  private getPostData() {
    this._activatedRoute.params
      .pipe(
        switchMap((params: Params) => {
          return this._postsService.getPostById(params?.id);
        }),
        take(1)
      )
      .subscribe((post: IPost) => {
        this.form = new FormGroup({
          title: new FormControl(post.title, Validators.required),
          author: new FormControl(post.author, Validators.required),
          content: new FormControl(post.content, Validators.required),
        });

        this.post = post;
      });
  }

  private generatePostObj(): IPost {
    return {
      ...this.post,
      title: this.form.get('title')?.value,
      content: this.form.get('content')?.value,
    };
  }
}
