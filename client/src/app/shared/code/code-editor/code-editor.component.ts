import { Component, ElementRef, forwardRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessor } from '@angular/forms/src/directives';
import * as ace from 'brace';

@Component({
  selector: 'c-code-editor',
  template: '',
  styleUrls: ['./code-editor.component.css'],
  host: {
    '[class.c-code-editor]': 'true',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CodeEditorComponent),
      multi: true,
    },
  ],
})
export class CodeEditorComponent implements OnInit, ControlValueAccessor {

  public editor: ace.Editor;

  /* Value handlers */
  protected _code: string = '';
  changed: (value: string) => string = (value: string) => value;
  touched: () => void = () => null;

  constructor(
    public hostRef: ElementRef,
  ) {
    this.onChange = this.onChange.bind(this);
  }

  ngOnInit() {
    this.editor = ace.edit(this.hostRef.nativeElement);
    this.editor.setOptions({
      theme: 'ace/theme/tomorrow',
      mode: 'ace/mode/typescript',
      fontSize: 14,
    });
    this.editor.$blockScrolling = Infinity;
    this.editor.on('change', this.onChange);
    this.editor.on('paste', this.onChange);
  }

  ngOnDestroy() {
    this.editor.off('change', this.onChange);
    this.editor.off('paste', this.onChange);
  }

  onChange() {
    const code = this.editor.getValue();
    this._code = code;
    this.changed(code);
  }

  get code(): string {
    return this._code;
  }

  set code(code: string) {
    this._code = code;
    this.editor.setValue(code, 1);
    this.changed(code);
  }

  registerOnChange(fn: (value: string) => string) {
    this.changed = fn;
  }

  registerOnTouched(fn: () => void) {
    this.touched = fn;
  }

  writeValue(value: string) {
    if (value === null || value === undefined) value = '';
    if (this._code !== value) this.code = value;
  }
}
