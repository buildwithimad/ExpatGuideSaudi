import { getPayload } from 'payload'

import config from '@/payload.config'
import AdminLogo from './AdminLogo'

export default async function Logo() {
  const payload = await getPayload({
    config,
  })

  const settings = await payload.findGlobal({
    slug: 'site-settings',
    locale: 'en',
    depth: 2,
    overrideAccess: true,
  })

  const primaryLogo =
    typeof settings?.logos?.primaryLogo === 'object'
      ? settings.logos.primaryLogo
      : null

  const whiteLogo =
    typeof settings?.logos?.whiteLogo === 'object'
      ? settings.logos.whiteLogo
      : null

  return (
    <AdminLogo
      primaryLogoUrl={primaryLogo?.url || null}
      whiteLogoUrl={whiteLogo?.url || null}
    />
  )
}