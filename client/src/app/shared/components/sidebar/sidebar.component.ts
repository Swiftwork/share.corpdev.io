import { Component, HostBinding, OnInit } from '@angular/core';
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
  public topics: ITopic[];
  public showAddTopic: boolean;

  constructor(
    public topicsService: TopicsService,
  ) {
    this.title = 'code';
    this.topicsService.get().subscribe(topics => {
      this.topics = topics as ITopic[];
    });
  }

  ngOnInit() { }

  toggleAddTopic() {
    this.showAddTopic = !this.showAddTopic;
  }
}
