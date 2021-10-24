import * as THREE from 'three';
import Prefix from 'prefix';

import { Bounds, ScrollValues, UpdateInfo } from 'types';
import { globalState } from 'utils/globalState';

import { Scroll } from '../Singletons/Scroll';
import { Paragraph } from '../HTMLComponents/Paragraph';
import { InteractiveScene } from '../Components/InteractiveScene';
import { lerp } from '../utils/lerp';
import { BottomHide } from '../HTMLComponents/BottomHide';

interface Constructor {
  pageId: string;
}

export class Page extends THREE.EventDispatcher {
  static lerpEase = 0.08;
  static wheelMultiplier = 1;
  static mouseMultiplier = 2;
  static touchMultiplier = 1;
  static anmParagraph = '[data-animation="paragraph"]';
  static anmBottomHide = '[data-animation="bottomhide"]';
  static scrollContainer = '[data-scroll="page"]';
  static pageContainer = '[data-page="wrapper"]';

  pageId: string;
  _anmParagraphs: Paragraph[] = [];
  _anmBottomHide: BottomHide[] = [];
  _scroll = Scroll.getInstance();
  _pageEl: HTMLElement | null = null;
  _rendererBounds: Bounds = { height: 10, width: 100 };
  _pageElScroll: HTMLElement | null = null;
  _pageElScrollBounds: DOMRect | null = null;
  _transformPrefix = Prefix('transform');
  _scrollValues: ScrollValues = {
    scroll: {
      current: 0,
      target: 0,
      last: 0,
    },
    direction: 'down',
    strength: {
      current: 0,
      target: 0,
    },
  };

  constructor({ pageId }: Constructor) {
    super();
    this.pageId = pageId;
  }

  _resetScrollValues() {
    this._scrollValues.direction = 'down';

    this._scrollValues.scroll.current = 0;
    this._scrollValues.scroll.target = 0;
    this._scrollValues.scroll.last = 0;

    this._scrollValues.strength.current = 0;
    this._scrollValues.strength.target = 0;
  }

  _animateOut() {
    this._anmParagraphs.forEach((el) => {
      el.animateOut();
    });

    this._anmParagraphs = [];

    this._anmBottomHide.forEach((el) => {
      el.animateOut();
    });

    this._anmBottomHide = [];
  }

  _updateScrollValues(updateInfo: UpdateInfo) {
    //Update scroll direction
    if (this._scrollValues.scroll.current > this._scrollValues.scroll.last) {
      this._scrollValues.direction = 'up';
    } else {
      this._scrollValues.direction = 'down';
    }

    //Update scroll strength
    const deltaY =
      this._scrollValues.scroll.current - this._scrollValues.scroll.last;

    this._scrollValues.strength.target = deltaY;

    this._scrollValues.strength.current = lerp(
      this._scrollValues.strength.current,
      this._scrollValues.strength.target,
      Page.lerpEase * updateInfo.slowDownFactor,
    );

    this._scrollValues.scroll.last = this._scrollValues.scroll.current;

    //lerp scroll
    this._scrollValues.scroll.current = lerp(
      this._scrollValues.scroll.current,
      this._scrollValues.scroll.target,
      Page.lerpEase * updateInfo.slowDownFactor,
    );
  }

  _applyScroll = (x: number, y: number) => {
    if (!this._pageElScrollBounds || globalState.isAppTransitioning) return;

    let newY = this._scrollValues.scroll.target + y;

    const bottomBound = 0;
    let topBound =
      this._pageElScrollBounds.height - this._rendererBounds.height;
    if (topBound < 0) topBound = 0;

    if (-newY <= bottomBound) {
      newY = bottomBound;
    } else if (-newY >= topBound) {
      newY = -topBound;
    }

    this._scrollValues.scroll.target = newY;
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
    if (this._pageElScroll) {
      this._pageElScroll.style[
        this._transformPrefix
      ] = `translate3d(0,${this._scrollValues.scroll.current}px,0)`;
    }
  }

  animateIn() {
    this._anmParagraphs.forEach((el) => {
      el.initObserver();
    });

    this._anmBottomHide.forEach((el) => {
      el.animateIn();
    });
  }

  onEnter(el: HTMLElement) {
    this._pageEl = Array.from(
      el.querySelectorAll(Page.pageContainer),
    )[0] as HTMLElement;

    this._pageElScroll = Array.from(
      el.querySelectorAll(Page.scrollContainer),
    )[0] as HTMLElement;

    this._pageElScrollBounds = this._pageElScroll.getBoundingClientRect();

    const paragraphs = Array.from(
      this._pageEl.querySelectorAll(Page.anmParagraph),
    ) as HTMLElement[];

    this._anmParagraphs = paragraphs.map((el) => {
      return new Paragraph({ element: el });
    });

    const bottomHides = Array.from(
      this._pageEl.querySelectorAll(Page.anmBottomHide),
    ) as HTMLElement[];

    this._anmBottomHide = bottomHides.map((el) => {
      return new BottomHide({ element: el });
    });

    this._addListeners();
  }

  onExit() {
    this._animateOut();
    this._removeListeners();
  }

  setInteractiveScene(scene: InteractiveScene) {}

  onAssetsLoaded() {}

  setRendererBounds(bounds: Bounds) {
    this._rendererBounds = bounds;

    this._anmParagraphs.forEach((el) => {
      el.onResize();
    });

    if (this._pageElScroll)
      this._pageElScrollBounds = this._pageElScroll.getBoundingClientRect();
  }

  update(updateInfo: UpdateInfo) {
    this._updateScrollValues(updateInfo);
    this._updateCss();
  }
}
