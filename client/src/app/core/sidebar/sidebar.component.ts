import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ArticleService } from '../../shared/articles/shared/article.service';
import { ContentToolsService } from '../../shared/content-tools/content-tools.service';
import { ITopic, TopicService } from '../../shared/topics/topic.service';

import { AppState } from '../../app.state';

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
  };

  public topicsState = {
    model: '',
    dragging: null as ITopic,
    creating: false,
  };

  constructor(
    public router: Router,
    public appState: AppState,
    public topicsService: TopicService,
    public articleService: ArticleService,
    public contentToolsService: ContentToolsService,
  ) {
    this.title = 'code';
  }

  ngOnInit() {
    this.topicsService.store.subscribe((topics) => {
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
    this.state.editing = false;
    this.appState.set('editing', this.state.editing);
  }

  /*=== DRAGGABLE ===*/

  onDragStart(event: DragEvent, topic: ITopic) {
    //const element = event.target as HTMLElement;
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

    //const index = this.topics.indexOf(topic);
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

  deleteTopic(id: string) {
    this.topicsService.delete(id).subscribe();
  }

  /*=== ARTICLES ===*/

  getArticle(id: string) {
    return this.articleService.get(id);
  }
}
