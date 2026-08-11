'use client'

import { useState } from 'react'

import {
    FaFacebookF,
    FaLinkedinIn,
    FaWhatsapp,
    FaXTwitter,
} from 'react-icons/fa6'
import {
    FiCheck,
    FiLink,
} from 'react-icons/fi'

import type { Locale } from '@/lib/i18n-config'

interface SocialShareProps {
  locale: Locale
  title: string
}

export default function SocialShare({
  locale,
  title,
}: SocialShareProps) {
  const [copied, setCopied] = useState(false)

  const isAr = locale === 'ar'
  const isUr = locale === 'ur'

  /* -------------------------------------------------------------------------- */
  /*                              Share Actions                                */
  /* -------------------------------------------------------------------------- */

  const handleWhatsAppShare = () => {
    const articleUrl = window.location.href

    const shareText =
      `${title}\n\n${articleUrl}`

    const shareUrl =
      `https://wa.me/?text=${encodeURIComponent(
        shareText,
      )}`

    window.open(
      shareUrl,
      '_blank',
      'noopener,noreferrer',
    )
  }

  const handleFacebookShare = () => {
    const articleUrl = window.location.href

    const shareUrl =
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        articleUrl,
      )}`

    window.open(
      shareUrl,
      '_blank',
      'width=700,height=600,noopener,noreferrer',
    )
  }

  const handleXShare = () => {
    const articleUrl = window.location.href

    const shareUrl =
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        title,
      )}&url=${encodeURIComponent(
        articleUrl,
      )}`

    window.open(
      shareUrl,
      '_blank',
      'width=700,height=600,noopener,noreferrer',
    )
  }

  const handleLinkedInShare = () => {
    const articleUrl = window.location.href

    const shareUrl =
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        articleUrl,
      )}`

    window.open(
      shareUrl,
      '_blank',
      'width=700,height=600,noopener,noreferrer',
    )
  }

  /* -------------------------------------------------------------------------- */
  /*                              Copy Link                                     */
  /* -------------------------------------------------------------------------- */

  const handleCopyLink = async () => {
    try {
      const articleUrl =
        window.location.href

      await navigator.clipboard.writeText(
        articleUrl,
      )

      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch {
      // Clipboard unavailable
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                              Translations                                  */
  /* -------------------------------------------------------------------------- */

  const shareTitle =
    isAr
      ? 'شارك هذا المقال'
      : isUr
        ? 'یہ مضمون شیئر کریں'
        : 'Share this article'

  const shareDescription =
    isAr
      ? 'ساعد الآخرين في الوصول إلى هذه المعلومات.'
      : isUr
        ? 'دوسروں تک یہ مفید معلومات پہنچانے میں مدد کریں۔'
        : 'Help others find this useful information.'

  const copiedText =
    isAr
      ? 'تم نسخ الرابط'
      : isUr
        ? 'لنک کاپی ہو گیا'
        : 'Link copied'

  /* -------------------------------------------------------------------------- */
  /*                                  Render                                    */
  /* -------------------------------------------------------------------------- */

  return (
    <div className="mt-12 pt-8 border-t border-border">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">

        {/* ------------------------------------------------------------------ */}
        {/*                              Text                                  */}
        {/* ------------------------------------------------------------------ */}

        <div>
          <p className="text-sm font-semibold text-foreground">
            {shareTitle}
          </p>

          <p className="text-xs text-muted-foreground mt-1">
            {shareDescription}
          </p>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/*                         Share Buttons                               */}
        {/* ------------------------------------------------------------------ */}

        <div className="flex items-center gap-2">

          {/* WhatsApp */}
          <button
            type="button"
            onClick={handleWhatsAppShare}
            aria-label="Share on WhatsApp"
            title="Share on WhatsApp"
            className="w-9 h-9 flex items-center justify-center border border-border bg-background hover:border-[#25D366] transition-colors"
          >
            <FaWhatsapp
              size={17}
              className="text-[#25D366]"
            />
          </button>

          {/* Facebook */}
          <button
            type="button"
            onClick={handleFacebookShare}
            aria-label="Share on Facebook"
            title="Share on Facebook"
            className="w-9 h-9 flex items-center justify-center border border-border bg-background hover:border-[#1877F2] transition-colors"
          >
            <FaFacebookF
              size={15}
              className="text-[#1877F2]"
            />
          </button>

          {/* X */}
          <button
            type="button"
            onClick={handleXShare}
            aria-label="Share on X"
            title="Share on X"
            className="w-9 h-9 flex items-center justify-center border border-border bg-background hover:border-foreground transition-colors"
          >
            <FaXTwitter
              size={16}
              className="text-foreground"
            />
          </button>

          {/* LinkedIn */}
          <button
            type="button"
            onClick={handleLinkedInShare}
            aria-label="Share on LinkedIn"
            title="Share on LinkedIn"
            className="w-9 h-9 flex items-center justify-center border border-border bg-background hover:border-[#0A66C2] transition-colors"
          >
            <FaLinkedinIn
              size={16}
              className="text-[#0A66C2]"
            />
          </button>

          {/* Copy Link */}
          <button
            type="button"
            onClick={handleCopyLink}
            aria-label="Copy link"
            title="Copy link"
            className="w-9 h-9 flex items-center justify-center border border-border bg-background hover:border-primary transition-colors"
          >
            {copied ? (
              <FiCheck
                size={16}
                className="text-primary"
              />
            ) : (
              <FiLink
                size={16}
                className="text-muted-foreground"
              />
            )}
          </button>

        </div>
      </div>

      {/* -------------------------------------------------------------------- */}
      {/*                            Copied Message                             */}
      {/* -------------------------------------------------------------------- */}

      {copied && (
        <p className="text-xs text-primary mt-3">
          {copiedText}
        </p>
      )}
    </div>
  )
}