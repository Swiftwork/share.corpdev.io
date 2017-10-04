import { Component, ViewChild } from '@angular/core';

import { CODE_EDITOR_MODES, ICodeEditorMode } from './code-editor/code-editor-modes';
import { CodeEditorComponent } from './code-editor/code-editor.component';

@Component({
  selector: 'c-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css'],
  host: {
    '[class.c-code]': 'true',
  },
})
export class CodeComponent {
  @ViewChild(CodeEditorComponent) editorRef: CodeEditorComponent;

  public modes = CODE_EDITOR_MODES;
  public editorMode: ICodeEditorMode;

  constructor() {
    this.editorMode = CODE_EDITOR_MODES.find((mode) => mode.name === 'javascript' ? true : false);
  }

  ngOnInit() {
  }

  public onSelectMode(mode: ICodeEditorMode) {
    console.log(mode);
    this.editorRef.editor.getSession().setMode(mode.mode);
  }

}
