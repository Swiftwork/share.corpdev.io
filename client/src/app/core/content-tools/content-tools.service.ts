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

  public editor: ContentToolsEditor = null;

  private lastQueryOrElements: string | HTMLElement[];

  public init(parent: ElementRef, queryOrElements: string | HTMLElement[], id?: string, fixture?: (element: HTMLElement) => boolean, ignition?: boolean) {
    (ContentTools as any)['IMAGE_UPLOADER'] = (dialog: any) => new ImageUploader(dialog);

    if (this.editor === null)
      this.editor = new ContentToolsEditor(parent);

    this.editor.init(queryOrElements, id, fixture, ignition);

    this.onInit.emit();

    // save the default query for later restoring
    this.lastQueryOrElements = queryOrElements;
  }

  public start(queryOrElements?: string | HTMLElement[]) {

    // if there is query, use it, otherwise use default
    this.refresh();

    // launch editor
    this.editor.start();
  }

  public save(passive?: boolean) {
    this.editor.save(passive);
  }

  public stop(save?: boolean) {

    if (this.editor.getState() !== 'editing') return;

    // stop editing, hide editor
    this.editor.stop(save);

    // set default query
    this.refresh();

    // if IgnitionUI present, propagate change of status there
    if (this.editor.ignition()) this.editor.ignition().state('ready');
  }

  public refresh(queryOrElements?: string | HTMLElement[]) {
    this.editor.syncRegions(queryOrElements ? queryOrElements : this.lastQueryOrElements);
  }
}
