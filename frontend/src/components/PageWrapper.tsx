import React, { useState, useCallback, useEffect } from 'react';

import { globalState } from 'utils/globalState';

export interface Props {
  children: React.ReactElement;
}

export const PageWrapper = (props: Props) => {
  const { children } = props;

  const [pagesArray, setPagesArray] = useState<Props['children'][]>([]);

  const destroyLeavingChildren = useCallback(
    (pageKey: string) => {
      const filteredArray = pagesArray.filter((item) => item?.key !== pageKey);
      setPagesArray(filteredArray);
      globalState.isPageTrackerActive = false;
    },
    [pagesArray],
  );

  useEffect(() => {
    const pageItem = pagesArray.find((item) => item?.key === children?.key);

    if (!pageItem) {
      setPagesArray((prev) => [...prev, children]);
      globalState.isPageTrackerActive = true;
    }
  }, [children.key]);

  useEffect(() => {
    if (
      globalState.canvasApp &&
      children?.key?.toString() &&
      globalState.isPageTrackerActive &&
      pagesArray.length > 1
    ) {
      if (!globalState.isCanvasAppInit) {
        globalState.isCanvasAppInit = true;
        globalState.canvasApp.init();
      }

      const enterRouteKey = pagesArray[pagesArray.length - 1].key;
      let enterRouteKeyString;
      if (enterRouteKey) enterRouteKeyString = enterRouteKey.toString();
      if (!enterRouteKeyString) return;

      globalState.canvasApp.onRouteChange({
        destroyPageFn: (routeKey) => destroyLeavingChildren(routeKey),
        enterPageId: enterRouteKeyString,
      });
    }
  }, [pagesArray]);

  return (
    <>
      {pagesArray.map((item) => {
        return item;
      })}
    </>
  );
};
