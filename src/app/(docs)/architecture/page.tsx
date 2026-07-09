import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getArchitectureTopics } from '@/content/architecture';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Android Architecture',
  description:
    'Clean Architecture, MVVM, MVI, dependency injection and modularization — with enterprise banking examples, pros/cons, and interview questions.',
};

export default function ArchitecturePage() {
  const topics = getArchitectureTopics();

  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary-light">Documentation</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Android Architecture</h1>
      <p className="mt-4 max-w-2xl text-foreground/70">
        How to structure Android applications so they stay testable, maintainable and safe to change — grounded in
        real patterns used to build banking and fintech apps at scale.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {topics.map((topic) => (
          <Link key={topic.slug} href={`/architecture/${topic.slug}`}>
            <Card className="group h-full transition-colors hover:border-primary/40">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {topic.title}
                  <ArrowRight className="h-4 w-4 text-foreground/30 transition-transform group-hover:translate-x-1 group-hover:text-primary-light" />
                </CardTitle>
                <CardDescription>{topic.summary}</CardDescription>
              </CardHeader>
              {topic.tech && (
                <CardContent className="flex flex-wrap gap-2">
                  {topic.tech.map((tech) => (
                    <Badge key={tech} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </CardContent>
              )}
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
