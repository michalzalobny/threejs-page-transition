import React, { useRef, useEffect } from 'react';
import FontFaceObserver from 'fontfaceobserver';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { globalState } from 'utils/globalState';
import { CanvasApp } from 'classes/CanvasApp';

import '../styles/index.scss';

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  const router = useRouter();

  const rendererWrapperEl = useRef(null);

  useEffect(() => {
    if (!rendererWrapperEl.current) return;

    if (rendererWrapperEl.current) {
      const el = document.querySelectorAll('.page')[0] as HTMLElement;
      const pageId = el.dataset.page;
      if (pageId) globalState.currentPageId = pageId;

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

  const onPageExit = (el: HTMLElement) => {
    if (globalState.canvasApp) globalState.canvasApp.handlePageExit(el);
  };

  useEffect(() => {
    const fontA = new FontFaceObserver('Suisse');
    const fontB = new FontFaceObserver('Open Sans');

    Promise.all([fontA.load(), fontB.load()]).then(() => {
      if (globalState.canvasApp) globalState.canvasApp.init();
    });
  }, []);

  return (
    <>
      <div className="canvas__wrapper" ref={rendererWrapperEl}></div>
      <TransitionGroup>
        <CSSTransition
          key={router.pathname}
          timeout={1000}
          classNames="page-transition"
          unmountOnExit
          onEnter={onPageEnter}
          onExit={onPageExit}
        >
          <div data-page={router.pathname} className="page">
            <Component key={router.pathname} router={router} {...pageProps} />
          </div>
        </CSSTransition>
      </TransitionGroup>
    </>
  );
}
