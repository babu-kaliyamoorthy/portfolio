'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export default function CodeBlock({
  code,
  language,
  title,
}: {
  code: string;
  language?: string;
  title?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="card-surface overflow-hidden rounded-2xl">
      <div className="flex items-center justify-between border-b border-foreground/10 px-4 py-2.5">
        <span className="font-mono text-xs text-foreground/50">{title ?? language}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs text-foreground/50 transition-colors hover:bg-foreground/5 hover:text-foreground"
          aria-label="Copy code"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-primary-light" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-sm leading-relaxed text-foreground/85">
        <code>{code}</code>
      </pre>
    </div>
  );
}
