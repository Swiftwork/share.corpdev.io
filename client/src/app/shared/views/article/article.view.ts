import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { setTimeout } from 'timers';
import { ContentToolsService } from '../../../core/content-tools/content-tools.service';
import { ArticleService, IArticle } from '../../services/article.service';
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

  public article: Observable<{} | IArticle | IArticle[]>;
  public sections: ISection[];

  constructor(
    public route: ActivatedRoute,
    private contentToolsService: ContentToolsService,
    private articleService: ArticleService,
    private sectionService: SectionService,
  ) {
    super();
    this.onSave = this.onSave.bind(this);
    this.article = this.route.paramMap.switchMap(params => this.articleService.get(params.get('id')));
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
    this.contentToolsService.editor.addEventListener('saved', this.onSave);
  }

  private onSave(event: ContentTools.Event) {
    const regions = event.detail().regions;
    if (Object.keys(regions).length === 0) {
      return;
    }

    this.contentToolsService.editor.busy(true);

    this.sectionService.operations({
      edit: Object.keys(regions).map(key => {
        return {
          id: key.split('section-').pop(),
          body: regions[key],
        };
      }),
    }).finally(() => this.contentToolsService.editor.busy(false))
      .subscribe(response => {
      });

  }

  ngOnDestroy() {
    this.contentToolsService.editor.destroy();
  }
}
