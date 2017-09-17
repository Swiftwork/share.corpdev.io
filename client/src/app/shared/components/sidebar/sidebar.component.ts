import { Component, ElementRef, HostBinding, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { AppState } from '../../../app.state';
import { ContentToolsService } from '../../../core/content-tools/content-tools.service';
import { ArticleService, IArticle } from '../../services/article.service';
import { ITopic, TopicService } from '../../services/topic.service';

export interface IArticleLink {
  title: string,
  route: string,
}

@Component({
  selector: 'c-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  host: {
    '[class.c-sidebar]': 'true',
  },
})
export class SidebarComponent {

  @ViewChild('editorRef') editorRef: ElementRef;

  public title: string;
  public topics: ITopic[];
  public state = {
    editing: false,
  }

  public topicsState = {
    model: '',
    dragging: null as ITopic,
    creating: false,
  };

  public articlesState = {
    articles: [] as IArticle[],
    model: '',
    creating: false,
  };

  constructor(
    public router: Router,
    public appState: AppState,
    public topicsService: TopicService,
    public articlesService: ArticleService,
    public contentToolsService: ContentToolsService,
  ) {
    this.title = 'code';
  }

  ngOnInit() {
    this.topicsService.topics.subscribe((topics) => {
      this.topics = Array.from(topics.values());
    });
  }

  ngAfterViewInit() {
    this.contentToolsService.init(this.editorRef, '[editable]');
  }

  /*=== EDITING ===*/

  onEditInit() {
  }

  onStartEdit() {
    this.state.editing = true;
    this.appState.set('editing', this.state.editing);
  }

  onEndEdit() {
    this.state.editing = true;
    this.appState.set('editing', this.state.editing);
  }

  /*=== DRAGGABLE ===*/

  onDragStart(event: DragEvent, topic: ITopic) {
    const element = event.target as HTMLElement;
    event.dataTransfer.dropEffect = 'move';
    this.topicsState.dragging = topic;
  }

  onDragEnter(event: DragEvent) {
    const element = event.target as HTMLElement;
    element.classList.add('over');
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    return false;
  }

  onDragLeave(event: DragEvent) {
    const element = event.target as HTMLElement;
    element.classList.remove('over');
  }

  onDragDrop(event: DragEvent, topic: ITopic) {
    event.stopPropagation();
    const element = event.target as HTMLElement;
    element.classList.remove('over');

    const index = this.topics.indexOf(topic);
    return false;
  }

  onDragEnd(event: DragEvent) {
    this.topicsState.dragging = null;
  }

  /*=== TOPICS ===*/

  toggleCreateTopic() {
    this.topicsState.creating = !this.topicsState.creating;
  }

  createTopic(title: string) {
    this.topicsState.creating = false;
    this.topicsService.add(title).subscribe();
  }

  /*=== ARTICLES ===*/

  toggleCreateArticle() {
    this.articlesState.creating = !this.articlesState.creating;
  }

  createArticle(title: string) {
    this.articlesState.creating = false;
    this.articlesService.add(title).subscribe();
  }

  getArticle(id: string) {
    return this.articlesService.get(id);
  }
}
