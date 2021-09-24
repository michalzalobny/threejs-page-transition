//https://github.com/vercel/next.js/issues/2476#issuecomment-843311387

import { useEffect, useRef } from "react";

import { globalState } from "utils/globalState";

import Router from "next/router";

export const useDelayedRouteExit = () => {
  const _timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const routeChangeStart = (url: string) => {
      if (Router.asPath !== url) {
        if (!globalState.isTransitioned && !globalState.isTransitioning) {
          if (_timeoutId.current) clearTimeout(_timeoutId.current);
          globalState.isTransitioned = true;
        } else {
          if (!globalState.isTransitioning) {
            globalState.isTransitioning = true;
            globalState.isTransitioned = false;

            _timeoutId.current = setTimeout(() => {
              globalState.isTransitioning = false;
              Router.push(url);
            }, 2000);
          }
          throw "Abort route change. Please ignore this error.";
        }
      }
    };

    Router.events.on("routeChangeStart", routeChangeStart);

    return () => {
      Router.events.off("routeChangeStart", routeChangeStart);

      if (_timeoutId.current) clearTimeout(_timeoutId.current);
    };
  }, []);
};
