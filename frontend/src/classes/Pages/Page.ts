import * as THREE from 'three';

import { Paragraph } from '../HTMLComponents/Paragraph';
import { OnRouteChange } from '../types';

interface Constructor {
  wrapper: string;
  pageId: string;
}

export class Page extends THREE.EventDispatcher {
  static anmButton = '[data-animation="button"]';
  static anmParagraph = '[data-animation="paragraph"]';

  pageId: string;
  _wrapper: string;
  _anmParagraphs: Paragraph[] = [];
  _isInit = false;
  _destroyTimeout: ReturnType<typeof setTimeout> | null = null;
  isTransitioningOut = false;

  constructor({ pageId, wrapper }: Constructor) {
    super();
    this.pageId = pageId;
    this._wrapper = wrapper;
  }

  _createAnimations() {
    const pageWrapper = Array.from(
      document.querySelectorAll(`.${this._wrapper}`),
    )[0] as HTMLElement;

    if (!pageWrapper) {
      return;
    }

    const paragraphs = Array.from(
      pageWrapper.querySelectorAll(Page.anmParagraph),
    ) as HTMLElement[];

    this._anmParagraphs = paragraphs.map((el) => {
      return new Paragraph({ element: el });
    });

    this._animateIn();
  }

  _animateIn() {
    this._anmParagraphs.forEach((el) => {
      el.animateIn();
    });
  }
  _animateOut() {
    this._anmParagraphs.forEach((el) => {
      el.animateOut();
    });

    this._anmParagraphs = [];
  }

  init() {
    this._createAnimations();
    this._isInit = true;

    if (this._destroyTimeout) {
      // console.log('init pageId', this.pageId);
      clearTimeout(this._destroyTimeout);
      this.isTransitioningOut = false;
    }
  }

  destroy(destroyPageFn: OnRouteChange['destroyPageFn']) {
    this._animateOut();

    if (this._isInit) this.isTransitioningOut = true;

    this._destroyTimeout = setTimeout(() => {
      if (this._isInit) {
        console.log('destroyed', this.pageId);
        destroyPageFn(this.pageId);
        this._isInit = false;
        this.isTransitioningOut = false;
      }
    }, 2000);
  }

  onResize() {
    this._anmParagraphs.forEach((el) => {
      el.onResize();
    });
  }
}
