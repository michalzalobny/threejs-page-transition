import { pageTransitionDuration } from 'variables';

import { Animation } from './Animation';
import { wrapEl } from '../utils/wrapEl';

interface Constructor {
  element: HTMLElement;
}

export class BottomHide extends Animation {
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

    super({ element, observerElement: outerWrapper });

    this._innerWrapper = innerWrapper;
    this._outerWrapper = outerWrapper;
  }

  animateIn() {
    super.animateIn();

    this._innerWrapper.classList.add('bottom-hide__inner--active');
    this._innerWrapper.style.transition = `transform ${pageTransitionDuration}ms  cubic-bezier(0.77, 0, 0.175, 1)`;
  }

  animateOut() {
    super.animateOut();
    this._innerWrapper.classList.remove('bottom-hide__inner--active');
    this._innerWrapper.style.transition = `transform ${
      pageTransitionDuration * 0.5
    }ms  cubic-bezier(0.77, 0, 0.175, 1)`;
  }

  onResize() {
    super.onResize();
    this.initObserver();
  }
}
