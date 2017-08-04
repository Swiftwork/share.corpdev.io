import { Injectable } from '@angular/core';

import { ImageUploader } from './content-tools.utils';

declare var ContentTools: any;

@Injectable()
export class ContentToolsService {

  public editor: any;

  private defaultQuery: any;

  callback: (event: any) => void;

  constructor() {
    // get the editor
    this.editor = ContentTools.EditorApp.get();

    this.onSave = this.onSave.bind(this);
  }

  // translation of editor.init()
  init(query: string | HTMLElement[], id?: string, fixture?: (element: HTMLElement) => boolean, ignition?: boolean) {
    this.editor.init(query, id, fixture, ignition);

    ContentTools.IMAGE_UPLOADER = (dialog: any) => new ImageUploader(dialog);

    // save the default query for later restoring
    this.defaultQuery = query;

    // call callback when saved
    this.editor.addEventListener('saved', this.onSave);
  }

  onSave(event: any) {
    // tslint:disable-next-line:one-variable-per-declaration
    let name, payload, regions, xhr;

    // Check that something changed
    regions = event.detail().regions;
    if (Object.keys(regions).length === 0) {
      return;
    }

    // Set the editor as busy while we save our changes
    this.editor.busy(true);

    // Collect the contents of each region into a FormData instance
    payload = new FormData();
    for (name in regions) {
      if (regions.hasOwnProperty(name)) {
        payload.append(name, regions[name]);
      }
    }

    xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', onStateChange);
    xhr.open('POST', '/save-my-page');
    xhr.send(payload);

    // Send the update content to the server to be saved
    function onStateChange(ev) {
      // Check if the request is finished
      if (ev.target.readyState === 4) {
        editor.busy(false);
        if (ev.target.status === '200') {
          // Save was successful, notify the user with a flash
          new ContentTools.FlashUI('ok');
        } else {
          // Save failed, notify the user with a flash
          new ContentTools.FlashUI('no');
        }
      }
    }
  }

  start(query?: string, cb?: () => any) {

    // if there is query, use it, otherwise use default
    this.editor.syncRegions(query ? query : this.defaultQuery);

    // if user wants to attach a callback for this edit session
    this.callback = cb;

    // launch editor
    this.editor.start();

    // if IgnitionUI present, propagate change of status there
    if (this.editor.ignition()) this.editor.ignition().state('editing');
  }

  save(passive?: boolean) {
    return this.editor.save(passive);
  }

  stop(save?: boolean) {

    if (this.editor.getState() !== 'editing') return;

    // stop editing, hide editor
    this.editor.stop(save);

    // remove callback
    this.callback = null;

    // set default query
    this.editor.syncRegions(this.defaultQuery);

    // if IgnitionUI present, propagate change of status there
    if (this.editor.ignition()) this.editor.ignition().state('ready');
  }

  refresh() {
    this.editor.syncRegions();
  }
}
