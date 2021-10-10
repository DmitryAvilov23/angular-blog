import { Component, Input, OnInit } from '@angular/core';

import { IPost } from '../../models/interfaces';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() postData!: IPost;

  constructor() {}

  ngOnInit(): void {}
}
