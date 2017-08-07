import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ISection } from '../../services/section.service';

@Component({
  selector: 'c-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css'],
  host: {
    '[class.c-section]': 'true',
  },
})
export class SectionComponent implements OnInit, ISection {

  @Input() date: Date = new Date();
  @Input() id: string = 'sdgta893b';
  @Input() body: string = null;

  constructor() {
  }

  ngOnInit() {
    if (!/^<\w+[\s\S]+>$/.test(this.body))
      this.body = `<p>${this.body}</p>`;
  }

  ngAfterViewInit() {
  }
}
