import * as THREE from 'three';

import { Transition } from '../Components/Transition';
import { DetailsPage } from './DetailsPage';
import { IndexPage } from './IndexPage';
import { Page } from './Page';

export class PageManager extends THREE.EventDispatcher {
  _pagesArray: Page[] = [];
  _transition: Transition;
  _isInit = false;

  constructor() {
    super();

    this._pagesArray.push(new IndexPage({ pageId: '/' }));
    this._pagesArray.push(new DetailsPage({ pageId: '/details' }));
    this._transition = new Transition();
  }

  handlePageEnter(pageEl: HTMLElement) {
    const pageId = pageEl.dataset.page;
    const page = this._pagesArray.find((page) => page.pageId === pageId);

    if (page) page.onEnter(pageEl);

    const parentFn = () => {
      if (page) page.animateIn();
    };

    if (!this._isInit) {
      this._isInit = true;

      // Raf fixes css styles issue (without Raf, they are being added at the same time as a class, and it removes the initial animation)
      window.requestAnimationFrame(() => {
        parentFn();
      });

      return;
    }

    this._transition.show('#ded4bd', parentFn);
  }

  handlePageExit(pageEl: HTMLElement) {
    const pageId = pageEl.dataset.page;
    const page = this._pagesArray.find((page) => page.pageId === pageId);

    if (page) page.onExit();
  }

  onResize() {
    this._pagesArray.forEach((page) => {
      page.onResize();
    });
  }
}
