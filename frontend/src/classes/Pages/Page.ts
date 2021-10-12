import * as THREE from 'three';

import { Bounds, ScrollValues, UpdateInfo } from '../types';
import { Scroll } from '../Singletons/Scroll';
import { Paragraph } from '../HTMLComponents/Paragraph';
import { InteractiveScene } from '../InteractiveScene';
import { lerp } from '../utils/lerp';

interface Constructor {
  pageId: string;
}

export class Page extends THREE.EventDispatcher {
  static lerpEase = 0.08;
  static wheelMultiplier = 1;
  static mouseMultiplier = 2;
  static touchMultiplier = 1;
  static anmParagraph = '[data-animation="paragraph"]';

  pageId: string;
  _anmParagraphs: Paragraph[] = [];
  _interactiveScene: InteractiveScene | null = null;
  _scroll = Scroll.getInstance();
  _pageEl: HTMLElement | null = null;
  _rendererBounds: Bounds = { height: 10, width: 100 };
  _pageElBounds: DOMRect | null = null;

  _scrollValues: ScrollValues = {
    current: { x: 0, y: 0 },
    target: { x: 0, y: 0 },
    last: { x: 0, y: 0 },
    direction: { x: 'left', y: 'up' },
    strength: {
      current: 0,
      target: 0,
    },
    scrollSpeed: { x: 0, y: 0 },
  };

  constructor({ pageId }: Constructor) {
    super();
    this.pageId = pageId;
  }

  _animateOut() {
    this._anmParagraphs.forEach((el) => {
      el.animateOut();
    });

    this._anmParagraphs = [];
  }

  _updateScrollValues(updateInfo: UpdateInfo) {
    this._scrollValues.target.y += this._scrollValues.scrollSpeed.y;

    //Update scroll direction
    if (this._scrollValues.current.x > this._scrollValues.last.x) {
      this._scrollValues.direction.x = 'left';
    } else {
      this._scrollValues.direction.x = 'right';
    }

    if (this._scrollValues.current.y > this._scrollValues.last.y) {
      this._scrollValues.direction.y = 'up';
    } else {
      this._scrollValues.direction.y = 'down';
    }

    //Update scroll strength
    const deltaX = this._scrollValues.current.x - this._scrollValues.last.x;
    const deltaY = this._scrollValues.current.y - this._scrollValues.last.y;

    this._scrollValues.strength.target = Math.sqrt(
      deltaX * deltaX + deltaY * deltaY,
    );

    this._scrollValues.strength.current = lerp(
      this._scrollValues.strength.current,
      this._scrollValues.strength.target,
      Page.lerpEase * updateInfo.slowDownFactor,
    );

    this._scrollValues.last.x = this._scrollValues.current.x;
    this._scrollValues.last.y = this._scrollValues.current.y;

    //lerp scroll
    this._scrollValues.current.x = lerp(
      this._scrollValues.current.x,
      this._scrollValues.target.x,
      Page.lerpEase * updateInfo.slowDownFactor,
    );

    this._scrollValues.current.y = lerp(
      this._scrollValues.current.y,
      this._scrollValues.target.y,
      Page.lerpEase * updateInfo.slowDownFactor,
    );
  }

  _applyScroll = (x: number, y: number) => {
    if (!this._pageElBounds) {
      return;
    }

    this._scrollValues.target.x -= x;
    let newY = this._scrollValues.target.y + y;

    const bottomBound = 0;
    let topBound = this._pageElBounds.height - this._rendererBounds.height;
    if (topBound < 0) topBound = 0;

    if (-newY <= bottomBound) {
      newY = bottomBound;
    } else if (-newY >= topBound) {
      newY = -topBound;
    }

    this._scrollValues.target.y = newY;
  };

  _onScrollMouse = (e: THREE.Event) => {
    this._applyScroll(e.x * Page.mouseMultiplier, e.y * Page.mouseMultiplier);
  };
  _onScrollTouch = (e: THREE.Event) => {
    this._applyScroll(e.x * Page.touchMultiplier, e.y * Page.touchMultiplier);
  };
  _onScrollWheel = (e: THREE.Event) => {
    this._applyScroll(e.x * Page.wheelMultiplier, e.y * Page.wheelMultiplier);
  };

  _addListeners() {
    this._scroll.addEventListener('mouse', this._onScrollMouse);
    this._scroll.addEventListener('touch', this._onScrollTouch);
    this._scroll.addEventListener('wheel', this._onScrollWheel);
  }

  _removeListeners() {
    this._scroll.removeEventListener('mouse', this._onScrollMouse);
    this._scroll.removeEventListener('touch', this._onScrollTouch);
    this._scroll.removeEventListener('wheel', this._onScrollWheel);
  }

  _updateCss() {
    if (this._pageEl) {
      this._pageEl.style.transform = `translate3d(0,${this._scrollValues.current.y}px,0)`;
    }
  }

  animateIn() {
    this._anmParagraphs.forEach((el) => {
      el.initObserver();
    });
  }

  onEnter(el: HTMLElement) {
    this._pageEl = Array.from(el.children)[0] as HTMLElement;
    this._pageElBounds = this._pageEl.getBoundingClientRect();

    const paragraphs = Array.from(
      this._pageEl.querySelectorAll(Page.anmParagraph),
    ) as HTMLElement[];

    this._anmParagraphs = paragraphs.map((el) => {
      return new Paragraph({ element: el });
    });
    this._addListeners();
  }

  onExit() {
    this._animateOut();
    this._removeListeners();
  }

  setInteractiveScene(scene: InteractiveScene) {
    this._interactiveScene = scene;
  }

  setRendererBounds(bounds: Bounds) {
    this._rendererBounds = bounds;

    this._anmParagraphs.forEach((el) => {
      el.onResize();
    });

    if (this._pageEl) this._pageElBounds = this._pageEl.getBoundingClientRect();
  }

  update(updateInfo: UpdateInfo) {
    this._updateScrollValues(updateInfo);
    this._updateCss();
  }
}
