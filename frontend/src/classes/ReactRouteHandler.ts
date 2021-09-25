//https://github.com/vercel/next.js/issues/2476#issuecomment-843311387

import * as THREE from "three";
import Router from "next/router";

import { globalState } from "utils/globalState";

export class ReactRouterHandler extends THREE.EventDispatcher {
  static _instance: ReactRouterHandler | null;
  static _canCreate = false;
  static getInstance() {
    if (!ReactRouterHandler._instance) {
      ReactRouterHandler._canCreate = true;
      ReactRouterHandler._instance = new ReactRouterHandler();
      ReactRouterHandler._canCreate = false;
    }

    return ReactRouterHandler._instance;
  }

  _timeoutId: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    super();
    if (ReactRouterHandler._instance || !ReactRouterHandler._canCreate) {
      throw new Error("Use ReactRouterHandler.getInstance()");
    }

    ReactRouterHandler._instance = this;
  }

  _routeChangeStart = (url: string) => {
    if (Router.asPath !== url) {
      if (!globalState.isTransitioned && !globalState.isTransitioning) {
        if (this._timeoutId) clearTimeout(this._timeoutId);
        globalState.isTransitioned = true;
      } else {
        if (!globalState.isTransitioning) {
          globalState.isTransitioning = true;
          globalState.isTransitioned = false;

          this._timeoutId = setTimeout(() => {
            globalState.isTransitioning = false;
            Router.push(url);
          }, 2000);
        }
        throw "Abort route change. Please ignore this error.";
      }
    }
  };

  init() {
    Router.events.on("routeChangeStart", this._routeChangeStart);
  }

  destroy() {
    Router.events.off("routeChangeStart", this._routeChangeStart);
    if (this._timeoutId) clearTimeout(this._timeoutId);
  }
}

//In _app.js

// useEffect(() => {
//   globalState.reactRouterHandler = ReactRouterHandler.getInstance();
//   globalState.reactRouterHandler.init();

//   return () => {
//     if (globalState.reactRouterHandler)
//       globalState.reactRouterHandler.destroy();
//   };
// }, []);
