import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';

import { ImageUploader } from './content-tools.utils';

import * as ContentTools from 'ContentTools';

export interface IEditorEvent {
  event: ContentTools.Event,
  editor: ContentTools.EditorApp;
}

@Injectable()
export class ContentToolsService {

  public editorApp: ContentTools.EditorApp;

  private defaultQuery: any;

  constructor() {
    // get the editor
    this.editorApp = ContentTools.EditorApp.get();
  }

  // translation of editor.init()
  init(query: string | HTMLElement[], id?: string, fixture?: (element: HTMLElement) => boolean, ignition?: boolean) {
    this.editorApp.init(query, id, fixture, ignition);

    (ContentTools as any)['IMAGE_UPLOADER'] = (dialog: any) => new ImageUploader(dialog);

    // save the default query for later restoring
    this.defaultQuery = query;
  }

  start(query?: string, cb?: () => any) {

    // if there is query, use it, otherwise use default
    this.editorApp.syncRegions(query ? query : this.defaultQuery);

    // launch editor
    this.editorApp.start();

    // if IgnitionUI present, propagate change of status there
    if (this.editorApp.ignition()) this.editorApp.ignition().state('editing');
  }

  save(passive?: boolean) {
    return this.editorApp.save(passive);
  }

  stop(save?: boolean) {

    if (this.editorApp.getState() !== 'editing') return;

    // stop editing, hide editor
    this.editorApp.stop(save);

    // set default query
    this.editorApp.syncRegions(this.defaultQuery);

    // if IgnitionUI present, propagate change of status there
    if (this.editorApp.ignition()) this.editorApp.ignition().state('ready');
  }

  refresh() {
    this.editorApp.syncRegions();
  }
}
