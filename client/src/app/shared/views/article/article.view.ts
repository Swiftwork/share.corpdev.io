import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { setTimeout } from 'timers';
import { ContentToolsService } from '../../../core/content-tools/content-tools.service';
import { ISection, SectionService } from '../../services/section.service';

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

  public sections: ISection[];

  private editor = ContentTools.EditorApp.get();

  constructor(
    public route: ActivatedRoute,
    private contentToolsService: ContentToolsService,
    private sectionService: SectionService,
  ) {
    super();
    this.onSave = this.onSave.bind(this);
    this.sectionService.sections.subscribe((sections) => {
      this.sections = Array.from(sections.values());
    });
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngAfterViewInit() {
    this.contentToolsService.init(
      '[editable]',
    );
    this.editor.addEventListener('saved', this.onSave);
  }

  private onSave(event: ContentTools.Event) {
    const regions = event.detail().regions;
    if (Object.keys(regions).length === 0) {
      return;
    }

    this.contentToolsService.editorApp.busy(true);

    this.sectionService.operations({
      edit: Object.keys(regions).map(key => {
        return {
          id: key.split('section-').pop(),
          body: regions[key],
        };
      }),
    }).finally(() => this.contentToolsService.editorApp.busy(false))
      .subscribe(response => {
      });

  }

  ngOnDestroy() {
    this.editor.destroy();
  }
}
