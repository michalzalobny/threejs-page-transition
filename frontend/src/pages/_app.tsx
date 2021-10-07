import React, { useRef, useEffect } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import { globalState } from 'utils/globalState';
import { CanvasApp } from 'classes/CanvasApp';
import { PageWrapper } from 'components/PageWrapper';

import '../styles/index.scss';

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  const router = useRouter();

  const rendererWrapperEl = useRef(null);

  useEffect(() => {
    if (!rendererWrapperEl.current) return;

    if (rendererWrapperEl.current) {
      globalState.canvasApp = CanvasApp.getInstance();
      globalState.canvasApp.rendererWrapperEl = rendererWrapperEl.current;
    }

    return () => {
      if (globalState.canvasApp) globalState.canvasApp.destroy();
    };
  }, []);

  return (
    <>
      <div className="canvas__wrapper" ref={rendererWrapperEl}></div>
      {/* <PageWrapper> */}
      <Component key={router.pathname} router={router} {...pageProps} />
      {/* </PageWrapper> */}
    </>
  );
}
