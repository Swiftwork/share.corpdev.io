import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { ContentToolsService } from '../../../core/content-tools/content-tools.service';
import { SectionService } from '../../services/section.service';

import * as ContentTools from 'ContentTools';

import { BaseView } from '../../../core/base/base.view';

@Component({
  selector: 'v-article',
  templateUrl: './article.view.html',
  styleUrls: ['./article.view.css'],
  host: {
    '[class.v-article]': 'true',
  },
})
export class ArticleView extends BaseView {

  public sections = [
    { id: '6ds5sq897df6' },
    { id: '61825d965ad2' },
    { id: '3klg45kh4322' },
    { id: 'lm234nöh6j2h' },
    { id: 'lkjhn634öl5h' },
  ];

  private editor = ContentTools.EditorApp.get();

  constructor(
    private contentToolsService: ContentToolsService,
    private sectionService: SectionService,
  ) {
    super();
    this.onSave = this.onSave.bind(this);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngAfterViewInit() {
    this.contentToolsService.init(
      '*[editable]',
    );
    //this.contentToolsService.start();
    this.editor.addEventListener('saved', this.onSave);
  }

  private onSave(event: ContentTools.Event) {
    const regions = event.detail().regions;
    if (Object.keys(regions).length === 0) {
      return;
    }

    this.contentToolsService.editorApp.busy(true);

    this.sectionService.;

  }

  ngOnDestroy() {
    this.editor.destroy();
  }
}
