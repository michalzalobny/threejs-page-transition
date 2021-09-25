import React from "react";
import Link from "next/link";

import styles from "./indexPage.module.scss";

export default function IndexPage() {
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Index page </h1>

        <input className={styles.input} type="text" />

        <div className={styles.block}></div>

        <Link passHref href="/details">
          <a className={styles.button}>Go to details</a>
        </Link>
      </div>
    </>
  );
}
