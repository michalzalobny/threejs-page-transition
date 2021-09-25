import React from "react";

import styles from "./pageWrapper.module.scss";

export interface PageWrapperProps {
  children: React.ReactElement<any, any> | null;
}

export const PageWrapper = (props: PageWrapperProps) => {
  const { children } = props;

  const [prevChildren, setPrevChildren] =
    React.useState<PageWrapperProps["children"]>(null);

  React.useEffect(() => {
    return () => {
      console.log(children?.key);
      setPrevChildren(children);
    };
  }, [children?.key]);

  return (
    <>
      <div className={styles.wrapper}>{children}</div>
      <div className={styles.wrapper}>{prevChildren}</div>
    </>
  );
};
