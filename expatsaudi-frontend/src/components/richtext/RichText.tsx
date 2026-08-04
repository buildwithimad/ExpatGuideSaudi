import RenderChildren from './RenderChildren';
import type { LexicalDocument } from './types';

interface Props {
  data: LexicalDocument | null | undefined;
}

export default function RichText({ data }: Props) {
  if (!data?.root?.children) {
    return null;
  }

  return (
    <div className="prose-editorial max-w-none">
      <RenderChildren nodes={data.root.children} />
    </div>
  );
}