import { Component } from '@angular/core';

import { BaseView } from '../../../core/base/base.view';

@Component({
  selector: 'v-articles',
  templateUrl: './articles.view.html',
  styleUrls: ['./articles.view.css'],
  host: {
    '[class.v-articles]': 'true',
  },
})
export class ArticlesView extends BaseView {

  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
