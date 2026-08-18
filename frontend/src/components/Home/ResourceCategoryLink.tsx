'use client'

import Link from 'next/link'
import { useState } from 'react'

import Icon from '@/components/ui/AppIcon'

interface ResourceCategoryLinkProps {
  href: string
  title: string
  description: string
  icon: Parameters<typeof Icon>[0]['name']
  viewLabel: string
}

export default function ResourceCategoryLink({
  href,
  title,
  description,
  icon,
  viewLabel,
}: ResourceCategoryLinkProps) {
  const [loading, setLoading] = useState(false)

  return (
    <Link
      href={href}
      onClick={() => setLoading(true)}
      aria-busy={loading}
      className="resource-card flex flex-col gap-3 h-full bg-background group p-6"
    >
      <div className="w-9 h-9 bg-muted flex items-center justify-center">
        {loading ? (
          <Icon
            name="ArrowPathIcon"
            size={18}
            className="text-accent animate-spin"
          />
        ) : (
          <Icon
            name={icon}
            size={18}
            className="text-accent"
          />
        )}
      </div>

      <div>
        <h3 className="text-sm font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors">
          {title}
        </h3>

        <p className="text-xs text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>

      <div className="mt-auto pt-2 flex items-center gap-1 text-primary">
        <span className="text-xs font-semibold">
          {loading ? 'Loading...' : viewLabel}
        </span>

        {!loading && (
          <Icon
            name="ArrowRightIcon"
            size={12}
          />
        )}
      </div>
    </Link>
  )
}