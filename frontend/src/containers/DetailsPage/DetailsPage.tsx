import React from 'react';
import Link from 'next/link';

import imageSrc from '../IndexPage/images/1.jpg';

export default function DetailsPage() {
  return (
    <>
      <div className="details__wrapper">
        <div style={{ height: '10vh' }}></div>
        <figure
          data-transition="details"
          data-animation="image3d"
          data-src={imageSrc.src}
          className="details__img-wrapper"
        >
          <img
            src={imageSrc.src}
            className="details__img"
            alt="Newcastle tyne river"
          />
        </figure>

        <div className="details__container">
          <h1 data-animation="paragraph" className="details__title">
            Details page
          </h1>

          <Link passHref href="/">
            <a className="details__button">Go to index</a>
          </Link>
          <div className="details__spacer" />
          <p data-animation="paragraph" className="details__p">
            Details page Lorem ipsum dolor sit amet consectetur, adipisicing
            elit. Quaerat, dolores excepturi repellendus voluptate nemo, fugiat,
            a sint cumque quos minima numquam quam recusandae odio facilis optio
            impedit vero et dolorem?
          </p>

          <p data-animation="paragraph" className="details__p">
            Details page Lorem ipsum dolor sit amet consectetur, adipisicing
            elit. Quaerat, dolores excepturi repellendus voluptate nemo, fugiat,
            a sint cumque.
          </p>

          <p data-animation="paragraph" className="details__p">
            Details page Lorem ipsum dolor sit amet consectetur, adipisicing
            elit. Quaerat, dolores excepturi repellendus voluptate nemo, fugiat,
            a sint cumque.
          </p>

          <p data-animation="paragraph" className="details__p">
            Details page Lorem ipsum dolor sit amet consectetur, adipisicing
            elit. Quaerat, dolores excepturi repellendus voluptate nemo, fugiat,
            a sint cumque.
          </p>
        </div>
      </div>
    </>
  );
}
