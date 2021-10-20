import React from 'react';

import { RichText } from 'components/RichText/RichText';

export interface Props {
  moreLabel: string;
  title: string;
  frontImgSrc: string;
  elIndex: number;
}

export const CardPreview = (props: Props) => {
  const { elIndex, frontImgSrc, moreLabel, title } = props;
  return (
    <div className="card-preview">
      <div
        className={`card-preview__container ${
          elIndex % 2 === 0 && 'card-preview__container--secondary'
        }`}
      >
        <div className="card-preview__text-wrapper">
          <figure data-src={frontImgSrc} className="card-preview__img__wrapper">
            <img className="card-preview__img" src={frontImgSrc} alt={title} />
          </figure>
          <h2 className="card-preview__text-wrapper__text">
            <RichText text={title} />
          </h2>

          <span className="card-preview__text-wrapper__text card-preview__text-wrapper__text__copy__wrapper card-preview__text-wrapper__text__copy__wrapper--top">
            <h2 className="card-preview__text-wrapper__text card-preview__text-wrapper__text__copy card-preview__text-wrapper__text__copy--top">
              <RichText text={title} />
            </h2>
          </span>

          <span className="card-preview__text-wrapper__text card-preview__text-wrapper__text__copy__wrapper card-preview__text-wrapper__text__copy__wrapper--bottom">
            <h2 className="card-preview__text-wrapper__text card-preview__text-wrapper__text__copy card-preview__text-wrapper__text__copy--bottom">
              <RichText text={title} />
            </h2>
          </span>
        </div>
      </div>
    </div>
  );
};
