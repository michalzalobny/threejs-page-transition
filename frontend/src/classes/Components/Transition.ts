import TWEEN, { Tween } from '@tweenjs/tween.js';
import Prefix from 'prefix';

export class Transition {
  static animateParentRatio = 0.8; // value from 0 to 1, fires animating in elements;

  _element: HTMLCanvasElement;
  _context: CanvasRenderingContext2D | null;
  _curtainProgress = 0;
  _curtainProgressTween: Tween<{ progress: number }> | null = null;
  _color = '#000000';
  _transformPrefix = Prefix('transform');
  _parentFn: (() => void) | null = null;

  constructor() {
    this._element = document.createElement('canvas');
    this._element.className = 'transition';
    this._element.height = window.innerHeight * window.devicePixelRatio;
    this._element.width = window.innerWidth * window.devicePixelRatio;
    this._context = this._element.getContext('2d');
    document.body.appendChild(this._element);
  }

  _animateProgress(destination: number) {
    if (this._curtainProgressTween) {
      this._curtainProgressTween.stop();
    }

    let canFireParentFn = true;

    this._curtainProgressTween = new TWEEN.Tween({
      progress: this._curtainProgress,
    })
      .to({ progress: destination }, 1200)
      .easing(TWEEN.Easing.Exponential.InOut)
      .onUpdate((obj) => {
        this._curtainProgress = obj.progress;
        this._onUpdate();

        if (
          destination === 0 &&
          this._curtainProgress < Transition.animateParentRatio &&
          canFireParentFn
        ) {
          canFireParentFn = false;
          if (this._parentFn) this._parentFn();
        }
      })
      .onComplete(() => {
        if (destination === 1) this._hide();
      });

    this._curtainProgressTween.start();
  }

  _hide() {
    this._element.style[this._transformPrefix] = 'rotate(0deg)';
    this._animateProgress(0);
  }

  _onUpdate() {
    if (!this._context) {
      return;
    }

    this._context.clearRect(0, 0, this._element.width, this._element.height);
    this._context.save();
    this._context.beginPath();

    const segments = window.innerWidth < 400 ? 20 : 40; //TODO

    const widthSegments = Math.ceil(this._element.width / segments);
    this._context.moveTo(this._element.width, this._element.height);
    this._context.lineTo(0, this._element.height);

    const t = (1 - this._curtainProgress) * this._element.height;
    const amplitude = 250 * Math.sin(this._curtainProgress * Math.PI);

    this._context.lineTo(0, t);

    for (let index = 0; index <= widthSegments; index++) {
      const n = segments * index;
      const r = t - Math.sin((n / this._element.width) * Math.PI) * amplitude;

      this._context.lineTo(n, r);
    }

    this._context.fillStyle = this._color;
    this._context.fill();
    this._context.restore();
  }

  show(color: string, parentFn: () => void) {
    this._color = color;
    this._element.style[this._transformPrefix] = 'rotate(180deg)';
    this._parentFn = parentFn;
    this._animateProgress(1);
  }
}
