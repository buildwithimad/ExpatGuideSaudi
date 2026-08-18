'use client'

import { useEffect, useState } from 'react'

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
  const [articleUrl, setArticleUrl] =
    useState('')

  const [copied, setCopied] =
    useState(false)

  const isAr = locale === 'ar'
  const isUr = locale === 'ur'

  /* -------------------------------------------------------------------------- */
  /*                              Article URL                                   */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    // Get the real public URL only on the client.
    setArticleUrl(window.location.href)
  }, [])

  /* -------------------------------------------------------------------------- */
  /*                              Share URLs                                    */
  /* -------------------------------------------------------------------------- */

  const encodedUrl =
    articleUrl
      ? encodeURIComponent(articleUrl)
      : ''

  const encodedTitle =
    encodeURIComponent(title)

  const whatsappUrl = articleUrl
    ? `https://wa.me/?text=${encodeURIComponent(
        `${title}\n\n${articleUrl}`,
      )}`
    : '#'

  const facebookUrl = articleUrl
    ? `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
    : '#'

  const xUrl = articleUrl
    ? `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`
    : '#'

  const linkedinUrl = articleUrl
    ? `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
    : '#'

  /* -------------------------------------------------------------------------- */
  /*                              Copy Link                                     */
  /* -------------------------------------------------------------------------- */

  const handleCopyLink = async () => {
    if (!articleUrl) return

    try {
      if (
        navigator.clipboard &&
        window.isSecureContext
      ) {
        await navigator.clipboard.writeText(
          articleUrl,
        )
      } else {
        // Fallback for older browsers.
        const textarea =
          document.createElement('textarea')

        textarea.value = articleUrl
        textarea.style.position = 'fixed'
        textarea.style.opacity = '0'

        document.body.appendChild(
          textarea,
        )

        textarea.focus()
        textarea.select()

        document.execCommand('copy')

        document.body.removeChild(
          textarea,
        )
      }

      setCopied(true)

      window.setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch {
      setCopied(false)
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
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on WhatsApp"
            title="Share on WhatsApp"
            className="w-9 h-9 flex items-center justify-center border border-border bg-background hover:border-[#25D366] transition-colors"
          >
            <FaWhatsapp
              size={17}
              className="text-[#25D366]"
            />
          </a>

          {/* Facebook */}
          <a
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on Facebook"
            title="Share on Facebook"
            className="w-9 h-9 flex items-center justify-center border border-border bg-background hover:border-[#1877F2] transition-colors"
          >
            <FaFacebookF
              size={15}
              className="text-[#1877F2]"
            />
          </a>

          {/* X */}
          <a
            href={xUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on X"
            title="Share on X"
            className="w-9 h-9 flex items-center justify-center border border-border bg-background hover:border-foreground transition-colors"
          >
            <FaXTwitter
              size={16}
              className="text-foreground"
            />
          </a>

          {/* LinkedIn */}
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on LinkedIn"
            title="Share on LinkedIn"
            className="w-9 h-9 flex items-center justify-center border border-border bg-background hover:border-[#0A66C2] transition-colors"
          >
            <FaLinkedinIn
              size={16}
              className="text-[#0A66C2]"
            />
          </a>

          {/* Copy Link */}
          <button
            type="button"
            onClick={handleCopyLink}
            disabled={!articleUrl}
            aria-label="Copy link"
            title="Copy link"
            className="w-9 h-9 flex items-center justify-center border border-border bg-background hover:border-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
      {/*                          Copied Message                              */}
      {/* -------------------------------------------------------------------- */}

      {copied && (
        <p className="text-xs text-primary mt-3">
          {copiedText}
        </p>
      )}
    </div>
  )
}