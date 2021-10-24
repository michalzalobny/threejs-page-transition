import { pageTransitionDuration } from 'variables';

import { wrapEl } from '../utils/wrapEl';

interface Constructor {
  element: HTMLElement;
}

export class BottomHide {
  _element: HTMLElement;
  _innerWrapper: HTMLElement;
  _outerWrapper: HTMLElement;

  constructor({ element }: Constructor) {
    if (!element.dataset.wrapped) {
      wrapEl({ el: element, wrapperClass: 'bottom-hide__inner' });
      wrapEl({
        el: element.parentElement,
        wrapperClass: 'bottom-hide__outer',
      });
      element.dataset.wrapped = 'wrapped';
    }

    const innerWrapper = element.parentElement as HTMLElement;
    const outerWrapper = innerWrapper.parentElement as HTMLElement;

    this._element = element;

    this._innerWrapper = innerWrapper;
    this._outerWrapper = outerWrapper;
  }

  animateIn() {
    this._innerWrapper.classList.add('bottom-hide__inner--active');
    this._innerWrapper.style.transition = `transform ${
      pageTransitionDuration * 0.8
    }ms  cubic-bezier(0.77, 0, 0.175, 1)`;
  }

  animateOut() {
    this._innerWrapper.classList.remove('bottom-hide__inner--active');
    this._innerWrapper.style.transition = `transform ${
      pageTransitionDuration * 0.7
    }ms  cubic-bezier(0.77, 0, 0.175, 1)`;
  }
}
