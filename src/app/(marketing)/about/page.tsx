import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { personal, about, stats, whyHireMe } from '@/data/resume';
import { Button } from '@/components/ui/button';
import { withBasePath } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'About',
  description: `${personal.name} — ${personal.experienceLabel} building Android applications for Banking, FinTech and Enterprise products.`,
};

export default function AboutPage() {
  return (
    <div className="section-padding">
      <div className="container-narrow max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary-light">About</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{personal.name}</h1>
        <p className="mt-2 text-lg text-foreground/60">{personal.role} — {personal.location}</p>

        <div className="mt-10 space-y-5">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-base leading-relaxed text-foreground/75 sm:text-lg">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-2 gap-6 border-y border-foreground/10 py-8 sm:grid-cols-4">
          {stats.slice(0, 4).map((stat) => (
            <div key={stat.label}>
              <p className="font-mono text-2xl font-bold text-foreground sm:text-3xl">
                {stat.value}
                {stat.suffix}
              </p>
              <p className="mt-1 text-xs uppercase tracking-wide text-foreground/50">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-14">
          <h2 className="text-xl font-semibold text-foreground">How I approach engineering</h2>
          <p className="mt-2 text-foreground/60">
            The principles that shape how I design, review and deliver — not just what I&apos;ve built.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {whyHireMe.map((item) => (
              <div key={item.title} className="flex gap-4 rounded-2xl border border-foreground/5 bg-foreground/[0.02] p-6">
                <CheckCircle2 className="h-6 w-6 shrink-0 text-secondary" />
                <div>
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-foreground/65">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-wrap gap-4">
          <Button asChild>
            <Link href="/career">View full career timeline</Link>
          </Button>
          <Button asChild variant="outline">
            <a href={withBasePath(personal.resumeFile)} download>
              Download resume
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
