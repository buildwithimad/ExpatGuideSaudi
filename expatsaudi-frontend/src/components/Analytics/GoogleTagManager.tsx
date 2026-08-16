import { GoogleTagManager as NextGoogleTagManager } from '@next/third-parties/google';

interface GoogleTagManagerProps {
  gtmId?: string | null;
}

export default function GoogleTagManager({
  gtmId,
}: GoogleTagManagerProps) {
  if (!gtmId) {
    return null;
  }

  return <NextGoogleTagManager gtmId={gtmId} />;
}