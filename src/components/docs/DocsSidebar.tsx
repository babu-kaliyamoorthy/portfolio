'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Lock } from 'lucide-react';
import { docsNav } from '@/config/docs-nav';
import { cn } from '@/lib/utils';

export default function DocsSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Documentation sections" className="flex flex-col gap-1">
      {docsNav.map((item) => {
        const isActive = item.available && pathname?.startsWith(item.href);

        if (!item.available) {
          return (
            <div
              key={item.href}
              className="flex cursor-not-allowed items-start justify-between gap-2 rounded-xl px-3 py-2.5 opacity-40"
              aria-disabled
            >
              <div>
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="text-xs text-foreground/50">{item.description}</p>
              </div>
              <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-foreground/40" />
            </div>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              'rounded-xl px-3 py-2.5 transition-colors hover:bg-foreground/5',
              isActive && 'bg-primary/10',
            )}
          >
            <p className={cn('text-sm font-medium', isActive ? 'text-primary-light' : 'text-foreground')}>
              {item.label}
            </p>
            <p className="text-xs text-foreground/50">{item.description}</p>
          </Link>
        );
      })}
    </nav>
  );
}
