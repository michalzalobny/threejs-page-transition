import React from "react";

import styles from "./errorPage.module.scss";

interface ErrorPageProps {
  statusCode: number;
}

export default function ErrorPage(props: ErrorPageProps) {
  const { statusCode } = props;
  return (
    <>
      <div className={styles.wrapper}>
        <p className={styles.code}>
          Something went wrong {`| ${statusCode}` || "| 404"}
        </p>
      </div>
    </>
  );
}
