import * as THREE from 'three';

import { DetailsPage } from './DetailsPage';
import { IndexPage } from './IndexPage';
import { Page } from './Page';
import { OnRouteChange } from '../types';

export class PageManager extends THREE.EventDispatcher {
  _pagesArray: Page[] = [];

  constructor() {
    super();

    this._pagesArray.push(
      new IndexPage({ pageId: '/', wrapper: 'index__wrapper' }),
    );

    this._pagesArray.push(
      new DetailsPage({
        pageId: '/details',
        wrapper: 'details__wrapper',
      }),
    );
  }

  onRouteChange(props: OnRouteChange) {
    const { destroyPageFn, enterPageId, triggeredOnRouteChangeStart } = props;

    if (triggeredOnRouteChangeStart) {
      const leavingPage = this._pagesArray.find(
        (page) => page.isTransitioningOut === true,
      );

      if (leavingPage?.pageId !== enterPageId) {
        return;
      } else {
        // console.log('during trans');
      }
    }

    console.log('onRouteCHange');

    const activePage = this._pagesArray.find((el) => el.pageId === enterPageId);
    activePage?.init();

    this._pagesArray.forEach((page) => {
      if (page !== activePage) {
        page.destroy(destroyPageFn);
      }
    });
  }

  onResize() {
    this._pagesArray.forEach((page) => {
      page.onResize();
    });
  }
}
