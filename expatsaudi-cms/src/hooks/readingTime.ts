import type { CollectionBeforeChangeHook } from 'payload';

import { calculateReadingTime } from './content';

/* -------------------------------------------------------------------------- */
/*                            Reading Time                                    */
/* -------------------------------------------------------------------------- */

export const setReadingTime: CollectionBeforeChangeHook = ({
  data,
}) => {
  if (!data?.content) {
    return data;
  }

  data.readingTime = Math.max(
    1,
    calculateReadingTime(data.content),
  );

  return data;
};