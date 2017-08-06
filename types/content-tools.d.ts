declare namespace ContentTools {

  class ComponentUI {

    static createDiv(classNames: string[], attributes: { [key: string]: any }, content: any): HTMLElement;
    children(): HTMLElement[];
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
  }

  class FlashUI extends AnchoredComponentUI {
    constructor(modifier: any);
  }
}

declare module 'ContentTools' {
  export = ContentTools;
}
