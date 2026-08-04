import { Fragment } from 'react';

import RenderNode from './RenderNode';
import type { LexicalNode } from './types';

interface Props {
  nodes?: LexicalNode[];
}

export default function RenderChildren({
  nodes,
}: Props) {
  if (!nodes?.length) return null;

  return (
    <>
      {nodes.map((node, index) => (
        <Fragment key={index}>
          <RenderNode node={node} />
        </Fragment>
      ))}
    </>
  );
}