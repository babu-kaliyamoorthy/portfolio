import type { MDXComponents } from 'mdx/types';
import { isValidElement, type ReactNode } from 'react';
import CodeBlock from '@/components/docs/CodeBlock';
import MermaidDiagram from '@/components/docs/MermaidDiagram';

function Pre({ children }: { children?: ReactNode }) {
  if (!isValidElement<{ children?: ReactNode; className?: string }>(children)) {
    return <CodeBlock code="" language="" />;
  }
  const code = children.props.children?.toString().replace(/\n$/, '') ?? '';
  const language = children.props.className?.replace('language-', '') ?? '';

  if (language === 'mermaid') {
    return <MermaidDiagram chart={code} />;
  }

  return <CodeBlock code={code} language={language} />;
}

export const mdxComponents: MDXComponents = {
  pre: Pre,
};
