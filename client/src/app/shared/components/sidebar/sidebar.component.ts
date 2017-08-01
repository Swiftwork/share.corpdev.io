import { Component, HostBinding, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { TopicsService } from '../../services/topics.service';
import { ITopic } from '../topic/topic.component';

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
export class SidebarComponent implements OnInit {

  public title: string;
  public topics: Observable<ITopic[]>;
  public topicState = {
    model: '',
    creating: false,
  };

  constructor(
    public topicsService: TopicsService,
  ) {
    this.title = 'code';
    this.topics = this.topicsService.topics;
  }

  ngOnInit() { }

  toggleCreateTopic() {
    this.topicState.creating = !this.topicState.creating;
  }

  createTopic(title: string) {
    this.topicState.creating = false;
    this.topicsService.add(title).subscribe();
  }
}
