import React from "react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

import "../styles/index.scss";

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  const router = useRouter();

  return (
    <>
      <Component router={router} {...pageProps} />
    </>
  );
}
