/* eslint-disable no-undef */
const focusableSelector = `
  a[href], 
  area[href], 
  button, 
  input, 
  select, 
  textarea, 
  iframe, 
  summary, 
  details, 
  video[controls], 
  audio[controls], 
  [contenteditable=""], 
  [contenteditable="true"], 
  [tabindex]
`
  .replace(/\n\s+/g, '')
  .trim();

const tabbableSelector = focusableSelector.replace(
  /\[tabindex\]/,
  '[tabindex]:not([tabindex^="-"])'
);

export const isFocusableElement = (node: HTMLElement) => {
  const $wrapper = document.createElement('div');
  $wrapper.append(node);
  return Boolean($wrapper.querySelector(focusableSelector));
};

export const getFocusableChild = (node: HTMLElement): HTMLElement | null =>
  node.querySelector(focusableSelector);

export const getFocusableChildren = (node: HTMLElement): HTMLElement[] =>
  Array.from(node.querySelectorAll(focusableSelector));

export const getTabbableChildren = (node: HTMLElement): HTMLElement[] =>
  Array.from(node.querySelectorAll(tabbableSelector));

export const removeTabbable = (node: HTMLElement) =>
  node.setAttribute('tabindex', '-1');
export const restoreTabbable = (node: HTMLElement) =>
  node.setAttribute('tabindex', '0');
export const toggleTabbable = (node: HTMLElement, force: boolean) => {
  if (force === undefined) {
    node.setAttribute(
      'tabindex',
      node.getAttribute('tabindex') === '0' ? '-1' : '0'
    );
  } else {
    force ? restoreTabbable(node) : removeTabbable(node);
  }
};
