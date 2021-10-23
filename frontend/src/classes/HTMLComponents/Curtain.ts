import TWEEN, { Tween } from '@tweenjs/tween.js';

import { AnimateProps } from 'types';
import { globalState } from 'utils/globalState';
import { indexCurtainDuration } from 'variables';

import { Animation } from './Animation';

interface Constructor {
  element: HTMLElement;
}

export class Curtain extends Animation {
  static topId = '[data-curtain="top"]';
  static bottomId = '[data-curtain="bottom"]';
  static hoverTarget = '[data-curtain="hover"]';

  _curtainTop: HTMLElement;
  _curtainTopChild: HTMLElement;
  _curtainBottom: HTMLElement;
  _curtainBottomChild: HTMLElement;
  _hoverProgress = 0;
  _hoverTween: Tween<{ progress: number }> | null = null;
  _hoverTargetEl: HTMLElement;

  constructor({ element }: Constructor) {
    super({ element });

    this._hoverTargetEl = Array.from(
      this._element.querySelectorAll(Curtain.hoverTarget),
    )[0] as HTMLElement;

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
    duration = indexCurtainDuration,
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

  _onClick = () => {
    const elId = this._element.dataset.curtainUid;

    if (globalState.router) {
      globalState.router.push('/details/[id]', `/details/${elId}`);
    }
  };

  _addListeners() {
    this._hoverTargetEl.addEventListener('mouseenter', this._onMouseEnter);
    this._hoverTargetEl.addEventListener('mouseleave', this._onMouseLeave);
    this._hoverTargetEl.addEventListener('click', this._onClick);
  }

  stopHoverTween() {
    if (this._hoverTween) {
      this._hoverTween.stop();
    }
  }

  removeListeners() {
    this._hoverTargetEl.removeEventListener('mouseenter', this._onMouseEnter);
    this._hoverTargetEl.removeEventListener('mouseleave', this._onMouseLeave);
    this._hoverTargetEl.removeEventListener('click', this._onClick);
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
