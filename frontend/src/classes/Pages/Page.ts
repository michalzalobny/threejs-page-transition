import * as THREE from 'three';

import { Paragraph } from '../HTMLComponents/Paragraph';

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

  onEnter(el: HTMLElement) {
    const paragraphs = Array.from(
      el.querySelectorAll(Page.anmParagraph),
    ) as HTMLElement[];

    this._anmParagraphs = paragraphs.map((el) => {
      return new Paragraph({ element: el });
    });

    this._animateIn();
  }

  onExit() {
    this._animateOut();
  }

  onResize() {
    this._anmParagraphs.forEach((el) => {
      el.onResize();
    });
  }
}
