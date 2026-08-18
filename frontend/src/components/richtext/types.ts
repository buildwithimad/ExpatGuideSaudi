export interface LexicalLinkFields {
  url?: string
  newTab?: boolean
  linkType?: 'custom' | 'internal'
}

export interface LexicalNode {
  key?: string
  type: string
  tag?: string
  text?: string
  format?: number
  children?: LexicalNode[]
  listType?: 'bullet' | 'number'
  value?: number
  version?: number
  fields?: LexicalLinkFields
  [key: string]: unknown
}

export interface LexicalDocument {
  root: LexicalNode
}