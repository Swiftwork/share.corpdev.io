import { Component } from '@angular/core';

import { BaseView } from '../../../core/base/base.view';

@Component({
  selector: 'v-article',
  templateUrl: './article.view.html',
  styleUrls: ['./article.view.css'],
  host: {
    '[class.v-article]': 'true',
  },
})
export class ArticleView extends BaseView {

  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
