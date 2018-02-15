declare namespace ContentTools {

  const Tools: any;

  const CANCEL_MESSAGE: string;

  const DEFAULT_TOOLS: any[][];

  const DEFAULT_VIDEO_HEIGHT: number;
  const DEFAULT_VIDEO_WIDTH: number;

  const HIGHLIGHT_HOLD_DURATION: number;

  const INSPECTOR_IGNORED_ELEMENTS: string[];

  const IMAGE_UPLOADER: (dialog: any) => any;

  const MIN_CROP: number;

  const RESTRICTED_ATTRIBUTES: { [key: string]: string };

  function getEmbedVideoURL(url: string): string;

  function getRestrictedAtributes(tagName: string): string[];

  function getScrollPosition(): number[];

  class ComponentUI {

    protected _bindings: { [key: string]: string };
    protected _parent: ComponentUI;
    protected _children: ComponentUI[];
    protected _domElement: HTMLElement;

    static createDiv(classNames?: string[], attributes?: { [key: string]: any }, content?: any): HTMLElement;
    children(): ComponentUI[];
    domElement(): HTMLElement;
    isMounted(): boolean;
    parent(): ComponentUI;
    attach(component: ComponentUI, index?: number): void;
    addCSSClass(className: string): void;
    detach(component: ComponentUI): void;
    mount(...args: any[]): void;
    removeCSSClass(className: string): void;
    unmount(): void;
    addEventListener(eventName: string, callback: (event: Event) => void): void;
    createEvent(eventName: string, detail: any): any;
    dispatchEvent(ev: Event): any;
    removeEventListener(eventName: string, callback: (event: Event) => void): void;
  }

  class WidgetUI extends ComponentUI {
    show(): void;
    hide(): void;
  }

  class AnchoredComponentUI extends ComponentUI {
    mount(domParent: HTMLElement, before: HTMLElement): void;
  }

  class EditorApp extends ComponentUI {
    static get(): EditorApp;
    static getCls(): typeof EditorApp;

    ctrlDown(): any;
    domRegions(): any;
    getState(): any;
    ignition(): any;
    inspector(): any;
    isDormant(): boolean;
    isReady(): boolean;
    isEditing(): boolean;
    orderedRegions(): any[];
    regions(): any[];
    shiftDown(): any;
    toolbox(): any;

    busy(busy: boolean): void;
    createPlaceholderElement(region: any): any;
    init(queryOrDOMElements: string | HTMLElement[],
      namingProp?: string,
      fixtureTest?: (el: HTMLElement) => boolean,
      withIgnition?: boolean,
    ): void;
    destroy(): void;
    highlightRegions(highlight: boolean): void;
    paste(element: HTMLElement, clipboardData: any): void;
    revert(): boolean;
    revertToSnapshot(snapshot: any, restoreEditable?: boolean): void;
    save(passive: boolean): void;
    setRegionOrder(regionNames: string[]): void;
    start(): void;
    stop(save: boolean): void;
    syncRegions(regionQuery?: any, restoring?: any): void;

    protected _addDOMEventListeners(): void;
    protected _allowEmptyRegions(callback: () => void): void;
    protected _preventEmptyRegions(): void;
    protected _removeDOMEventListeners(): void;
    protected _initRegions(restoring?: boolean): void;
  }

  class History {
    constructor(regions: any[]);
    canRedo(): boolean;
    canUndo(): boolean;
    index(): number;
    length(): number;
    snapshot(): any;
    goTo(index: number): any;
    redo(): any;
    replaceRegions(regions: { [key: string]: any }): void;
    restoreSelection(snapshot: any): void;
    stopWatching(): void;
    undo(): void;
    watch(): void;
  }

  class StylePalette {
    static _style: Style[];
    static add(style: Style[]): void;
    static styles(element: HTMLElement): Style[];
  }

  class Style {
    constructor(name: string, cssClass: string, applicableTo: string[]);
    applicableTo(): string[];
    cssClass(): string;
    name(): string;
  }

  class FlashUI extends AnchoredComponentUI {
    constructor(modifier: any);
  }

  class Event extends CustomEvent<any> {
    constructor(name: string, detail: { [key: string]: any })
    readonly name: string;
    readonly timeStamp: number;
  }
}

declare module 'ContentTools' {
  export = ContentTools;
}
