import TWEEN, { Tween } from '@tweenjs/tween.js';
import Prefix from 'prefix';

import { pageTransitionDuration } from 'variables';
import { Bounds } from 'types';

export class Transition {
  static animateParentRatio = 0.1; // value from 0 to 1, fires animating in elements;

  _canvas: HTMLCanvasElement;
  _ctx: CanvasRenderingContext2D | null;
  _curtainProgress = 0;
  _curtainProgressTween: Tween<{ progress: number }> | null = null;
  _color = '#000000';
  _transformPrefix = Prefix('transform');
  _parentFn: (() => void) | null = null;
  _rendererBounds: Bounds = { height: 10, width: 100 };

  constructor() {
    this._canvas = document.createElement('canvas');
    this._canvas.className = 'transition';
    this._ctx = this._canvas.getContext('2d');
    document.body.appendChild(this._canvas);
  }

  _setSizes() {
    if (this._canvas && this._ctx) {
      const w = this._rendererBounds.width;
      const h = this._rendererBounds.height;
      const ratio = Math.min(window.devicePixelRatio, 2);

      this._canvas.width = w * ratio;
      this._canvas.height = h * ratio;
      this._canvas.style.width = w + 'px';
      this._canvas.style.height = h + 'px';
      this._ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    }
  }

  _animateProgress(destination: number) {
    if (this._curtainProgressTween) {
      this._curtainProgressTween.stop();
    }

    this._curtainProgressTween = new TWEEN.Tween({
      progress: this._curtainProgress,
    })
      .to({ progress: destination }, pageTransitionDuration)
      .easing(TWEEN.Easing.Exponential.InOut)
      .onUpdate((obj) => {
        this._curtainProgress = obj.progress;
        this._onUpdate();
      })
      .onComplete(() => {
        if (destination === 1) this._hide();
        if (destination === 0 && this._parentFn) this._parentFn();
      });

    this._curtainProgressTween.start();
  }

  _hide() {
    this._canvas.style[this._transformPrefix] = 'rotate(0deg)';
    this._animateProgress(0);
  }

  _onUpdate() {
    if (!this._ctx) {
      return;
    }

    this._ctx.clearRect(
      0,
      0,
      this._rendererBounds.width,
      this._rendererBounds.height,
    );
    this._ctx.save();
    this._ctx.beginPath();

    const segments = 20;

    const widthSegments = Math.ceil(this._rendererBounds.width / segments);
    this._ctx.moveTo(this._rendererBounds.width, this._rendererBounds.height);
    this._ctx.lineTo(0, this._rendererBounds.height);

    const t = (1 - this._curtainProgress) * this._rendererBounds.height;
    const amplitude =
      this._rendererBounds.width *
      0.1 *
      Math.sin(this._curtainProgress * Math.PI);

    this._ctx.lineTo(0, t);

    for (let index = 0; index <= widthSegments; index++) {
      const n = segments * index;
      const r =
        t - Math.sin((n / this._rendererBounds.width) * Math.PI) * amplitude;

      this._ctx.lineTo(n, r);
    }

    this._ctx.fillStyle = this._color;
    this._ctx.fill();
    this._ctx.restore();
  }

  show(color: string, parentFn: () => void) {
    this._color = color;
    this._canvas.style[this._transformPrefix] = 'rotate(180deg)';
    this._parentFn = parentFn;
    this._animateProgress(1);
  }

  setRendererBounds(rendererBounds: Bounds) {
    this._rendererBounds = rendererBounds;
    this._setSizes();
  }
}
