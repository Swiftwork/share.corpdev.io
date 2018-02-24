declare module 'autosize' {

  function autosize(el: HTMLElement | HTMLElement[]): void;

  namespace autosize {

    function destroy(el: HTMLElement | HTMLElement[]): void;

    function update(el: HTMLElement | HTMLElement[]): void;
  }

  export default autosize;
}
