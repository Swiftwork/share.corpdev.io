import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { AppState } from '../../app.state';
import { ArticleService } from '../../shared/articles/shared/article.service';
import { ContentToolsService } from '../../shared/content-tools/content-tools.service';
import { ITopic, TopicService } from '../../shared/topics/topic.service';

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
  public topics: Observable<{} | ITopic | ITopic[]>;
  public state = {
    instance: '',
    editing: false,
  };

  public topicsState = {
    model: '',
    dragging: null as ITopic,
    creating: false,
  };

  constructor(
    public router: Router,
    public renderer: Renderer2,
    public appState: AppState,
    public topicService: TopicService,
    public articleService: ArticleService,
    public contentToolsService: ContentToolsService,
  ) {
    this.title = 'code';
  }

  ngOnInit() {
    /*
    this.topicService.store.subscribe((topics) => {
      this.topics = Array.from(topics.values());
    });
    */

    this.state.instance = 'code';
    this.topics = this.topicService.getAllNested();
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
    const target = event.target as HTMLElement;
    event.dataTransfer.dropEffect = 'move';
    this.topicsState.dragging = topic;
    this.renderer.setAttribute(target, 'aria-grabbed', 'true');
  }

  onDragEnter(event: DragEvent) {
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    const target = event.target as HTMLElement;
    const draggable = target.closest('[draggable]');
    if (!draggable) return false;
    if (draggable.clientHeight / 2 > event.layerY) {
      this.renderer.addClass(draggable, 'over-above');
      this.renderer.removeClass(draggable, 'over-below');
    } else {
      this.renderer.addClass(draggable, 'over-below');
      this.renderer.removeClass(draggable, 'over-above');
    }
    return false;
  }

  onDragLeave(event: DragEvent) {
    const target = event.target as HTMLElement;
    if (target.hasAttribute('draggable')) {
      this.renderer.removeClass(target, 'over-above');
      this.renderer.removeClass(target, 'over-below');
    }
  }

  onDragDrop(event: DragEvent, topic: ITopic) {
    event.stopPropagation();
    const target = event.target as HTMLElement;
    this.renderer.removeClass(target, 'over-above');
    this.renderer.removeClass(target, 'over-below');

    //const index = this.topics.indexOf(topic);
    return false;
  }

  onDragEnd(event: DragEvent) {
    const original = event.target as HTMLElement;
    this.topicsState.dragging = null;
    this.renderer.setAttribute(original, 'aria-grabbed', 'false');
  }

  /*=== TOPICS ===*/

  toggleCreateTopic() {
    this.topicsState.creating = !this.topicsState.creating;
  }

  createTopic(title: string) {
    this.topicsState.creating = false;
    this.topicService.add({
      id: undefined,
      title: title,
      articles: [],
    }).subscribe();
  }

  deleteTopic(id: string) {
    this.topicService.delete(id).subscribe();
  }

  /*=== ARTICLES ===*/

  getArticle(id: string) {
    return this.articleService.get(id);
  }
}
