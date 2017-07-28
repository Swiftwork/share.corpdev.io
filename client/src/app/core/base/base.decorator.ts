import { Component, ViewEncapsulation } from '@angular/core';

declare var Reflect: any;
const _reflect: any = Reflect;

export function BaseComponent(metadata: any = {}) {
  return (cls: any) => {
    return DecoratorUtils.annotateComponent(cls, metadata);
  };
}

export class DecoratorUtils {
  public static getMetadata(metadata: any = {}) {

    if (metadata.selector) {
      metadata.encapsulation = ViewEncapsulation.None;
      metadata.host = (typeof metadata.host === 'object' ? metadata.host : {});
      metadata.host[`[class.${metadata.selector}]`] = 'true';
    }

    return metadata;
  }

  public static annotateComponent(cls: any, metadata: any = {}) {
    let annotations = _reflect.getMetadata('annotations', cls) || [];
    annotations.push(new Component(DecoratorUtils.getMetadata(metadata)));
    _reflect.defineMetadata('annotations', annotations, cls);
    return cls;
  }
}
