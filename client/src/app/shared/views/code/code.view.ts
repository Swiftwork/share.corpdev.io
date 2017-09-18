import { Component, ViewChild } from '@angular/core';

import { BaseView } from '../../../core/base/base.view';
import { CODE_EDITOR_MODES, ICodeEditorMode } from '../../components/code-editor/code-editor-modes';
import { CodeEditorComponent } from '../../components/code-editor/code-editor.component';

@Component({
  selector: 'v-code',
  templateUrl: './code.view.html',
  styleUrls: ['./code.view.css'],
  host: {
    '[class.v-code]': 'true',
  },
})
export class CodeView extends BaseView {
  @ViewChild(CodeEditorComponent) editorRef: CodeEditorComponent;

  public modes = CODE_EDITOR_MODES;
  public editorMode: ICodeEditorMode;

  constructor() {
    super();
    this.editorMode = CODE_EDITOR_MODES.find((mode) => mode.name === 'javascript' ? true : false);
  }

  ngOnInit() {
  }

  public onSelectMode(mode: ICodeEditorMode) {
    console.log(mode);
    this.editorRef.editor.getSession().setMode(mode.mode);
  }

}
