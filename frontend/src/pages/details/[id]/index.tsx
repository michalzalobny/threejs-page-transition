import { GetStaticPaths, GetStaticPathsResult } from 'next';

import { getCards } from 'utils/prismic/queries/getCards';

export { default } from 'containers/DetailsPage/DetailsPage';
export { getStaticProps } from 'containers/DetailsPage/data';

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const cards = await getCards();

  let paths: GetStaticPathsResult['paths'] = [];

  (locales as string[]).forEach((locale) => {
    cards.map((card) => {
      paths = paths.concat({
        params: {
          id: card.uid,
        },
        locale,
      });
    });
  });

  return {
    paths,
    fallback: false,
  };
};
