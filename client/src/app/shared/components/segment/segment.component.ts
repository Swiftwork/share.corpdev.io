import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ISegment } from '../../services/segment.service';

import * as Quill from 'quill';

@Component({
  selector: 'c-segment',
  templateUrl: './segment.component.html',
  styleUrls: ['./segment.component.css'],
  host: {
    '[class.c-segment]': 'true',
  },
})
export class SegmentComponent implements OnInit, ISegment {

  @ViewChild('editorRef') editorRef: ElementRef;

  @Input() date: Date = new Date();
  @Input() id: string = 'sdgta893b';
  @Input() body: string = '<p>Welcome home!</p>';

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const quill = new Quill(this.editorRef.nativeElement, {
      theme: 'snow',
    });
  }
}
