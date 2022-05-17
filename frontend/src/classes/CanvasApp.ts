import TWEEN, { Tween } from '@tweenjs/tween.js';
import * as THREE from 'three';
import debounce from 'lodash/debounce';

import { globalState } from 'utils/globalState';

import { MouseMove } from './Singletons/MouseMove';
import { Scroll } from './Singletons/Scroll';
import { Preloader } from './Utility/Preloader';
import { PageManager } from './Pages/PageManager';
import { InteractiveScene } from './Components/InteractiveScene';
import { Circle2D } from './Components/Circle2D';

export class CanvasApp extends THREE.EventDispatcher {
  static defaultFps = 60;
  static dtFps = 1000 / CanvasApp.defaultFps;

  static _instance: CanvasApp | null;
  static _canCreate = false;
  static getInstance() {
    if (!CanvasApp._instance) {
      CanvasApp._canCreate = true;
      CanvasApp._instance = new CanvasApp();
      CanvasApp._canCreate = false;
    }

    return CanvasApp._instance;
  }

  _rendererWrapperEl: HTMLDivElement | null = null;
  _rafId: number | null = null;
  _isResumed = true;
  _lastFrameTime: number | null = null;
  _canvas: HTMLCanvasElement | null = null;
  _camera: THREE.PerspectiveCamera | null = null;
  _renderer: THREE.WebGLRenderer | null = null;
  _mouseMove = MouseMove.getInstance();
  _scroll = Scroll.getInstance();
  _preloader = new Preloader();
  _pageManager = new PageManager();
  _interactiveScene: InteractiveScene | null = null;
  _opacityTween: Tween<{ progress: number }> | null = null;
  circle2D = new Circle2D();

  constructor() {
    super();

    if (CanvasApp._instance || !CanvasApp._canCreate) {
      throw new Error('Use CanvasApp.getInstance()');
    }

    CanvasApp._instance = this;
  }

  _onResizeDebounced = debounce(() => this._onResize(), 300);

  _onResize() {
    if (!this._rendererWrapperEl || !this._camera || !this._renderer) {
      return;
    }
    const rendererBounds = this._rendererWrapperEl.getBoundingClientRect();
    const aspectRatio = rendererBounds.width / rendererBounds.height;
    this._camera.aspect = aspectRatio;

    //Set to match pixel size of the elements in three with pixel size of DOM elements
    this._camera.position.z = 1000;
    this._camera.fov =
      2 *
      Math.atan(rendererBounds.height / 2 / this._camera.position.z) *
      (180 / Math.PI);

    this._renderer.setSize(rendererBounds.width, rendererBounds.height);
    this._renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this._camera.updateProjectionMatrix();

    this._interactiveScene &&
      this._interactiveScene.setRendererBounds(rendererBounds);
    this._pageManager.setRendererBounds(rendererBounds);

    this.circle2D.setRendererBounds(rendererBounds);
  }

  _onVisibilityChange = () => {
    if (document.hidden) {
      this._stopAppFrame();
    } else {
      this._resumeAppFrame();
    }
  };

  _animateGlobalOpacity() {
    if (this._opacityTween) {
      this._opacityTween.stop();
    }

    this._opacityTween = new TWEEN.Tween({
      progress: globalState.globalOpacity,
    })
      .to({ progress: 1 }, 1300)

      .easing(TWEEN.Easing.Exponential.InOut)
      .onUpdate((obj) => {
        globalState.globalOpacity = obj.progress;
      });

    this._opacityTween.start();
  }

  _onAssetsLoaded = (e: THREE.Event) => {
    globalState.textureItems = (e.target as Preloader).textureItems;
    this._animateGlobalOpacity();

    const pageWrapper = Array.from(
      document.querySelectorAll('.page-wrapper'),
    )[0] as HTMLElement;

    const pageOverlay = Array.from(
      document.querySelectorAll('.page__overlay'),
    )[0] as HTMLElement;

    pageWrapper.classList.add('page-wrapper--active');
    pageOverlay.classList.add('page__overlay--disabled');
    this._pageManager.onAssetsLoaded();
  };

  _addListeners() {
    window.addEventListener('resize', this._onResizeDebounced);
    window.addEventListener('visibilitychange', this._onVisibilityChange);
    this._preloader.addEventListener('loaded', this._onAssetsLoaded);
  }

  _removeListeners() {
    window.removeEventListener('resize', this._onResizeDebounced);
    window.removeEventListener('visibilitychange', this._onVisibilityChange);
    this._preloader.removeEventListener('loaded', this._onAssetsLoaded);
  }

  _resumeAppFrame() {
    this._rafId = window.requestAnimationFrame(this._renderOnFrame);
    this._isResumed = true;
  }

  _renderOnFrame = (time: number) => {
    this._rafId = window.requestAnimationFrame(this._renderOnFrame);

    if (this._isResumed || !this._lastFrameTime) {
      this._lastFrameTime = window.performance.now();
      this._isResumed = false;
      return;
    }

    TWEEN.update(time);

    const delta = time - this._lastFrameTime;
    let slowDownFactor = delta / CanvasApp.dtFps;

    //Rounded slowDown factor to the nearest integer reduces physics lags
    const slowDownFactorRounded = Math.round(slowDownFactor);

    if (slowDownFactorRounded >= 1) {
      slowDownFactor = slowDownFactorRounded;
    }
    this._lastFrameTime = time;

    this._mouseMove.update({ delta, slowDownFactor, time });
    this._scroll.update({ delta, slowDownFactor, time });

    if (!this._interactiveScene || !this._renderer || !this._camera) {
      return;
    }

    this._interactiveScene.update({ delta, slowDownFactor, time });
    this._pageManager.update({ delta, slowDownFactor, time });
    this.circle2D.update({ delta, slowDownFactor, time });
    this._renderer.render(this._interactiveScene, this._camera);
  };

  _stopAppFrame() {
    if (this._rafId) {
      window.cancelAnimationFrame(this._rafId);
    }
  }

  destroy() {
    if (this._canvas && this._canvas.parentNode) {
      this._canvas.parentNode.removeChild(this._canvas);
    }
    this._stopAppFrame();
    this._removeListeners();

    this.circle2D.destroy();

    this._interactiveScene && this._interactiveScene.destroy();
    this._preloader.destroy();
  }

  handlePageEnter(pageEl: HTMLElement) {
    this._pageManager.handlePageEnter(pageEl);
  }

  init() {
    const page = Array.from(
      document.querySelectorAll(`[data-pageid="${globalState.currentPageId}"]`),
    )[0] as HTMLElement;

    this._onResize();
    this.handlePageEnter(page);
    globalState.isCanvasAppInit = true;
  }

  set rendererWrapperEl(el: HTMLDivElement) {
    this._rendererWrapperEl = el;
    this._canvas = document.createElement('canvas');
    this._rendererWrapperEl.appendChild(this._canvas);
    this._camera = new THREE.PerspectiveCamera();

    this._renderer = new THREE.WebGLRenderer({
      canvas: this._canvas,
      antialias: true,
      alpha: true,
    });

    this._interactiveScene = new InteractiveScene({
      camera: this._camera,
    });

    this._pageManager.setInteractiveScene(this._interactiveScene);

    this._addListeners();
    this._resumeAppFrame();
  }

  set imagesToPreload(images: string[]) {
    this._preloader.images = images;
  }
}
