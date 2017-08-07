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
  onChange: (value: any) => any = (value: any) => value;
  onTouched: () => void = () => null;

  private autoSaveTimeout: NodeJS.Timer;

  constructor(private elementRef: ElementRef, private ctService: ContentToolsService) {

    if (!this.getRegionID) console.log('Region name is not set by parameter ' + this.ctService.editorApp['_namingProp']);

    /* watch if element was touched */
    this.elementRef.nativeElement.addEventListener('keyup', () => this.onTouched() || this.autoSave());
    this.elementRef.nativeElement.addEventListener('click', () => this.onTouched());

    /* watch if element was changed. content tools modifies elements while editing, therefore we make the change only after save event */
    this.ctService.editorApp.addEventListener('saved', (event: ContentTools.Event) => {

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

  get value(): any {
    return this._value;
  }

  set value(value: any) {
    this._value = value;
    this.onChange(value);
    this.onTouched();
  }

  registerOnChange(fn: (value: any) => any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {

  }

  writeValue(value: any) {
    if (value !== this.value) {
      this.elementRef.nativeElement.innerHTML = value;
      this.ctService.refresh();
    }
  }

  autoSave() {
    // if autoset is turned off, quit
    if (!this.autoSaveDelay) return;

    // if there has been last change in less that timeout then cancel saving
    if (this.autoSaveTimeout) clearTimeout(this.autoSaveTimeout);

    // set timeout to save
    this.autoSaveTimeout = setTimeout(() => this.ctService.save(true), this.autoSaveDelay);
  }

  getRegionID() {
    return this.elementRef.nativeElement.getAttribute(this.ctService.editorApp['_namingProp']);
  }

  ngOnChange() {
    this.ctService.refresh();
  }

  ngOnDestroy() {
    this.ctService.stop(this.autoSaveDelay ? true : false);
  }
}
