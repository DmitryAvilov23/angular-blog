import { IPost } from '../../../../models/interfaces';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchPosts',
})
export class SearchPostsPipe implements PipeTransform {
  transform(posts: IPost[], searchRequest = ''): IPost[] {
    if (!searchRequest.trim()) {
      return posts;
    }

    return posts.filter((post) => {
      return post.title.toLowerCase().includes(searchRequest);
    });
  }
}
