import { indexCurtainDuration } from 'variables';

import { Animation } from './Animation';

interface Constructor {
  element: HTMLElement;
}

export class MoreLabel extends Animation {
  static lineId = '[data-more="line"]';
  static labelId = '[data-more="label"]';

  _lineEls: HTMLElement[];
  _labelEls: HTMLElement[];

  constructor({ element }: Constructor) {
    super({ element });

    this._lineEls = Array.from(
      this._element.querySelectorAll(MoreLabel.lineId),
    ) as HTMLElement[];

    this._labelEls = Array.from(
      this._element.querySelectorAll(MoreLabel.labelId),
    ) as HTMLElement[];

    this._addListeners();
  }

  _onMouseEnter = () => {
    this._lineEls.forEach((el) => {
      el.style.transition = `transform ${indexCurtainDuration}ms  cubic-bezier(0.77, 0, 0.175, 1)`;
      el.classList.add('card-content__more-label__line--active');
    });

    this._labelEls.forEach((el) => {
      el.style.transition = `transform ${indexCurtainDuration}ms  cubic-bezier(0.77, 0, 0.175, 1)`;
      el.classList.add('card-content__more-label__more--active');
    });
  };

  _onMouseLeave = () => {
    this._lineEls.forEach((el) => {
      el.classList.remove('card-content__more-label__line--active');
      el.style.transition = `transform ${indexCurtainDuration}ms  cubic-bezier(0.77, 0, 0.175, 1)`;
    });

    this._labelEls.forEach((el) => {
      el.classList.remove('card-content__more-label__more--active');
      el.style.transition = `transform ${indexCurtainDuration}ms  cubic-bezier(0.77, 0, 0.175, 1)`;
    });
  };

  _addListeners() {
    this._element.addEventListener('mouseenter', this._onMouseEnter);
    this._element.addEventListener('mouseleave', this._onMouseLeave);
  }

  removeListeners() {
    this._element.removeEventListener('mouseenter', this._onMouseEnter);
    this._element.removeEventListener('mouseleave', this._onMouseLeave);
  }

  animateIn() {
    super.animateIn();
  }

  animateOut() {
    super.animateOut();
  }

  onResize() {
    super.onResize();
    this.initObserver();
  }
}
