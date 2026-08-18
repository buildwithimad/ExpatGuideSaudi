import type { Metadata } from 'next';

import { DEFAULT_ROBOTS } from './constants';

/* -------------------------------------------------------------------------- */
/*                                  Robots                                    */
/* -------------------------------------------------------------------------- */

interface BuildRobotsOptions {
  robots?: Metadata['robots'];

  noIndex?: boolean;

  noFollow?: boolean;
}

export function buildRobots({
  robots,
  noIndex = false,
  noFollow = false,
}: BuildRobotsOptions): Metadata['robots'] {
  if (robots) {
    return robots;
  }

  return {
    ...DEFAULT_ROBOTS,

    index: !noIndex,

    follow: !noFollow,
  };
}