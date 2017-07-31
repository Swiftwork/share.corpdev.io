import { Component } from '@angular/core';

import { BaseView } from '../../../core/base/base.view';

@Component({
  selector: 'v-topics',
  templateUrl: './topics.view.html',
  styleUrls: ['./topics.view.css'],
  host: {
    '[class.v-topics]': 'true',
  },
})
export class TopicsView extends BaseView {

  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }

  static MockTopics(): any[] {
    return [
      {
        title: 'Hello there',
      },
    ];
  }
}
