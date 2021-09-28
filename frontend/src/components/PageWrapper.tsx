import React from "react";

import { globalState } from "utils/globalState";

export interface PageWrapperProps {
  children: React.ReactElement<any, any> | null;
}

export const PageWrapper = (props: PageWrapperProps) => {
  const { children } = props;

  const [leavingChildren, setLeavingChildren] =
    React.useState<PageWrapperProps["children"]>(null);

  const [enterChildren, setEnterChildren] =
    React.useState<PageWrapperProps["children"]>(null);

  const destroyLeavingChildren = () => {
    setLeavingChildren(null);
  };

  React.useEffect(() => {
    globalState.app &&
      globalState.app.onRouteChange(children?.key?.toString() || "other", () =>
        destroyLeavingChildren()
      );
    console.log("route changed");
    setEnterChildren(children);
    return () => {
      setLeavingChildren(children);
    };
  }, [children?.key]);

  return (
    <>
      <div>{enterChildren}</div>
      <div>{leavingChildren}</div>
    </>
  );
};
