import React from "react";
import type { NextApiResponse } from "next";

import ErrorPage from "containers/ErrorPage/ErrorPage";

interface ErrorProps {
  res?: NextApiResponse;
  err?: NextApiResponse;
}

interface Error {
  statusCode: number;
}

export default function Error({ statusCode }: Error) {
  return <ErrorPage statusCode={statusCode}></ErrorPage>;
}

Error.getInitialProps = ({ res, err }: ErrorProps) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};
