import { Fragment } from 'react'

import RenderNode from './RenderNode'
import type { LexicalNode } from './types'

export interface HeadingItem {
  id: string
  label: string
}

interface Props {
  nodes?: LexicalNode[]
  headingIds?: HeadingItem[]
  headingIndex?: {
    current: number
  }
}

export default function RenderChildren({
  nodes,
  headingIds = [],
  headingIndex = { current: 0 },
}: Props) {
  if (!nodes?.length) {
    return null
  }

  return (
    <>
      {nodes.map((node, index) => {
        let headingId: string | undefined

        if (node.type === 'heading') {
          headingId = headingIds[headingIndex.current]?.id
          headingIndex.current += 1
        }

        return (
          <Fragment key={node.key ?? index}>
            <RenderNode
              node={node}
              headingId={headingId}
              headingIds={headingIds}
              headingIndex={headingIndex}
            />
          </Fragment>
        )
      })}
    </>
  )
}