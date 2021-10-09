import TWEEN, { Tween } from '@tweenjs/tween.js';
import Prefix from 'prefix';

export class Transition {
  element: HTMLCanvasElement;
  context: CanvasRenderingContext2D | null;
  _curtainProgress = 0;
  _curtainProgressTween: Tween<{ progress: number }> | null = null;
  _color = '#000000';
  _transformPrefix = Prefix('transform');
  _parentFn: (() => void) | null = null;

  constructor() {
    this.element = document.createElement('canvas');
    this.element.className = 'transition';
    this.element.height = window.innerHeight * window.devicePixelRatio;
    this.element.width = window.innerWidth * window.devicePixelRatio;
    this.context = this.element.getContext('2d');
    document.body.appendChild(this.element);
  }

  animateProgress(destination: number) {
    if (this._curtainProgressTween) {
      this._curtainProgressTween.stop();
    }

    this._curtainProgressTween = new TWEEN.Tween({
      progress: this._curtainProgress,
    })
      .to({ progress: destination }, 1500)
      .easing(TWEEN.Easing.Exponential.InOut)
      .onUpdate((obj) => {
        this._curtainProgress = obj.progress;
        this.onUpdate();
      })
      .onComplete(() => {
        if (destination === 1) this.hide();
        if (destination === 0) {
          if (this._parentFn) this._parentFn();
        }
      });

    this._curtainProgressTween.start();
  }

  show(color: string, parentFn: () => void) {
    this._color = color;
    this.element.style[this._transformPrefix] = 'rotate(180deg)';
    this._parentFn = parentFn;

    this.animateProgress(1);
  }

  hide() {
    this.element.style[this._transformPrefix] = 'rotate(0deg)';
    this.animateProgress(0);
  }

  onUpdate() {
    if (!this.context) {
      return;
    }

    this.context.clearRect(0, 0, this.element.width, this.element.height);
    this.context.save();
    this.context.beginPath();

    const segments = window.innerWidth < 400 ? 20 : 40; //TODO

    const widthSegments = Math.ceil(this.element.width / segments);
    this.context.moveTo(this.element.width, this.element.height);
    this.context.lineTo(0, this.element.height);

    const t = (1 - this._curtainProgress) * this.element.height;
    const amplitude = 250 * Math.sin(this._curtainProgress * Math.PI);

    this.context.lineTo(0, t);

    for (let index = 0; index <= widthSegments; index++) {
      const n = segments * index;
      const r = t - Math.sin((n / this.element.width) * Math.PI) * amplitude;

      this.context.lineTo(n, r);
    }

    this.context.fillStyle = this._color;
    this.context.fill();
    this.context.restore();
  }
}
