import { Component, HostListener, Input, OnInit } from '@angular/core';

import { ISection } from '../../sections/shared/section.service';
import { ArticleService, IArticle } from '../shared/article.service';

import imagePlaceholder from '../../../../assets/images/placeholder.png';

@Component({
  selector: 'c-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  host: {
    '[class.c-article]': 'true',
  },
})
export class ArticleComponent implements OnInit, IArticle {

  @Input() date: Date = new Date();
  @Input() id: string = 'sdgta893b';
  @Input() image: string = imagePlaceholder;
  @Input() preamble: string = 'Et sequi eius fugiat facilis. Facere deserunt tenetur dolores impedit laborum asperiores qui aliquam. Ad dolorem quaerat reiciendis eum. Aut eveniet saepe deserunt consequatur quas officia.';
  private _preamble: string;
  @Input() route: string = '/article/test';
  @Input() tags: string[] = ['news', 'event'];
  @Input() sections: ISection[] = [];
  @Input() title: string = 'What happened in Thailand?';
  private _title: string;
  @Input() editing: boolean = false;

  constructor(
    private articleService: ArticleService,
  ) { }

  ngOnInit() {
    /* Store for edit */
    this._title = this.title;
    this._preamble = this.preamble;
  }

  @HostListener('keydown.enter', ['$event'])
  onSave(event: KeyboardEvent) {
    if (event.shiftKey) return false;
    event.preventDefault();
    const updatedArticle: IArticle = {};

    if (this._title !== this.title)
      updatedArticle.title = this.title;

    if (this._preamble !== this.preamble)
      updatedArticle.preamble = this.preamble;

    if (!Object.keys(updatedArticle).length) return false;

    this.articleService.update(this.id, updatedArticle).subscribe();
    return true;
  }
}
