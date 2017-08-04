import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { ContentToolsService } from '../../../core/content-tools/content-tools.service';

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

  public segments = [
    { id: '6ds5sq897df6' },
    { id: '61825d965ad2' },
    { id: '3klg45kh4322' },
    { id: 'lm234nöh6j2h' },
    { id: 'lkjhn634öl5h' },
  ];

  private editor = ContentTools.EditorApp.get();

  constructor(
    private contentToolsService: ContentToolsService,
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
  }

  private onSave(event: any) {
    const regions = event.detail().regions;
  }

  ngOnDestroy() {
    this.editor.destroy();
  }
}
