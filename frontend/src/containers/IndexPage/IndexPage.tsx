import React from "react";
import Link from "next/link";

export default function IndexPage() {
  return (
    <>
      <div className="index__wrapper">
        <h1 className="index__title">Index page </h1>

        <Link passHref href="/details">
          <a className="index__button">Go to details</a>
        </Link>
      </div>
    </>
  );
}
