import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'm-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  host: {
    '[class.m-app]': 'true',
  },
})
export class AppComponent implements OnInit {

  constructor() {
  }

  ngOnInit() { }
}
