// keyup / keydown 이벤트에 대한 인터페이스 확장
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const focusableElements: Element[] = [];

interface Element {
  removeEventListener(
    type: 'keyup' | 'keydown',
    listener: (event: KeyboardEvent) => void,
    options?: boolean | EventListenerOptions
  ): void;
  addEventListener(
    type: 'keyup' | 'keydown',
    listener: (event: KeyboardEvent) => void,
    options?: boolean | EventListenerOptions
  ): void;
}

interface EventTarget {
  readonly closest: (selector: string) => HTMLElement | null;
}
