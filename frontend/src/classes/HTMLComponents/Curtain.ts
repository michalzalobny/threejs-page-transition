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
  _curtainBottom: HTMLElement;
  _hoverProgress = 0;
  _hoverTween: Tween<{ progress: number }> | null = null;

  constructor({ element }: Constructor) {
    super({ element, shouldObserve: false });

    this._curtainTop = Array.from(
      this._element.querySelectorAll(Curtain.topId),
    )[0] as HTMLElement;

    this._curtainBottom = Array.from(
      this._element.querySelectorAll(Curtain.bottomId),
    )[0] as HTMLElement;

    this._addListeners();
  }

  _animateHover({
    destination,
    duration = 800,
    delay = 0,
    easing = TWEEN.Easing.Linear.None,
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
        // this._hoverProgress = obj.progress;
        // this._curtainTop.style.height = (1 - this._hoverProgress) * 50 + '%';
        // this._curtainBottom.style.transform = `translateX(-50%) translateY(-${
        //   this._hoverProgress * 100 + '%'
        // })`;
        // this._curtainBottom.style.height = (1 - this._hoverProgress) * 50 + '%';
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
