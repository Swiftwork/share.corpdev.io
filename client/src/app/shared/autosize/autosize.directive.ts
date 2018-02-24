import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import autosize from 'autosize';

@Directive({ selector: '[autosize]' })
export class AutosizeDirective implements OnInit, OnDestroy {

  @Input('autosize') enabled: boolean = true;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    if (this.enabled)
      autosize(this.el.nativeElement);
  }

  public update() {
    if (this.enabled) {
      // TODO: Investigate: We need to skip a tick to make this work.
      window.setTimeout(() => {
        autosize.update(this.el.nativeElement);
      }, 0);
    }
  }

  ngOnDestroy() {
    autosize.destroy(this.el.nativeElement);
  }
}
