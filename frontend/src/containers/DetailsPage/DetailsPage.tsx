import React from "react";
import Link from "next/link";

import styles from "./detailsPage.module.scss";

export default function DetailsPage() {
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Details page</h1>
        <div className={styles.block}></div>
        <Link passHref href="/">
          <a className={styles.button}>Go to index</a>
        </Link>
      </div>
    </>
  );
}
