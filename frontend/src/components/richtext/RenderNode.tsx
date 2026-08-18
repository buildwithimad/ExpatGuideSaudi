import React from 'react'

import AppImage from '@/components/ui/AppImage'

import type { HeadingItem } from './RenderChildren'
import RenderChildren from './RenderChildren'
import type { LexicalNode } from './types'
import { hasFormat } from './utils'

interface Props {
  node: LexicalNode
  headingId?: string
  headingIds?: HeadingItem[]
  headingIndex?: {
    current: number
  }
}

const TEXT_BOLD = 1
const TEXT_ITALIC = 1 << 1
const TEXT_STRIKETHROUGH = 1 << 2
const TEXT_UNDERLINE = 1 << 3
const TEXT_CODE = 1 << 4

export default function RenderNode({
  node,
  headingId,
  headingIds = [],
  headingIndex = { current: 0 },
}: Props) {
  switch (node.type) {
    case 'text': {
      let content: React.ReactNode = node.text ?? ''

      if (hasFormat(node.format, TEXT_CODE)) {
        content = (
          <code className="rounded bg-muted px-1 py-0.5 font-mono text-[13px] sm:text-sm">
            {content}
          </code>
        )
      }

      if (hasFormat(node.format, TEXT_BOLD)) {
        content = <strong>{content}</strong>
      }

      if (hasFormat(node.format, TEXT_ITALIC)) {
        content = <em>{content}</em>
      }

      if (hasFormat(node.format, TEXT_UNDERLINE)) {
        content = <u>{content}</u>
      }

      if (hasFormat(node.format, TEXT_STRIKETHROUGH)) {
        content = <s>{content}</s>
      }

      return <>{content}</>
    }

    case 'paragraph':
      return (
        <p className="mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed sm:leading-8 text-muted-foreground">
          <RenderChildren
            nodes={node.children}
            headingIds={headingIds}
            headingIndex={headingIndex}
          />
        </p>
      )

    case 'heading': {
      const id = headingId

      switch (node.tag) {
        case 'h1':
          return (
            <h1
              id={id}
              className="mb-4 sm:mb-6 mt-8 sm:mt-10 scroll-mt-24 sm:scroll-mt-28 text-2xl sm:text-3xl md:text-4xl font-bold"
            >
              <RenderChildren
                nodes={node.children}
                headingIds={headingIds}
                headingIndex={headingIndex}
              />
            </h1>
          )

        case 'h2':
          return (
            <h2
              id={id}
              className="mb-3 sm:mb-5 mt-6 sm:mt-10 scroll-mt-24 sm:scroll-mt-28 text-xl sm:text-2xl md:text-3xl font-bold"
            >
              <RenderChildren
                nodes={node.children}
                headingIds={headingIds}
                headingIndex={headingIndex}
              />
            </h2>
          )

        case 'h3':
          return (
            <h3
              id={id}
              className="mb-3 sm:mb-4 mt-5 sm:mt-8 scroll-mt-24 sm:scroll-mt-28 text-lg sm:text-xl md:text-2xl font-semibold"
            >
              <RenderChildren
                nodes={node.children}
                headingIds={headingIds}
                headingIndex={headingIndex}
              />
            </h3>
          )

        case 'h4':
          return (
            <h4
              id={id}
              className="mb-2 sm:mb-3 mt-4 sm:mt-6 scroll-mt-24 sm:scroll-mt-28 text-base sm:text-lg md:text-xl font-semibold"
            >
              <RenderChildren
                nodes={node.children}
                headingIds={headingIds}
                headingIndex={headingIndex}
              />
            </h4>
          )

        case 'h5':
          return (
            <h5
              id={id}
              className="mb-1.5 sm:mb-2 mt-4 sm:mt-6 scroll-mt-24 sm:scroll-mt-28 text-sm sm:text-base md:text-lg font-semibold"
            >
              <RenderChildren
                nodes={node.children}
                headingIds={headingIds}
                headingIndex={headingIndex}
              />
            </h5>
          )

        case 'h6':
          return (
            <h6
              id={id}
              className="mb-1.5 sm:mb-2 mt-3 sm:mt-6 scroll-mt-24 sm:scroll-mt-28 text-[13px] sm:text-sm md:text-base font-semibold"
            >
              <RenderChildren
                nodes={node.children}
                headingIds={headingIds}
                headingIndex={headingIndex}
              />
            </h6>
          )

        default:
          return (
            <h2
              id={id}
              className="mb-3 sm:mb-5 mt-6 sm:mt-10 scroll-mt-24 sm:scroll-mt-28 text-xl sm:text-2xl md:text-3xl font-bold"
            >
              <RenderChildren
                nodes={node.children}
                headingIds={headingIds}
                headingIndex={headingIndex}
              />
            </h2>
          )
      }
    }

    case 'list': {
      const ListTag = node.listType === 'number' ? 'ol' : 'ul'

      return (
        <ListTag
          className={
            node.listType === 'number'
              ? 'mb-4 sm:mb-6 list-decimal space-y-1.5 sm:space-y-2 ps-4 sm:ps-6'
              : 'mb-4 sm:mb-6 list-disc space-y-1.5 sm:space-y-2 ps-4 sm:ps-6'
          }
        >
          <RenderChildren
            nodes={node.children}
            headingIds={headingIds}
            headingIndex={headingIndex}
          />
        </ListTag>
      )
    }

    case 'listitem':
      return (
        <li className="text-sm sm:text-base leading-relaxed sm:leading-8 text-muted-foreground">
          <RenderChildren
            nodes={node.children}
            headingIds={headingIds}
            headingIndex={headingIndex}
          />
        </li>
      )

    case 'linebreak':
      return <br />

    
case 'link': {
  const url = node.fields?.url

  if (!url) {
    return (
      <RenderChildren
        nodes={node.children}
        headingIds={headingIds}
        headingIndex={headingIndex}
      />
    )
  }

  const newTab = node.fields?.newTab === true

  return (
    <a
      href={url}
      target={newTab ? '_blank' : undefined}
      rel={newTab ? 'noopener noreferrer' : undefined}
      className="font-medium text-primary underline underline-offset-4 transition-colors hover:opacity-80"
    >
      <RenderChildren
        nodes={node.children}
        headingIds={headingIds}
        headingIndex={headingIndex}
      />
    </a>
  )
}

    case 'upload': {
      const value = node.value

      if (!value || typeof value !== 'object') {
        return null
      }

      const media = value as {
        url?: string
        alt?: string
        width?: number
        height?: number
        sizes?: {
          thumbnail?: string
          card?: string
          hero?: string
          articleAuthor?: string
        }
      }

      const imageUrl =
        media.url ||
        media.sizes?.hero ||
        media.sizes?.card ||
        media.sizes?.thumbnail ||
        ''

      if (!imageUrl) {
        return null
      }

      return (
        <figure className="my-5 sm:my-8 w-full">
          <AppImage
            src={imageUrl}
            alt={media.alt || ''}
            width={media.width || 1730}
            height={media.height || 909}
            className="block h-auto w-full object-contain"
            sizes="(max-width: 768px) 100vw, 900px"
          />
        </figure>
      )
    }

    default:
      return null
  }
}