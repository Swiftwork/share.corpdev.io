import { OnInit } from '@angular/core';
import { BaseComponent } from '../../../core/base/base.decorator';

@BaseComponent({
  selector: 'c-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css'],
})
export class TopbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  search() {
    console.log('search');

    return false;
  }
}
