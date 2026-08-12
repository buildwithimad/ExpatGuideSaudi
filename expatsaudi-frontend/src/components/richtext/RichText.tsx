import RenderChildren from './RenderChildren'
import type { LexicalDocument } from './types'

interface HeadingItem {
  id: string
  label: string
}

interface Props {
  data: LexicalDocument | null | undefined
  headingIds?: HeadingItem[]
}

export default function RichText({
  data,
  headingIds = [],
}: Props) {
  if (!data?.root?.children) {
    return null
  }

  return (
    <div className="prose-editorial max-w-none">
      <RenderChildren
        nodes={data.root.children}
        headingIds={headingIds}
      />
    </div>
  )
}