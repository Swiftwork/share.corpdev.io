import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { ArticleService, IArticle } from '../../articles/shared/article.service';
import { ISection, SectionService } from './section.service';

@Injectable()
export class SectionResolver implements Resolve<{} | ISection[] | ISection[]> {
  constructor(
    public articleService: ArticleService,
    public sectionService: SectionService,
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
  ): Observable<{} | ISection[] | ISection[]> {
    return this.articleService.get(route.params.id).mergeMap((article: IArticle) => {
      if (article.sections && article.sections.length) {
        return this.articleService.get(article.sections.join(',')).map((sections) => {
          if (Array.isArray(sections)) return sections;
          if (typeof sections === 'object') return [sections];
          return sections;
        });
      } else {
        return [];
      }
    });
  }
}
