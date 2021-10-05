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

  constructor({ pageId, wrapper }: Constructor) {
    super();
    this.pageId = pageId;
    this._wrapper = wrapper;
  }

  _createAnimations() {
    const pageWrapper = Array.from(
      document.querySelectorAll(`.${this._wrapper}`),
    )[0] as HTMLElement;

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
  }

  init() {
    this._createAnimations();
  }

  destroy(destroyPageFn: OnRouteChange['destroyPageFn']) {
    this._animateOut();

    setTimeout(() => {
      destroyPageFn(this.pageId);
    }, 3000);
  }

  onResize() {
    this._anmParagraphs.forEach((el) => {
      el.onResize();
    });
  }
}
