import Prismic from '@prismicio/client';

import { client } from 'utils/prismic/client';

export const getLayout = async () =>
  client.query(Prismic.Predicates.at('document.type', 'layout'));
