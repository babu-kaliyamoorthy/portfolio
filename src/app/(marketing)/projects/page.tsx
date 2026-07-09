import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Smartphone } from 'lucide-react';
import { personal, projects } from '@/data/resume';
import { projectEnrichment } from '@/lib/project-links';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Projects',
  description: `Enterprise mobile applications ${personal.name} has shipped across banking, retail and education.`,
};

export default function ProjectsPage() {
  return (
    <div className="section-padding">
      <div className="container-narrow max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary-light">Projects</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Domain Expertise</h1>
        <p className="mt-4 text-foreground/70">
          Enterprise mobile applications shipped across banking, retail and education. Client engagements under
          NDA are described at the level of tech and approach, not internal implementation detail.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {projects.map((project) => {
            const enrichment = projectEnrichment[project.name];
            return (
              <Card key={project.name}>
                <CardHeader>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary-light">
                    <Smartphone className="h-5 w-5" />
                  </div>
                  <CardTitle className="mt-3">{project.name}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                {enrichment && (
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {enrichment.tech.map((tech) => (
                        <Badge key={tech} variant="outline">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex flex-col gap-2 border-t border-foreground/10 pt-4">
                      {enrichment.relatedDocs.map((doc) => (
                        <Link
                          key={doc.href}
                          href={doc.href}
                          className="group flex items-center gap-1.5 text-xs font-semibold text-primary-light transition-colors hover:text-primary"
                        >
                          {doc.label}
                          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
