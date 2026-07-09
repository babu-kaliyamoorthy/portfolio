'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { personal } from '@/data/resume';
import ThemeToggle from '@/components/ThemeToggle';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import DocsSidebar from '@/components/docs/DocsSidebar';

export default function DocsNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-foreground/10 bg-background/80 backdrop-blur-xl">
      <div className="container-narrow flex items-center justify-between px-6 py-4 sm:px-10 lg:px-16">
        <Link href="/" className="font-mono text-lg font-bold tracking-tight text-foreground">
          <span className="text-primary-light">&lt;</span>
          {personal.name.split(' ')[0]}
          <span className="text-secondary">/&gt;</span>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="hidden text-sm font-medium text-foreground/70 transition-colors hover:text-foreground sm:block"
          >
            Home
          </Link>
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/10 text-foreground lg:hidden"
                aria-label="Toggle documentation menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent open={open} side="left">
              <p className="mb-4 mt-8 text-xs font-medium uppercase tracking-[0.2em] text-foreground/40">
                Documentation
              </p>
              <DocsSidebar onNavigate={() => setOpen(false)} />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
