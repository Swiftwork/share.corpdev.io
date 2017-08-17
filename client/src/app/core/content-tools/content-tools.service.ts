import { EventEmitter, Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs/Rx';

import { ImageUploader } from './content-tools.utils';

import * as ContentTools from 'ContentTools';

export interface IEditorEvent {
  event: ContentTools.Event,
  editor: ContentTools.EditorApp;
}

@Injectable()
export class ContentToolsService {

  @Output() onInit = new EventEmitter<void>();

  public editor: ContentTools.EditorApp;

  private lastQueryOrDom: string | HTMLElement[];

  constructor() {
    // get the editor
    this.editor = ContentTools.EditorApp.get();
  }

  init(queryOrDom: string | HTMLElement[], id?: string, fixture?: (element: HTMLElement) => boolean, ignition?: boolean) {
    this.editor.init(queryOrDom, id, fixture, ignition);
    this.onInit.emit();

    (ContentTools as any)['IMAGE_UPLOADER'] = (dialog: any) => new ImageUploader(dialog);

    // save the default query for later restoring
    this.lastQueryOrDom = queryOrDom;
  }

  start(queryOrDom?: string | HTMLElement[]) {

    // if there is query, use it, otherwise use default
    this.editor.syncRegions(queryOrDom ? queryOrDom : this.lastQueryOrDom);

    // launch editor
    this.editor.start();

    // if IgnitionUI present, propagate change of status there
    if (this.editor.ignition()) this.editor.ignition().state('editing');
  }

  save(passive?: boolean) {
    this.editor.save(passive);
  }

  stop(save?: boolean) {

    if (this.editor.getState() !== 'editing') return;

    // stop editing, hide editor
    this.editor.stop(save);

    // set default query
    this.editor.syncRegions(this.lastQueryOrDom);

    // if IgnitionUI present, propagate change of status there
    if (this.editor.ignition()) this.editor.ignition().state('ready');
  }

  refresh(queryOrDom?: string | HTMLElement[]) {
    this.editor.syncRegions(queryOrDom ? queryOrDom : this.lastQueryOrDom);
  }
}
