import React from "react";

import styles from "./indexPage.module.scss";

export default function IndexPage() {
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>First page </h1>
        <p>Test</p>
        <a href="/">test</a>
        <button
          onClick={() => {
            alert("alert");
          }}
        >
          Click me
        </button>
        <input className={styles.input} type="text" />
      </div>
    </>
  );
}
