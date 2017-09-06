import { Directive, ElementRef, EventEmitter, forwardRef, Input, Output, ValueProvider } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { ContentToolsService } from './content-tools.service';

export const CUSTOM_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ContentToolsDirective),
  multi: true,
};

@Directive({
  selector: '[editable]',
  providers: [CUSTOM_VALUE_ACCESSOR],
})
export class ContentToolsDirective implements ControlValueAccessor {
  /** Hook for host styles and should match this component's selector. */

  @Input() required: boolean = false;
  @Input() autoFocus: boolean = false;
  @Input('autoSave') autoSaveDelay: number = 0;

  /* TIGGERS */
  @Output() save = new EventEmitter();
  @Output() focus = new EventEmitter();
  @Output() blur = new EventEmitter();

  /* Value handlers */
  protected _value: string = '';
  onChange: (value: string) => string = (value: string) => value;
  onTouched: () => void = () => null;

  private autoSaveTimeout: number;

  constructor(private elementRef: ElementRef, private contentToolsService: ContentToolsService) {

    if (!this.getRegionID) console.log('Region name is not set by parameter ' + this.contentToolsService.editor['_namingProp']);

    /* watch if element was changed. content tools modifies elements while editing, therefore we make the change only after save event */
    this.contentToolsService.editor.addEventListener('saved', (event: ContentTools.Event) => {

      // get region data from event
      let changedData = event.detail().regions[this.getRegionID()];

      // data is only populated if something changed
      if (changedData) {
        // send data through ngModel
        this.onChange(changedData);
        // emit save event on element
        this.save.emit(changedData);
      }
      // if there was running timeout on save, we can clear it
      if (this.autoSaveTimeout) clearTimeout(this.autoSaveTimeout);
    });
  }

  onFocus(event: Event) {
    this.focus.emit(event);
  }

  onBlur(event: Event) {
    this.onTouched();
    this.blur.emit(event);
  }

  get value(): string {
    return this._value;
  }

  set value(value: string) {
    this._value = value;
    this.onChange(value);
    this.onTouched();
  }

  writeValue(value: string) {
    if (!value) value = '';
    if (value !== this.value) {
      this.value = value;
      this.elementRef.nativeElement.innerHTML = value;
      this.contentToolsService.refresh();
    }
  }

  registerOnChange(fn: (value: string) => string) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {

  }

  autoSave() {
    // if autoset is turned off, quit
    if (!this.autoSaveDelay) return;

    // if there has been last change in less that timeout then cancel saving
    if (this.autoSaveTimeout) clearTimeout(this.autoSaveTimeout);

    // set timeout to save
    this.autoSaveTimeout = window.setTimeout(() => {
      this.contentToolsService.save(true);
    }, this.autoSaveDelay);
  }

  getRegionID() {
    return this.elementRef.nativeElement.getAttribute(this.contentToolsService.editor['_namingProp']);
  }

  /*
  ngOnChange() {
    this.ctService.refresh();
  }
  */

  ngOnDestroy() {
    this.contentToolsService.stop(this.autoSaveDelay ? true : false);
  }
}
