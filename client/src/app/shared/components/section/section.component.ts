import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { ISection } from '../../services/section.service';

@Component({
  selector: 'c-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css'],
  host: {
    '[class.c-section]': 'true',
    '[attr.c-section]': 'true',
  },
})
export class SectionComponent implements OnInit, ISection {

  @Input() date: Date = new Date();
  @Input() id: string = 'sdgta893b';
  @Input() body: string = null;

  constructor(host: ElementRef) {
    host.nativeElement.classList.add('c-section');
  }

  ngOnInit() {
    if (!/^<\w+[\s\S]+>$/.test(this.body))
      this.body = `<p>${this.body}</p>`;
  }

  ngAfterViewInit() {
  }

  ngOnChange(changes: SimpleChanges) {
    console.log(changes);
  }
}
