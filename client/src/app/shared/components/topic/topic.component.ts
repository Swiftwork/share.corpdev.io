import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from '../../../core/base/base.decorator';

@BaseComponent({
  selector: 'c-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css'],
})
export class TopicComponent implements OnInit {

  @Input() url: string = '/topic/test';
  @Input() tags: string[] = ['news', 'event'];
  @Input() image: string = 'https://unsplash.it/720/480?image=1079';
  @Input() date: Date = new Date();
  @Input() title: string = 'What happened in Thailand?';
  @Input() preamble: string = 'Et sequi eius fugiat facilis. Facere deserunt tenetur dolores impedit laborum asperiores qui aliquam. Ad dolorem quaerat reiciendis eum. Aut eveniet saepe deserunt consequatur quas officia.';

  constructor() { }

  ngOnInit() {
  }
}
