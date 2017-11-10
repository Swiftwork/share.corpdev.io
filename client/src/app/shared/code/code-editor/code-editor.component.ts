import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms/src/directives';
import * as ace from 'brace';

@Component({
  selector: 'c-code-editor',
  template: '',
  styleUrls: ['./code-editor.component.css'],
  host: {
    '[class.c-code-editor]': 'true',
  },
})
export class CodeEditorComponent implements OnInit, ControlValueAccessor {

  @Input() code: string;

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

  public writeValue(obj: any): void {
    throw new Error('Not implemented yet.');
  }

  public registerOnChange(fn: any): void {
    throw new Error('Not implemented yet.');
  }

  public registerOnTouched(fn: any): void {
    throw new Error('Not implemented yet.');
  }

  public setDisabledState(isDisabled: boolean): void {
    throw new Error('Not implemented yet.');
  }
}
