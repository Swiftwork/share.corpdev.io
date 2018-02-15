import * as ace from 'brace';

declare module 'brace' {
  export interface Editor {
    off(ev: string, callback: (e: any) => any): void;
  }
}
