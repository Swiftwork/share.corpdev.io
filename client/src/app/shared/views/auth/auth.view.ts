import { Component } from '@angular/core';

import { BaseView } from '../../../core/base/base.view';

@Component({
  selector: 'v-auth',
  templateUrl: './auth.view.html',
  styleUrls: ['./auth.view.css'],
  host: {
    '[class.v-auth]': 'true',
  },
})
export class AuthView extends BaseView {

  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
