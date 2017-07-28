import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TopicComponent } from './components/topic/topic.component';
import { TopicsView } from './views/topics/topics.view';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopbarComponent } from './components/topbar/topbar.component';

export const DECLARATIONS: any[] = [
  /*=== COMPONENTS ===*/
  SidebarComponent,
  TopbarComponent,
  TopicComponent,

  /*=== VIEWS ===*/
  TopicsView,
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: DECLARATIONS,
  exports: DECLARATIONS,
})
export class SharedModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
      ],
    };
  }
}
