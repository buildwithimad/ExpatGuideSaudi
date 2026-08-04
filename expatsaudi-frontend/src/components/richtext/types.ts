export interface LexicalNode {
  key?: string;

  type: string;

  tag?: string;

  text?: string;

  format?: number;

  children?: LexicalNode[];

  listType?: 'bullet' | 'number';

  value?: number;

  version?: number;

  [key: string]: unknown;
}
export interface LexicalDocument {
  root: LexicalNode;
}