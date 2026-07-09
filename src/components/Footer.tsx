import Link from 'next/link';
import { Github, Linkedin, Mail } from 'lucide-react';
import { personal } from '@/data/resume';

const exploreLinks = [
  { label: 'About', href: '/about' },
  { label: 'Skills', href: '/skills' },
  { label: 'Career', href: '/career' },
  { label: 'Projects', href: '/projects' },
  { label: 'Architecture', href: '/architecture' },
  { label: 'Articles', href: '/articles' },
  { label: 'Open Source', href: '/open-source' },
  { label: 'Contact', href: '/contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-foreground/5 px-6 py-10 sm:px-10 lg:px-16">
      <div className="container-narrow flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-b border-foreground/5 pb-8 sm:justify-start">
        {exploreLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm font-medium text-foreground/60 transition-colors hover:text-foreground"
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="container-narrow mt-8 flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <p className="text-center text-sm text-foreground/50 sm:text-left">
          &copy; {year} {personal.name}. All rights reserved.
        </p>

        <div className="flex items-center gap-3">
          <a
            href={`mailto:${personal.email}`}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/10 text-foreground/60 transition-colors hover:border-primary/50 hover:text-foreground"
            aria-label="Email"
          >
            <Mail className="h-4 w-4" />
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/10 text-foreground/60 transition-colors hover:border-primary/50 hover:text-foreground"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href={personal.github}
            target="_blank"
            rel="noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/10 text-foreground/60 transition-colors hover:border-primary/50 hover:text-foreground"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
        </div>

        <p className="text-center text-xs text-foreground/40 sm:text-right">
          Designed &amp; Developed by <span className="text-foreground/70">{personal.name}</span>
        </p>
      </div>
    </footer>
  );
}
