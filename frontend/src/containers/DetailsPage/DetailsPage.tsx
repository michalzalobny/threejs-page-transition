import React from "react";
import Link from "next/link";

export default function DetailsPage() {
  return (
    <>
      <div className="details__wrapper">
        <h1 className="details__title">Details page</h1>

        <Link passHref href="/">
          <a className="details__button">Go to index</a>
        </Link>
      </div>
    </>
  );
}
