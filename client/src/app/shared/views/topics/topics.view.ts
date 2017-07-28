import { BaseComponent } from '../../../core/base/base.decorator';
import { BaseView } from '../../../core/base/base.view';

@BaseComponent({
  selector: 'v-topics',
  template: '',
})
export class TopicsView extends BaseView {

  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }

  static MockTopics(): any[] {
    return [
      {
        title: 'Hello there',
      },
    ];
  }
}
