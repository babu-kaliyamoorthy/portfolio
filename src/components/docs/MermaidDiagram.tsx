'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { useTheme } from 'next-themes';

export default function MermaidDiagram({ chart, caption }: { chart: string; caption?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const id = useId().replace(/:/g, '');
  const { resolvedTheme } = useTheme();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function render() {
      const mermaid = (await import('mermaid')).default;
      mermaid.initialize({
        startOnLoad: false,
        theme: resolvedTheme === 'light' ? 'default' : 'dark',
        fontFamily: 'var(--font-inter)',
        themeVariables: {
          primaryColor: '#2563EB22',
          primaryBorderColor: '#3B82F6',
          primaryTextColor: resolvedTheme === 'light' ? '#050816' : '#FFFFFF',
          lineColor: '#3B82F6',
          fontSize: '14px',
        },
      });

      try {
        const { svg } = await mermaid.render(`mermaid-${id}`, chart);
        if (!cancelled && containerRef.current) {
          containerRef.current.innerHTML = svg;
        }
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to render diagram');
      }
    }

    render();
    return () => {
      cancelled = true;
    };
  }, [chart, id, resolvedTheme]);

  return (
    <figure className="card-surface overflow-x-auto rounded-2xl p-6">
      {error ? (
        <p className="text-sm text-red-400">Diagram failed to render: {error}</p>
      ) : (
        <div ref={containerRef} className="flex min-h-[120px] items-center justify-center [&_svg]:mx-auto" />
      )}
      {caption && <figcaption className="mt-4 text-center text-xs text-foreground/50">{caption}</figcaption>}
    </figure>
  );
}
