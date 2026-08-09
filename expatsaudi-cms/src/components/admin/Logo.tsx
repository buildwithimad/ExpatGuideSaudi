import Image from 'next/image';
import { getPayload } from 'payload';

import config from '@/payload.config';

export default async function Logo() {
  const payload = await getPayload({
    config,
  });

  const settings = await payload.findGlobal({
    slug: 'site-settings',
    locale: 'en',
    depth: 1,
    overrideAccess: true,
  });

  const logo = settings?.logos?.primaryLogo;

  const logoUrl =
    typeof logo === 'object' && logo?.url
      ? logo.url
      : null;

  if (!logoUrl) {
    return (
      <div className="text-xl font-bold">
        ExpatSaudi
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <Image
        src={logoUrl}
        alt="ExpatSaudi"
        width={220}
        height={80}
        className="h-auto w-[220px] object-contain"
        priority
      />
    </div>
  );
}