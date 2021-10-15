import * as THREE from 'three';

import { Bounds, UpdateInfo } from 'types';
import { globalState } from 'utils/globalState';

import { Transition } from '../Components/Transition';
import { DetailsPage } from './DetailsPage/DetailsPage';
import { IndexPage } from './IndexPage/IndexPage';
import { Page } from './Page';
import { InteractiveScene } from '../Components/InteractiveScene';

export class PageManager extends THREE.EventDispatcher {
  _pagesArray: Page[] = [];
  _transition: Transition;

  constructor() {
    super();

    this._pagesArray.push(new IndexPage({ pageId: '/' }));
    this._pagesArray.push(new DetailsPage({ pageId: '/details' }));
    this._transition = new Transition();
  }

  handlePageEnter(pageEl: HTMLElement, skipTransition: boolean) {
    const pageId = pageEl.dataset.pageid;
    if (pageId) globalState.currentPageId = pageId;
    const page = this._pagesArray.find((page) => page.pageId === pageId);

    if (page) page.onEnter(pageEl);

    const parentFn = () => {
      if (page) page.animateIn();
    };

    if (skipTransition) {
      // Raf fixes css styles issue (without Raf, they are being added at the same time as a class, and it removes the initial animation)
      window.requestAnimationFrame(() => {
        parentFn();
      });

      return;
    }

    this._transition.show('#ded4bd', parentFn);
  }

  handlePageExit(pageEl: HTMLElement) {
    const pageId = pageEl.dataset.pageid;
    const page = this._pagesArray.find((page) => page.pageId === pageId);

    if (page) page.onExit();
  }

  setRendererBounds(rendererBounds: Bounds) {
    this._pagesArray.forEach((page) => {
      page.setRendererBounds(rendererBounds);
    });

    this._transition.setRendererBounds(rendererBounds);
  }

  setInteractiveScene(scene: InteractiveScene) {
    this._pagesArray.forEach((page) => {
      page.setInteractiveScene(scene);
    });
  }

  onAssetsLoaded() {
    this._pagesArray.forEach((page) => {
      page.onAssetsLoaded();
    });
  }

  update(updateInfo: UpdateInfo) {
    this._pagesArray.forEach((page) => {
      page.update(updateInfo);
    });
  }
}
