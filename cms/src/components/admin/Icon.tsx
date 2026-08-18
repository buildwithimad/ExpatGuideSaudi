import Image from 'next/image'
import { getPayload } from 'payload'

import config from '@/payload.config'

export default async function Icon() {
  const payload = await getPayload({
    config,
  })

  const settings = await payload.findGlobal({
    slug: 'site-settings',
    locale: 'en',
    depth: 2,
    overrideAccess: true,
  })

  const favicon =
    typeof settings?.logos?.favicon === 'object'
      ? settings.logos.favicon
      : null

  const faviconUrl = favicon?.url

  if (!faviconUrl) {
    return (
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#006C35] text-sm font-bold text-white shadow-sm">
        UR
      </div>
    )
  }

  return (
    <div className="flex h-9 w-9 items-center justify-center">
      <Image
        src={faviconUrl}
        alt="URExpat"
        width={36}
        height={36}
        className="h-9 w-9 object-contain"
      />
    </div>
  )
}