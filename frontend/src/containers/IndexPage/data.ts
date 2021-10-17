import { GetStaticProps } from 'next';
import Prismic from '@prismicio/client';

import { client } from 'utils/prismic/client';

import { ISR_TIMEOUT } from 'utils/prismic/isrTimeout';

interface Card {
  uid: string;
  imageSrc: string;
  name: string;
  description: string;
}

export interface Props {
  cardsCms: Card[];
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const layout = await client.query(
    Prismic.Predicates.at('document.type', 'layout'),
  );

  const cards = await client.query(
    Prismic.Predicates.at('document.type', 'card'),
  );

  const cardsCms: Card[] = cards.results.map((el) => {
    return {
      uid: el.uid as string,
      description: el.data.description as string,
      imageSrc: el.data.image.url as string,
      name: el.data.name[0].text as string,
    };
  });

  return {
    props: {
      cardsCms,
    },
    revalidate: ISR_TIMEOUT,
  };
};
