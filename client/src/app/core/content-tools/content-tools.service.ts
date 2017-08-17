import { ElementRef, EventEmitter, Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs/Rx';

import { ContentToolsEditor } from './content-tools.editor';
import { ImageUploader } from './content-tools.utils';

import * as ContentTools from 'ContentTools';

export interface IEditorEvent {
  event: ContentTools.Event,
  editor: ContentToolsEditor;
}

@Injectable()
export class ContentToolsService {

  @Output() onInit = new EventEmitter<void>();

  public editor: ContentToolsEditor;

  private lastQueryOrElements: string | HTMLElement[];

  constructor() {
    this.editor = new ContentToolsEditor();
  }

  public init(queryOrElements: string | HTMLElement[], id?: string, fixture?: (element: HTMLElement) => boolean, ignition?: boolean) {
    this.editor.init(queryOrElements, id, fixture, ignition);
    this.onInit.emit();

    (ContentTools as any)['IMAGE_UPLOADER'] = (dialog: any) => new ImageUploader(dialog);

    // save the default query for later restoring
    this.lastQueryOrElements = queryOrElements;
  }

  public start(queryOrDom?: string | HTMLElement[]) {

    // if there is query, use it, otherwise use default
    this.editor.syncRegions(queryOrDom ? queryOrDom : this.lastQueryOrElements);

    // launch editor
    this.editor.start();

    // if IgnitionUI present, propagate change of status there
    if (this.editor.ignition()) this.editor.ignition().state('editing');
  }

  public save(passive?: boolean) {
    this.editor.save(passive);
  }

  public stop(save?: boolean) {

    if (this.editor.getState() !== 'editing') return;

    // stop editing, hide editor
    this.editor.stop(save);

    // set default query
    this.editor.syncRegions(this.lastQueryOrElements);

    // if IgnitionUI present, propagate change of status there
    if (this.editor.ignition()) this.editor.ignition().state('ready');
  }

  public refresh(queryOrDom?: string | HTMLElement[]) {
    this.editor.syncRegions(queryOrDom ? queryOrDom : this.lastQueryOrElements);
  }
}
