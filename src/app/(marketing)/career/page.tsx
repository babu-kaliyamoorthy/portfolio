import type { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { personal, experience } from '@/data/resume';
import { categorize, type HighlightCategory } from '@/lib/career-highlights';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Career',
  description: `${personal.name}'s career journey across Emirates NBD, TSB Bank UK, Rabobank Netherlands and other enterprise banking and fintech engagements.`,
};

const categoryOrder: HighlightCategory[] = ['Architecture', 'Leadership', 'Impact', 'Delivery'];

const categoryStyle: Record<HighlightCategory, string> = {
  Architecture: 'border-primary/30 bg-primary/10 text-primary-light',
  Leadership: 'border-secondary/30 bg-secondary/10 text-secondary',
  Impact: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
  Delivery: 'border-foreground/15 text-foreground/60',
};

export default function CareerPage() {
  return (
    <div className="section-padding">
      <div className="container-narrow max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary-light">Career</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Career Journey</h1>
        <p className="mt-4 text-foreground/70">
          {personal.experienceLabel} delivering enterprise Android applications for global banking and retail
          brands — each role&apos;s contributions grouped by architecture, leadership and measured impact.
        </p>

        <div className="mt-12 space-y-8">
          {experience.map((entry) => {
            const grouped = categoryOrder
              .map((category) => ({
                category,
                items: entry.highlights.filter((h) => categorize(h) === category),
              }))
              .filter((group) => group.items.length > 0);

            return (
              <Card key={`${entry.company}-${entry.role}`}>
                <CardHeader>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h2 className="text-lg font-bold text-foreground">{entry.role}</h2>
                    {entry.period && (
                      <span className="rounded-full bg-secondary/15 px-3 py-1 font-mono text-xs font-semibold text-secondary">
                        {entry.period}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-primary-light">
                    <span className="font-semibold">{entry.company}</span>
                    {entry.client && <span className="text-foreground/50">Client: {entry.client}</span>}
                    {entry.location && (
                      <span className="flex items-center gap-1 text-foreground/50">
                        <MapPin className="h-3.5 w-3.5" />
                        {entry.location}
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-5">
                  {grouped.map((group) => (
                    <div key={group.category}>
                      <Badge className={categoryStyle[group.category]} variant="outline">
                        {group.category}
                      </Badge>
                      <ul className="mt-3 space-y-2">
                        {group.items.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm text-foreground/70">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  <div className="flex flex-wrap gap-2 border-t border-foreground/10 pt-4">
                    {entry.tech.map((tech) => (
                      <Badge key={tech} variant="muted">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
