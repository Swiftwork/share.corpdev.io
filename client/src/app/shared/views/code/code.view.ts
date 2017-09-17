import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as ace from 'brace';
import 'brace/mode/typescript';
import 'brace/theme/tomorrow';

import { BaseView } from '../../../core/base/base.view';

@Component({
  selector: 'v-code',
  templateUrl: './code.view.html',
  styleUrls: ['./code.view.css'],
  host: {
    '[class.v-code]': 'true',
  },
})
export class CodeView extends BaseView {

  @ViewChild('editorRef') editorRef: ElementRef;

  public editor: ace.Editor;

  constructor() {
    super();
  }

  ngOnInit() {
    this.editor = ace.edit(this.editorRef.nativeElement);
    this.editor.getSession().setMode('ace/mode/typescript');
    this.editor.setTheme('ace/theme/tomorrow');
  }

}
