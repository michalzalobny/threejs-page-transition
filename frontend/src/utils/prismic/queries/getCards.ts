import Prismic from '@prismicio/client';

import { client } from 'utils/prismic/client';

export interface Card {
  uid: string;
  imageSrc: string;
  name: string;
  description: string;
}

const queryCards = async () =>
  client.query(Prismic.Predicates.at('document.type', 'card'));

export const getCards = async (): Promise<Card[]> => {
  const queriedCards = await queryCards();

  const cards: Card[] = queriedCards.results.map((el) => {
    return {
      uid: el.uid as string,
      description: el.data.description as string,
      imageSrc: el.data.image.url as string,
      name: el.data.name[0].text as string,
    };
  });

  return cards;
};
