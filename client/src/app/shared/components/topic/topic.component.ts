import { Component, Input, OnInit } from '@angular/core';

export interface ITopic {
  route: string,
  tags: string[],
  image: string,
  date: Date,
  title: string,
  preamble: string,
}

@Component({
  selector: 'c-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css'],
  host: {
    '[class.c-topic]': 'true',
  },
})
export class TopicComponent implements OnInit, ITopic {

  @Input() route: string = '/topic/test';
  @Input() tags: string[] = ['news', 'event'];
  @Input() image: string = 'https://unsplash.it/720/480?image=1079';
  @Input() date: Date = new Date();
  @Input() title: string = 'What happened in Thailand?';
  @Input() preamble: string = 'Et sequi eius fugiat facilis. Facere deserunt tenetur dolores impedit laborum asperiores qui aliquam. Ad dolorem quaerat reiciendis eum. Aut eveniet saepe deserunt consequatur quas officia.';

  constructor() { }

  ngOnInit() {
  }
}
