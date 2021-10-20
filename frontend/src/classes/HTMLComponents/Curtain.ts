import TWEEN, { Tween } from '@tweenjs/tween.js';

import { AnimateProps } from 'types';

import { Animation } from './Animation';

interface Constructor {
  element: HTMLElement;
}

export class Curtain extends Animation {
  static topId = '[data-curtain="top"]';
  static bottomId = '[data-curtain="bottom"]';

  _curtainTop: HTMLElement;
  _curtainTopChild: HTMLElement;
  _curtainBottom: HTMLElement;
  _curtainBottomChild: HTMLElement;
  _hoverProgress = 0;
  _hoverTween: Tween<{ progress: number }> | null = null;

  constructor({ element }: Constructor) {
    super({ element, shouldObserve: false });

    this._curtainTop = Array.from(
      this._element.querySelectorAll(Curtain.topId),
    )[0] as HTMLElement;

    this._curtainTopChild = this._curtainTop.childNodes[0] as HTMLElement;

    this._curtainBottom = Array.from(
      this._element.querySelectorAll(Curtain.bottomId),
    )[0] as HTMLElement;

    this._curtainBottomChild = this._curtainBottom.childNodes[0] as HTMLElement;

    this._addListeners();
  }

  _animateHover({
    destination,
    duration = 1500,
    delay = 0,
    easing = TWEEN.Easing.Exponential.InOut,
  }: AnimateProps) {
    if (this._hoverTween) {
      this._hoverTween.stop();
    }

    this._hoverTween = new TWEEN.Tween({
      progress: this._hoverProgress,
    })
      .to({ progress: destination }, duration)
      .delay(delay)
      .easing(easing)
      .onUpdate((obj) => {
        this._hoverProgress = obj.progress;

        this._curtainTop.style[this._transformPrefix] = `translateY(${
          this._hoverProgress * -50 + '%'
        })`;

        this._curtainTopChild.style[this._transformPrefix] = `translateY(${
          this._hoverProgress * 50 + '%'
        })`;

        this._curtainBottom.style[this._transformPrefix] = `translateY(${
          this._hoverProgress * 50 + '%'
        })`;

        this._curtainBottomChild.style[this._transformPrefix] = `translateY(${
          this._hoverProgress * -50 + '%'
        })`;
      });

    this._hoverTween.start();
  }

  _onMouseEnter = () => {
    this._animateHover({ destination: 1 });
  };

  _onMouseLeave = () => {
    this._animateHover({ destination: 0 });
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
