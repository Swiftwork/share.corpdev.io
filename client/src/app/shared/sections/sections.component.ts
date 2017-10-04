import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as ContentTools from 'ContentTools';
import { Observable } from 'rxjs/Rx';

import { ArticleService, IArticle } from '../articles/shared/article.service';
import { ContentToolsService } from '../content-tools/content-tools.service';
import { ISection, SectionService } from './shared/section.service';

@Component({
  selector: 'c-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css'],
  host: {
    '[class.c-sections]': 'true',
  },
})
export class SectionsComponent {

  public article: Observable<{} | IArticle | IArticle[]>;
  public sections: ISection[];

  constructor(
    public route: ActivatedRoute,
    private contentToolsService: ContentToolsService,
    private articleService: ArticleService,
    private sectionService: SectionService,
  ) {
    this.onSave = this.onSave.bind(this);
    this.article = this.route.paramMap.switchMap(params => this.articleService.get(params.get('id')));
    this.sectionService.sections.subscribe((sections) => {
      this.sections = Array.from(sections.values());
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.contentToolsService.start();
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
    this.contentToolsService.stop();
  }
}
