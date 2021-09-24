import React from "react";

import styles from "./indexPage.module.scss";

export default function IndexPage() {
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>First page </h1>

        <input className={styles.input} type="text" />
      </div>
    </>
  );
}
