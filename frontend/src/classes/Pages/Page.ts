import * as THREE from 'three';

import { Paragraph } from '../HTMLComponents/Paragraph';

interface Constructor {
  pageId: string;
}

export class Page extends THREE.EventDispatcher {
  static anmParagraph = '[data-animation="paragraph"]';

  pageId: string;
  _anmParagraphs: Paragraph[] = [];

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

  animateIn() {
    this._anmParagraphs.forEach((el) => {
      el.animateIn();
    });
  }

  onEnter(el: HTMLElement) {
    const paragraphs = Array.from(
      el.querySelectorAll(Page.anmParagraph),
    ) as HTMLElement[];

    this._anmParagraphs = paragraphs.map((el) => {
      return new Paragraph({ element: el });
    });
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
