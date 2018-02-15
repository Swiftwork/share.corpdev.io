import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'c-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  host: {
    '[class.c-dashboard]': 'true',
  },
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
