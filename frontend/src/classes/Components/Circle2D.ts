import TWEEN, { Tween } from '@tweenjs/tween.js';

import { Bounds, UpdateInfo } from 'types';
import { indexCurtainDuration } from 'variables';

import { MouseMove } from '../Singletons/MouseMove';
import { lerp } from '../utils/lerp';

export class Circle2D {
  static mouseLerp = 0.25;

  _mouseMove = MouseMove.getInstance();
  _canvas: HTMLCanvasElement;
  _ctx: CanvasRenderingContext2D | null;
  _hoverProgress = 0;
  _hoverProgressTween: Tween<{ progress: number }> | null = null;
  _color = '#ffffff';
  _rendererBounds: Bounds = { height: 10, width: 100 };
  _mouse = {
    x: {
      target: 0,
      current: 0,
    },
    y: {
      target: 0,
      current: 0,
    },
  };
  _radius = 35;
  _extraRadius = 15;

  constructor() {
    this._canvas = document.createElement('canvas');
    this._canvas.className = 'circle-cursor';
    this._ctx = this._canvas.getContext('2d');
    document.body.appendChild(this._canvas);

    this._addListeners();
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

  _animateHover(destination: number) {
    if (this._hoverProgressTween) {
      this._hoverProgressTween.stop();
    }

    this._hoverProgressTween = new TWEEN.Tween({
      progress: this._hoverProgress,
    })
      .to({ progress: destination }, indexCurtainDuration)
      .easing(TWEEN.Easing.Exponential.InOut)
      .onUpdate((obj) => {
        this._hoverProgress = obj.progress;
      });

    this._hoverProgressTween.start();
  }

  _onMouseMove = (e: THREE.Event) => {
    this._mouse.x.target = (e.target as MouseMove).mouse.x;
    this._mouse.y.target = (e.target as MouseMove).mouse.y;
  };

  _addListeners() {
    this._mouseMove.addEventListener('mousemove', this._onMouseMove);
  }

  _removeListeners() {
    this._mouseMove.removeEventListener('mousemove', this._onMouseMove);
  }

  _draw() {
    if (!this._ctx) return;

    this._ctx.beginPath();
    this._ctx.arc(
      this._mouse.x.current,
      this._mouse.y.current,
      this._radius + this._extraRadius * this._hoverProgress,
      0,
      2 * Math.PI,
    );
    this._ctx.fillStyle = 'rgba(255,255,255, 1)';
    this._ctx.fill();
  }

  _clear() {
    if (this._ctx)
      this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
  }

  update(updateInfo: UpdateInfo) {
    this._clear();
    this._draw();

    this._mouse.x.current = lerp(
      this._mouse.x.current,
      this._mouse.x.target,
      Circle2D.mouseLerp * updateInfo.slowDownFactor,
    );

    this._mouse.y.current = lerp(
      this._mouse.y.current,
      this._mouse.y.target,
      Circle2D.mouseLerp * updateInfo.slowDownFactor,
    );
  }

  setRendererBounds(rendererBounds: Bounds) {
    this._rendererBounds = rendererBounds;
    this._setSizes();
  }

  destroy() {
    this._removeListeners();
  }

  zoomIn() {
    this._animateHover(1);
  }

  zoomOut() {
    this._animateHover(0);
  }
}
