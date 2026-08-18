'use client'

import { useTheme } from '@payloadcms/ui'
import Image from 'next/image'

interface AdminLogoProps {
  primaryLogoUrl: string | null
  whiteLogoUrl: string | null
}

export default function AdminLogo({
  primaryLogoUrl,
  whiteLogoUrl,
}: AdminLogoProps) {
  const { theme } = useTheme()

  const logoUrl =
    theme === 'dark'
      ? whiteLogoUrl
      : primaryLogoUrl

  if (!logoUrl) {
    return (
      <div className="text-xl font-bold">
        URExpat
      </div>
    )
  }

  return (
    <div className="flex justify-center">
      <Image
        src={logoUrl}
        alt="URExpat"
        width={220}
        height={80}
        className="h-auto w-[220px] object-contain"
        priority
      />
    </div>
  )
}