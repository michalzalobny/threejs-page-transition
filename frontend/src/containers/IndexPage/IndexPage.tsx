import React from 'react';
import Link from 'next/link';

import { CardPreview } from 'components/CardPreview/CardPreview';

import { Props } from './data';
import imageSrc from './images/1.jpg';

export default function IndexPage(props: Props) {
  const { cardsCms } = props;

  return (
    <>
      <div className="index__wrapper">
        {cardsCms.map((el, key) => (
          <CardPreview
            key={el.uid}
            title={el.name}
            frontImgSrc={el.imageSrc}
            moreLabel="more"
            elIndex={key + 1}
          />
        ))}
        <h1 data-animation="paragraph" className="index__title">
          Index page
        </h1>

        <div className="index__spacer" />
        <p data-animation="paragraph" className="index__p">
          Index page Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Quaerat, dolores excepturi repellendus voluptate nemo, fugiat, a sint
        </p>

        <p data-animation="paragraph" className="index__p">
          Index page Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Quaerat, dolores excepturi repellendus voluptate nemo, fugiat, a sint
          cumque.w
        </p>

        <Link passHref href="/details">
          <a className="index__img-link">
            <figure
              data-transition="index"
              data-animation="image3d"
              data-src={imageSrc.src}
              className="index__img-wrapper"
            >
              <img
                src={imageSrc.src}
                className="index__img"
                alt="Newcastle tyne river"
              />
            </figure>
          </a>
        </Link>

        <p data-animation="paragraph" className="index__p">
          consectetur, adipisicing elit. Quaerat, dolores excepturi repellendus
          voluptate nemo, fugiat, a sint cumque quos minima numquam quam
          recusandae odio facilis optio impedit vero et dolorem?
        </p>

        <p data-animation="paragraph" className="index__p">
          Dlor sit amet consectetur, adipisicing elit. Quaerat, dolores
          excepturi repellendus voluptate nemo, fugiat, a sint cumque quos
          minima numquam quam recusandae odio facilis optio impedit vero et
          dolorem?
        </p>

        <p data-animation="paragraph" className="index__p">
          Dlor sit amet consectetur, adipisicing elit. Quaerat, dolores
          excepturi repellendus voluptate nemo, fugiat, a sint cumque quos
          minima numquam quam recusandae odio facilis optio impedit vero et
          dolorem?
        </p>
      </div>
    </>
  );
}
