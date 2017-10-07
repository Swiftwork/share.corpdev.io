import { ElementRef } from '@angular/core';

import * as ContentTools from 'ContentTools';

export class ContentToolsEditor extends ContentTools.EditorApp.getCls() {

  private toolsParent: ElementRef;

  constructor(parent: ElementRef) {
    super();
    this.toolsParent = parent;
  }

  public mount() {
    this._domElement = ContentToolsEditor.createDiv(['ct-app']);
    this.toolsParent.nativeElement.appendChild(this._domElement);
    this._addDOMEventListeners();
  }
}
