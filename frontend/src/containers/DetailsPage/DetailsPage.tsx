import React from 'react';
import Link from 'next/link';

export default function DetailsPage() {
  return (
    <>
      <div className="details__wrapper">
        <h1 className="details__title">Details page</h1>

        <Link passHref href="/">
          <a className="details__button">Go to index</a>
        </Link>
        <div className="details__spacer" />
        <p data-animation="paragraph" className="index__paragraph">
          Details page Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Quaerat, dolores excepturi repellendus voluptate nemo, fugiat, a sint
          cumque quos minima numquam quam recusandae odio facilis optio impedit
          vero et dolorem?
        </p>
      </div>
    </>
  );
}
