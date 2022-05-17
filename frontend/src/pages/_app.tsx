import React, { useRef, useEffect } from 'react';
import FontFaceObserver from 'fontfaceobserver';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import 'intersection-observer';

import { Layout } from 'components/Layout/Layout';
import { globalState } from 'utils/globalState';
import { CanvasApp } from 'classes/CanvasApp';
import { pageTransitionDuration } from 'variables';

import '../styles/index.scss';

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  const router = useRouter();

  useEffect(() => {
    //Used just to navigate in canvasApp
    globalState.router = router;
  }, [router]);

  const initTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rendererWrapperEl = useRef(null);

  useEffect(() => {
    if (!rendererWrapperEl.current) return;

    if (rendererWrapperEl.current) {
      const el = document.querySelectorAll('.page')[0] as HTMLElement;
      const pageId = el.dataset.pageid;
      const queryId = el.dataset.queryid;
      if (pageId) globalState.currentPageId = pageId;
      if (queryId) globalState.currentQueryId = queryId;

      globalState.canvasApp = CanvasApp.getInstance();
      globalState.canvasApp.rendererWrapperEl = rendererWrapperEl.current;
    }

    return () => {
      if (globalState.canvasApp) globalState.canvasApp.destroy();
    };
  }, []);

  const onPageEnter = (el: HTMLElement) => {
    if (globalState.canvasApp) globalState.canvasApp.handlePageEnter(el);
  };

  useEffect(() => {
    const fontA = new FontFaceObserver('nexa');
    const fontB = new FontFaceObserver('voyage');
    const fontC = new FontFaceObserver('opensans');

    Promise.all([fontA.load(null, 2000), fontB.load(), fontC.load()])
      .then(
        () => {
          if (globalState.canvasApp) globalState.canvasApp.init();
        },
        () => {
          console.warn('Fonts were loading too long (over 2000ms)');
        },
      )
      .catch((err) => {
        console.warn('Some critical font are not available:', err);
      });

    initTimeout.current = setTimeout(() => {
      if (globalState.canvasApp && !globalState.isCanvasAppInit)
        globalState.canvasApp.init();
    }, 2000);

    return () => {
      if (initTimeout.current) clearTimeout(initTimeout.current);
    };
  }, []);

  return (
    <>
      <Layout />
      <div className="canvas__wrapper" ref={rendererWrapperEl} />
      <div className="page__background" />
      <div className="page__overlay" />
      <div className="page-wrapper">
        <TransitionGroup>
          <CSSTransition
            key={router.pathname}
            timeout={pageTransitionDuration}
            classNames="page-transition"
            unmountOnExit
            onEnter={onPageEnter}
          >
            <div
              data-queryid={router.query.id || ''}
              data-pageid={router.pathname}
              className="page"
            >
              <Component key={router.pathname} router={router} {...pageProps} />
            </div>
          </CSSTransition>
        </TransitionGroup>
      </div>
    </>
  );
}
