//https://github.com/vercel/next.js/issues/2476#issuecomment-843311387

import { useEffect } from "react";

import { globalState } from "utils/globalState";

import Router from "next/router";

export const useWarningOnExit = (shouldWarn: boolean, warningText?: string) => {
  const message = warningText || "Are you sure that you want to leave?";

  useEffect(() => {
    let isWarned = false;

    const routeChangeStart = (url: string) => {
      if (Router.asPath !== url && shouldWarn && !isWarned) {
        // isWarned = true;
        if (globalState.isTransitioning) {
          globalState.isTransitioning = false;
          // console.log("e?");
          // Router.push(url);
        } else {
          setTimeout(() => {
            globalState.isTransitioning = true;
            Router.push(url);
          }, 2000);
          console.log("we?");
          // isWarned = false;
          // Router.events.emit("routeChangeError");
          // Router.replace(Router, Router.asPath, { shallow: true });
          // eslint-disable-next-line no-throw-literal
          throw "Abort route change. Please ignore this error.";
        }
      }
    };

    // const beforeUnload = (e: BeforeUnloadEvent) => {
    //   if (shouldWarn && !isWarned) {
    //     const event = e || window.event;
    //     event.returnValue = message;
    //     return message;
    //   }
    //   return null;
    // };

    Router.events.on("routeChangeStart", routeChangeStart);

    // window.addEventListener("beforeunload", beforeUnload);

    // Router.beforePopState(({ url }) => {
    //   if (Router.asPath !== url && shouldWarn && !isWarned) {
    //     // isWarned = true;
    //     if (url === "/s") {
    //       console.log("em?");
    //       return true;
    //     } else {
    //       // isWarned = false;
    //       window.history.pushState(null, "", url);
    //       Router.replace(Router, Router.asPath, { shallow: true });
    //       return false;
    //     }
    //   }
    //   return true;
    // });

    return () => {
      // Router.events.off("routeChangeStart", routeChangeStart);
      // window.removeEventListener("beforeunload", beforeUnload);
      // Router.beforePopState(() => {
      //   return true;
      // });
    };
  }, [message, shouldWarn]);
};
