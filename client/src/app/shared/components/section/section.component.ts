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
  @Input() body: string = '<h2>Lorem ipsum dolor sit amet</h2><p>Consectetur adipiscing elit. Cras gravida varius elit, eget hendrerit libero rhoncus non. Aenean semper metus felis, at fermentum purus tincidunt nec. Donec tristique ipsum eget vulputate sollicitudin. Duis dolor neque, dapibus at leo id, laoreet posuere ex. In pulvinar sollicitudin tincidunt. Mauris sit amet arcu eu ipsum tempor pellentesque quis eu dui. Etiam vehicula tortor ante, nec posuere neque mattis ut. Vestibulum ac tellus vitae metus ultrices tempor. Etiam at luctus nulla. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus feugiat euismod diam eget viverra. Pellentesque a laoreet ligula.</p>';

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }
}
