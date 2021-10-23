import { WrapEl } from 'types';

export const wrapEl = ({ el, wrapperClass }: WrapEl) => {
  if (!el || !el.parentNode) return;

  const wrapper = document.createElement('span');
  wrapper.classList.add(wrapperClass);

  el.parentNode.insertBefore(wrapper, el);
  wrapper.appendChild(el);
};
