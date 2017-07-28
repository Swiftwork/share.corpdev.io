import { OnInit } from '@angular/core';
import { BaseComponent } from './core/base/base.decorator';

@BaseComponent({
  selector: 'm-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  constructor() { }

  ngOnInit() { }
}
