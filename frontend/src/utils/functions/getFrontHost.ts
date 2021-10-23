import { sliceSlash } from 'utils/functions/sliceSlash';

import { isDev } from './isDev';

const prodHost = sliceSlash(process.env.NEXT_PUBLIC_FRONTEND_PROD as string);
const localHost = sliceSlash(process.env.NEXT_PUBLIC_FRONTEND_LOCAL as string);

export const getFrontHost = () => {
  return isDev() ? localHost : prodHost;
};
