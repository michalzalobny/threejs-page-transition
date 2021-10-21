import * as THREE from 'three';
import TWEEN, { Tween } from '@tweenjs/tween.js';

import {
  UpdateInfo,
  ScrollValues,
  DomRectSSR,
  AnimateProps,
  AnimateScale,
} from 'types';
import { pageTransitionDuration } from 'variables';

import { MediaObject3D } from './MediaObject3D';

interface Constructor {
  geometry: THREE.PlaneGeometry;
  domEl: HTMLElement;
}

export class Image3D extends MediaObject3D {
  elId: string;
  _domEl: HTMLElement;
  _domElBounds: DomRectSSR = {
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
    x: 0,
    y: 0,
  };
  _extraScaleTranslate = { y: 0 };
  _transitionElBounds = {
    left: 0,
    top: 0,
    height: 0,
  };
  _scrollValues: ScrollValues | null = null;
  _opacityTween: Tween<{ progress: number }> | null = null;
  _transitionTween: Tween<{ progress: number }> | null = null;
  _transitionProgress = 0;
  _scaleTween: Tween<{
    x: number;
    y: number;
  }> | null = null;

  constructor({ geometry, domEl }: Constructor) {
    super({ geometry });

    this._domEl = domEl;
    this.setColliderName('image3D');
    this.elId = this._domEl.dataset.curtainUid as string;
  }

  _updateBounds() {
    const rect = this._domEl.getBoundingClientRect();

    this._domElBounds.bottom = rect.bottom;
    this._domElBounds.height = rect.height;
    this._domElBounds.left = rect.left;
    this._domElBounds.right = rect.right;
    this._domElBounds.top = rect.top;
    this._domElBounds.width = rect.width;
    this._domElBounds.x = rect.x;
    this._domElBounds.y = rect.y;

    if (this._scrollValues)
      this._domElBounds.top -= this._scrollValues.scroll.current;

    this._updateScale();

    if (this._mesh) {
      this._mesh.material.uniforms.uPlaneSizes.value = [
        this._mesh.scale.x,
        this._mesh.scale.y,
      ];
    }
  }

  _updateScale() {
    if (this._mesh) {
      this._mesh.scale.x = this._domElBounds.width;
      this._mesh.scale.y = this._domElBounds.height;
    }
  }

  _updateX(x: number) {
    if (this._mesh) {
      this._mesh.position.x =
        -x * (1 - this._transitionProgress) +
        this._transitionElBounds.left * this._transitionProgress +
        this._domElBounds.left * (1 - this._transitionProgress) -
        this._rendererBounds.width / 2 +
        this._mesh.scale.x / 2;
    }
  }

  _updateY(y: number) {
    if (this._mesh) {
      this._mesh.position.y =
        -y * (1 - this._transitionProgress) -
        this._domElBounds.top * (1 - this._transitionProgress) -
        this._extraScaleTranslate.y * this._transitionProgress -
        this._transitionElBounds.top * this._transitionProgress +
        this._rendererBounds.height / 2 -
        this._mesh.scale.y / 2;
    }
  }

  setScrollValues(scrollValues: ScrollValues) {
    this._scrollValues = scrollValues;
  }

  animateTransition({
    destination,
    duration,
    delay = 0,
    easing = TWEEN.Easing.Exponential.InOut,
  }: AnimateProps) {
    if (this._transitionTween) {
      this._transitionTween.stop();
    }

    this._transitionTween = new TWEEN.Tween({
      progress: this._transitionProgress,
    })
      .to({ progress: destination }, duration)
      .delay(delay)
      .easing(easing)
      .onUpdate((obj) => {
        this._transitionProgress = obj.progress;
      });

    this._transitionTween.start();
  }

  animateOpacity({
    destination,
    duration,
    delay = 0,
    easing = TWEEN.Easing.Linear.None,
  }: AnimateProps) {
    if (this._opacityTween) {
      this._opacityTween.stop();
    }

    this._opacityTween = new TWEEN.Tween({ progress: this._tweenOpacity })
      .to({ progress: destination }, duration)
      .delay(delay)
      .easing(easing)
      .onUpdate((obj) => {
        this._tweenOpacity = obj.progress;
      });

    this._opacityTween.start();
  }

  animateIn() {
    this.animateOpacity({ destination: 1, delay: 0, duration: 0 });
  }

  _animateScale({
    xScale,
    yScale,
    parentFn,
    duration = pageTransitionDuration,
  }: AnimateScale) {
    if (this._scaleTween) {
      this._scaleTween.stop();
    }

    if (!this._mesh) return;

    this._scaleTween = new TWEEN.Tween({
      x: this._mesh.scale.x,
      y: this._mesh.scale.y,
    })
      .to({ x: xScale, y: yScale }, duration)
      .easing(TWEEN.Easing.Exponential.InOut)
      .onUpdate((obj) => {
        if (this._mesh) {
          this._extraScaleTranslate.y =
            (this._transitionElBounds.height - obj.y) / 2;

          this._mesh.scale.x = obj.x;
          this._mesh.scale.y = obj.y;

          this._mesh.material.uniforms.uPlaneSizes.value = [
            this._mesh.scale.x,
            this._mesh.scale.y,
          ];
        }
      })
      .onComplete(() => {
        parentFn && parentFn();
      });

    this._scaleTween.start();
  }

  onExitToIndex(parentFn: () => void) {
    const transitionEl = Array.from(
      document.querySelectorAll(`[data-transition="${this.elId}"]`),
    )[0] as HTMLElement;

    // Raf fixes css styles issue
    window.requestAnimationFrame(() => {
      const bounds = transitionEl.getBoundingClientRect();
      this._transitionElBounds.top = bounds.top;
      this._transitionElBounds.left = bounds.left;
      this._transitionElBounds.height = bounds.height;

      this._animateScale({ xScale: bounds.width, yScale: 0, parentFn });

      this.animateTransition({
        destination: 1,
        duration: pageTransitionDuration,
      });
    });
  }

  onResize() {
    super.onResize();

    // Raf fixes css styles issue
    window.requestAnimationFrame(() => {
      this._updateBounds();
    });
  }

  update(updateInfo: UpdateInfo) {
    super.update(updateInfo);
    if (this._scrollValues) this._updateY(this._scrollValues.scroll.current);
    this._updateX(0);

    if (this._mesh && this._scrollValues) {
      this._mesh.material.uniforms.uStrength.value =
        this._scrollValues.strength.current * 0.7 + 8;
    }
  }

  destroy() {
    super.destroy();
    this._transitionTween && this._transitionTween.stop();
    this._opacityTween && this._opacityTween.stop();
    this._scaleTween && this._scaleTween.stop();
  }
}
