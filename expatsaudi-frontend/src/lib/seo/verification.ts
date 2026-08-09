import type { Metadata } from 'next';

/* -------------------------------------------------------------------------- */
/*                               Verification                                 */
/* -------------------------------------------------------------------------- */

interface BuildVerificationOptions {
  googleVerification?: string | null;

  bingVerification?: string | null;
}

export function buildVerification({
  googleVerification,
  bingVerification,
}: BuildVerificationOptions): Metadata['verification'] {
  const verification: Metadata['verification'] =
    {};

  if (googleVerification) {
    verification.google =
      googleVerification;
  }

  if (bingVerification) {
    verification.other = {
      bing: bingVerification,
    };
  }

  return verification;
}