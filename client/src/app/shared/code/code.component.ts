import { Component, Input, ViewChild } from '@angular/core';

import { AssetService, ITextualAsset } from '../assets/shared/asset.service';
import { CODE_EDITOR_MODES, ICodeEditorMode } from './code-editor/code-editor-modes';
import { CodeEditorComponent } from './code-editor/code-editor.component';

@Component({
  selector: 'c-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css'],
  host: {
    '[class.c-code]': 'true',
    '[attr.aria-busy]': 'busy',
  },
})
export class CodeComponent {
  @ViewChild(CodeEditorComponent) editorRef: CodeEditorComponent;

  @Input() id: string;
  @Input() title: string;
  @Input() code: string;

  public modes = CODE_EDITOR_MODES;
  public editorMode: ICodeEditorMode;

  public busy = false;

  constructor(
    private assetService: AssetService,
  ) {
    this.editorMode = CODE_EDITOR_MODES.find((mode) => mode.name === 'javascript' ? true : false);
  }

  ngOnInit() {
    if (this.id) {
      this.busy = true;
      this.assetService.get(this.id);
    }
  }

  public onSelectMode(mode: ICodeEditorMode) {
    console.log(mode);
    this.editorRef.editor.getSession().setMode(mode.mode);
  }

  public onSave() {
    this.busy = true;
    if (this.id) {

    } else {
      const subscription = this.assetService.add({
        name: this.title,
        extension: this.editorMode.extensions.split('|')[0],
        content: this.code,
        mimetype: `text/${this.editorMode.mode.split('/')[2]}`,
        modified: new Date(),
      } as ITextualAsset).subscribe(() => {
        this.busy = false;
        subscription.unsubscribe();
      });
    }
  }

}
