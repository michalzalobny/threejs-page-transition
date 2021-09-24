import React, { useRef, useEffect } from "react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

import { useWarningOnExit } from "hooks/useWarningOnExit";

import { App } from "../classes/App";
import styles from "../styles/app.module.scss";
import "../styles/index.scss";

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  const router = useRouter();

  useWarningOnExit(true);

  const rendererWrapperEl = useRef(null);
  const myApp = useRef<App | null>(null);

  useEffect(() => {
    if (!rendererWrapperEl.current) return;

    if (rendererWrapperEl.current) {
      myApp.current = App.getInstance();
      myApp.current.rendererWrapperEl = rendererWrapperEl.current;
    }

    return () => {
      if (myApp.current) myApp.current.destroy();
    };
  }, []);

  return (
    <>
      <div className={styles.canvasWrapper} ref={rendererWrapperEl}></div>
      <Component router={router} {...pageProps} />
    </>
  );
}
