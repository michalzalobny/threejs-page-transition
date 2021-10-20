import React from 'react';

import { RichText } from 'components/RichText/RichText';

export interface Props {
  moreLabel: string;
  title: string;
}

export const CardContent = (props: Props) => {
  const { moreLabel, title } = props;
  return (
    <div className="card-content">
      <div data-curtain="wrapper" className="card-content__text-wrapper">
        <h2 className="card-content__text-wrapper__text">
          <RichText text={title} />
        </h2>
      </div>
    </div>
  );
};
