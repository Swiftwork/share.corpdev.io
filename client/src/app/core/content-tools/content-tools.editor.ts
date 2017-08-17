import { ElementRef } from '@angular/core';

import * as ContentTools from 'ContentTools';

export class ContentToolsEditor extends ContentTools.EditorApp.getCls() {

  private toolsParent: ElementRef;

  public toolsMount(parent: ElementRef) {
    this.toolsParent = parent;
    this.unmount();
    this.mount();
  }

  public mount() {
    console.log('mount');
    this._domElement = ContentToolsEditor.createDiv(['ct-app']);
    if (this.toolsParent)
      this.toolsParent.nativeElement.appendChild(this._domElement);
    else
      document.body.appendChild(this._domElement);
    this._addDOMEventListeners();
  }
}
