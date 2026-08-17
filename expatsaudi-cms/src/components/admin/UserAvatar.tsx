'use client'

import { useAuth } from '@payloadcms/ui'
import { useEffect, useState } from 'react'

interface Media {
  url?: string | null
}

interface User {
  id: string
  email?: string
  fullName?: string
  avatar?: string | number | Media | null
}

export default function UserAvatar() {
  const { user } = useAuth<User>()

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!user?.id) return

    const loadAvatar = async () => {
      try {
        const response = await fetch(
          `/api/users/${user.id}?depth=1`,
          {
            credentials: 'include',
            cache: 'no-store',
          },
        )

        if (!response.ok) return

        const data = await response.json()

        const avatar = data?.avatar

        if (
          avatar &&
          typeof avatar === 'object' &&
          avatar.url
        ) {
          setAvatarUrl(avatar.url)
        }
      } catch (error) {
        console.error(
          'Failed to load user avatar:',
          error,
        )
      }
    }

    loadAvatar()
  }, [user?.id])

  const size = 32

  if (!avatarUrl) {
    return (
      <div
        style={{
          width: `${size}px`,
          height: `${size}px`,
          minWidth: `${size}px`,
          minHeight: `${size}px`,
          maxWidth: `${size}px`,
          maxHeight: `${size}px`,
          borderRadius: '50%',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#e5e7eb',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontSize: '12px',
            fontWeight: 600,
          }}
        >
          {user?.fullName?.charAt(0).toUpperCase() ||
            user?.email?.charAt(0).toUpperCase() ||
            'U'}
        </span>
      </div>
    )
  }

  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        minWidth: `${size}px`,
        minHeight: `${size}px`,
        maxWidth: `${size}px`,
        maxHeight: `${size}px`,
        borderRadius: '50%',
        overflow: 'hidden',
        display: 'block',
        flexShrink: 0,
      }}
    >
      <img
        src={avatarUrl}
        alt={user?.fullName || 'User'}
        style={{
          display: 'block',
          width: `${size}px`,
          height: `${size}px`,
          minWidth: `${size}px`,
          minHeight: `${size}px`,
          maxWidth: `${size}px`,
          maxHeight: `${size}px`,
          objectFit: 'cover',
          borderRadius: '50%',
        }}
      />
    </div>
  )
}