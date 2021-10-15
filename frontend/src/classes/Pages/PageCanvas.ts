import * as THREE from 'three';

import { Bounds, UpdateInfo, ScrollValues } from 'types';

import { InteractiveScene } from '../Components/InteractiveScene';

interface Constructor {}

export class PageCanvas {
  _interactiveScene: InteractiveScene | null = null;
  _pageEl: HTMLElement | null = null;
  _planeGeometry = new THREE.PlaneGeometry(1, 1, 50, 50);
  _rendererBounds: Bounds = { height: 100, width: 100 };
  _scrollValues: ScrollValues | null = null;

  constructor(props: Constructor) {}

  setInteractiveScene(scene: InteractiveScene) {
    this._interactiveScene = scene;
  }

  onEnter(el: HTMLElement) {
    this._pageEl = el;
  }

  onExit() {}

  setRendererBounds(bounds: Bounds) {
    this._rendererBounds = bounds;
  }

  onAssetsLoaded() {}

  update(updateInfo: UpdateInfo) {}

  set scrollValues(values: ScrollValues) {
    this._scrollValues = values;
  }
}
