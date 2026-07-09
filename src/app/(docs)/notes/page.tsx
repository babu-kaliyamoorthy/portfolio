import type { Metadata } from 'next';
import { Fragment } from 'react';
import { androidNotes } from '@/data/android-notes';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {
  title: 'Android Notes',
  description: 'Quick-reference Android, Kotlin, Compose and Coroutines notes — small gotchas that don\'t warrant a full page of their own.',
};

function renderWithInlineCode(text: string) {
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, index) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={index}
          className="rounded bg-foreground/10 px-1.5 py-0.5 font-mono text-[0.85em] text-foreground"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return <Fragment key={index}>{part}</Fragment>;
  });
}

export default function NotesPage() {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary-light">Documentation</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Android Notes</h1>
      <p className="mt-4 max-w-2xl text-foreground/70">
        A running cheat sheet of small, easy-to-forget facts — the things worth a bullet point, not a full page.
      </p>

      <div className="mt-12 space-y-10">
        {androidNotes.map((group, index) => (
          <section key={group.category}>
            {index > 0 && <Separator className="mb-10" />}
            <Badge>{group.category}</Badge>
            <ul className="mt-5 space-y-3">
              {group.notes.map((note) => (
                <li key={note} className="flex gap-3 text-sm leading-relaxed text-foreground/70">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{renderWithInlineCode(note)}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
