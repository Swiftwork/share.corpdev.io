import { Component, Input, OnInit } from '@angular/core';
import { ISegment } from '../../services/segment.service';

@Component({
  selector: 'c-segment',
  templateUrl: './segment.component.html',
  styleUrls: ['./segment.component.css'],
  host: {
    '[class.c-segment]': 'true',
  },
})
export class SegmentComponent implements OnInit, ISegment {

  @Input() date: Date = new Date();
  @Input() id: string = 'sdgta893b';
  @Input() image: string = 'https://unsplash.it/720/480?image=1079';
  @Input() preamble: string = 'Et sequi eius fugiat facilis. Facere deserunt tenetur dolores impedit laborum asperiores qui aliquam. Ad dolorem quaerat reiciendis eum. Aut eveniet saepe deserunt consequatur quas officia.';
  @Input() route: string = '/segment/test';
  @Input() tags: string[] = ['news', 'event'];
  @Input() title: string = 'What happened in Thailand?';

  constructor() { }

  ngOnInit() {
  }
}
