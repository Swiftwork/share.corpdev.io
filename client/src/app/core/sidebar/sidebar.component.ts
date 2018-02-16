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
  public topics: ITopic[];
  public state = {
    instance: '',
    editing: false,
  };

  public topicsState = {
    model: '',
    grabbed: null as ITopic,
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
    this.state.instance = 'code';
    this.topicService.getAllNested().subscribe((topics: ITopic[]) => {
      this.topics = topics;
    });

    this.topicService.store.subscribe((topics) => {
      if (!Array.isArray(this.topics)) return;
      this.topics.forEach((topic) => {
        const newTopic = topics.get(topic.id);
        if (!newTopic) return;
        delete newTopic.articles;
        Object.assign(topic, newTopic);
      });
      this.topics.sort((a, b) => a.order - b.order);
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
    const draggable = this.getDraggable(event);
    if (!draggable) return false;
    event.dataTransfer.dropEffect = 'move';
    this.topicsState.grabbed = topic;
    this.renderer.setAttribute(draggable, 'aria-grabbed', 'true');
    return true;
  }

  onDragEnter(event: DragEvent) {
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    const draggable = this.getDraggable(event);
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
    const draggable = this.getDraggable(event);
    if (draggable) {
      this.renderer.removeClass(draggable, 'over-above');
      this.renderer.removeClass(draggable, 'over-below');
    }
  }

  onDragDrop(event: DragEvent, topic: ITopic) {
    event.stopPropagation();
    const draggable = this.getDraggable(event);
    if (draggable) {
      this.renderer.removeClass(draggable, 'over-above');
      this.renderer.removeClass(draggable, 'over-below');
    }
    const above = draggable.clientHeight / 2 > event.layerY;
    this.topicService.update(this.topicsState.grabbed.id, {
      order: above ? topic.order : topic.order + 1,
    }).subscribe();

    return false;
  }

  onDragEnd(event: DragEvent) {
    const draggable = this.getDraggable(event);
    if (draggable) {
      this.renderer.setAttribute(draggable, 'aria-grabbed', 'false');
    }
    this.topicsState.grabbed = null;
  }

  private getDraggable(event: Event): HTMLElement {
    let target = event.target as HTMLElement;
    if (!target.hasAttribute('draggable'))
      target = target.parentElement;
    if (!target.hasAttribute('draggable'))
      return undefined;
    return target;
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
