import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';

import { PostsService } from './../../../services/posts.service';
import { AlertService } from './../../../services/alert.service';

import { IPost } from './../../../models/interfaces';

import { AlertTypes } from 'src/app/shared/models/enums';
@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss'],
})
export class CreatePageComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  createPostSubscr!: Subscription;

  constructor(
    private _postsService: PostsService,
    private _alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      author: new FormControl(null, [Validators.required]),
      content: new FormControl(null, [Validators.required]),
    });
  }

  ngOnDestroy() {
    if (this.createPostSubscr) this.createPostSubscr.unsubscribe();
  }

  createNewPost() {
    if (this.form.invalid) {
      return;
    }

    const post = this.genereateNewPost();

    this.createPostSubscr = this._postsService
      .createNewPost(post)
      .subscribe(() => {
        this.form.reset();

        this._alertService.callAlertMessage(
          AlertTypes.SUCCESS,
          'Post was created'
        );
      });
  }

  private genereateNewPost(): IPost {
    return {
      title: this.form.get('title')?.value,
      author: this.form.get('author')?.value,
      content: this.form.get('content')?.value,
      date: new Date(),
    };
  }
}
