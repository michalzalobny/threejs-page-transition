import React, { useState, useCallback, useEffect } from "react";

import { globalState } from "utils/globalState";

export interface Props {
  children: React.ReactElement<any, any> | null;
}

export const PageWrapper = (props: Props) => {
  const { children } = props;

  const [pagesArray, setPagesArray] = useState<Props["children"][]>([]);

  const destroyLeavingChildren = useCallback(
    (pageKey: string) => {
      console.log(pagesArray);
      // const filteredArray = pagesArray.filter((item) => item?.key !== pageKey);
      // console.log(filteredArray);
      // setPagesArray(filteredArray);
    },
    [pagesArray]
  );

  useEffect(() => {
    const pageItem = pagesArray.find((item) => item?.key === children?.key);

    if (!pageItem) {
      setPagesArray((prev) => [...prev, children]);
    }
  }, [children?.key]);

  useEffect(() => {
    if (globalState.app && children?.key?.toString()) {
      globalState.app.onRouteChange(
        children.key.toString(),
        (pageKey: string) => destroyLeavingChildren(pageKey)
      );
    }
  }, [pagesArray]);

  return (
    <>
      {pagesArray.map((item, key) => {
        return item;
      })}
    </>
  );
};
