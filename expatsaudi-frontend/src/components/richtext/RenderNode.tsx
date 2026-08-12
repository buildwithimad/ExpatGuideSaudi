import React from 'react'

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
      let content: React.ReactNode =
        node.text ?? ''

      if (
        hasFormat(
          node.format,
          TEXT_CODE,
        )
      ) {
        content = (
          <code className="rounded bg-muted px-1 py-0.5 font-mono text-sm">
            {content}
          </code>
        )
      }

      if (
        hasFormat(
          node.format,
          TEXT_BOLD,
        )
      ) {
        content = <strong>{content}</strong>
      }

      if (
        hasFormat(
          node.format,
          TEXT_ITALIC,
        )
      ) {
        content = <em>{content}</em>
      }

      if (
        hasFormat(
          node.format,
          TEXT_UNDERLINE,
        )
      ) {
        content = <u>{content}</u>
      }

      if (
        hasFormat(
          node.format,
          TEXT_STRIKETHROUGH,
        )
      ) {
        content = <s>{content}</s>
      }

      return <>{content}</>
    }

    case 'paragraph':
      return (
        <p className="mb-6 leading-8 text-muted-foreground">
          <RenderChildren
            nodes={node.children}
            headingIds={headingIds}
            headingIndex={headingIndex}
          />
        </p>
      )

    case 'heading': {
      /*
       * Use the canonical ID supplied by the API.
       *
       * IMPORTANT:
       * Do NOT generate the ID from the translated
       * heading text. The same ID must be used for
       * English, Arabic, Urdu, etc.
       */
      const id = headingId

      switch (node.tag) {
        case 'h1':
          return (
            <h1
              id={id}
              className="mb-6 mt-10 scroll-mt-28 text-4xl font-bold"
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
              className="mb-5 mt-10 scroll-mt-28 text-3xl font-bold"
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
              className="mb-4 mt-8 scroll-mt-28 text-2xl font-semibold"
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
              className="mb-3 mt-6 scroll-mt-28 text-xl font-semibold"
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
              className="mb-2 mt-6 scroll-mt-28 text-lg font-semibold"
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
              className="mb-2 mt-6 scroll-mt-28 text-base font-semibold"
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
              className="mb-5 mt-10 scroll-mt-28 text-3xl font-bold"
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
      const ListTag =
        node.listType === 'number'
          ? 'ol'
          : 'ul'

      return (
        <ListTag
          className={
            node.listType === 'number'
              ? 'mb-6 list-decimal ps-6 space-y-2'
              : 'mb-6 list-disc ps-6 space-y-2'
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
        <li className="leading-8 text-muted-foreground">
          <RenderChildren
            nodes={node.children}
            headingIds={headingIds}
            headingIndex={headingIndex}
          />
        </li>
      )

    case 'linebreak':
      return <br />

    default:
      return null
  }
}