import { Component, ElementRef, OnInit } from '@angular/core';
import * as ace from 'brace';

@Component({
  selector: 'c-code-editor',
  template: '',
  styleUrls: ['./code-editor.component.css'],
  host: {
    '[class.c-code-editor]': 'true',
  },
})
export class CodeEditorComponent implements OnInit {

  public editor: ace.Editor;

  constructor(
    public hostRef: ElementRef,
  ) {
  }

  ngOnInit() {
    this.editor = ace.edit(this.hostRef.nativeElement);
    this.editor.setOptions({
      theme: 'ace/theme/tomorrow',
      mode: 'ace/mode/typescript',
      fontSize: 14,
    });
  }
}
