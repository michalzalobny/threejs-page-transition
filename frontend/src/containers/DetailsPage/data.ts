import { GetStaticProps } from 'next';

import { getCards, Card } from 'utils/prismic/queries/getCards';
import { getLayout } from 'utils/prismic/queries/getLayout';

import { ISR_TIMEOUT } from 'utils/prismic/isrTimeout';

export interface Props {
  card: Card;
  cardsCms: Card[];
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const detailId = params?.id;
  const cards = await getCards();

  const urlCard = cards.find((el) => el.uid === detailId);
  const layout = await getLayout();

  return {
    props: {
      card: urlCard,
      cardsCms: cards,
    },
    revalidate: ISR_TIMEOUT,
  };
};
