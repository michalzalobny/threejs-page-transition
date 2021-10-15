import * as THREE from 'three';
import TWEEN, { Tween } from '@tweenjs/tween.js';

import { UpdateInfo, ScrollValues, DomRectSSR } from 'types';

import { MediaObject3D } from './MediaObject3D';

interface Constructor {
  geometry: THREE.PlaneGeometry;
  domEl: HTMLElement;
}

interface AnimateOpacity {
  duration: number;
  delay: number;
  destination: number;
  easing?: (amount: number) => number;
}

export class Image3D extends MediaObject3D {
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
  _scrollValues: ScrollValues | null = null;
  _animateInTween: Tween<{
    x: number;
    y: number;
  }> | null = null;
  _opacityTween: Tween<{ progress: number }> | null = null;

  constructor({ geometry, domEl }: Constructor) {
    super({ geometry });

    this._domEl = domEl;

    this.setColliderName('image3D');
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
    if (this._mesh && this._domElBounds) {
      this._mesh.scale.x = this._domElBounds.width;
      this._mesh.scale.y = this._domElBounds.height;
    }
  }

  _updateX(x: number) {
    if (this._mesh && this._domElBounds) {
      this._mesh.position.x =
        -x +
        this._domElBounds.left -
        this._rendererBounds.width / 2 +
        this._mesh.scale.x / 2;
    }
  }

  _updateY(y: number) {
    if (this._mesh && this._domElBounds) {
      this._mesh.position.y =
        -y -
        this._domElBounds.top +
        this._rendererBounds.height / 2 -
        this._mesh.scale.y / 2;
    }
  }

  setScrollValues(scrollValues: ScrollValues) {
    this._scrollValues = scrollValues;
  }

  animateOpacity({
    destination,
    duration,
    delay,
    easing = TWEEN.Easing.Linear.None,
  }: AnimateOpacity) {
    if (this._opacityTween) {
      this._opacityTween.stop();
    }

    this._opacityTween = new TWEEN.Tween({ progress: this._tweenOpacity })
      .to({ progress: destination }, duration)
      .delay(delay)
      .easing(easing)
      .onUpdate((obj) => {
        if (!this._mesh) {
          return;
        }

        this._tweenOpacity = obj.progress;
      });

    this._opacityTween.start();
  }

  animateIn(delay: number) {
    this.animateOpacity({ destination: 1, delay: 0, duration: 600 });
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
}
