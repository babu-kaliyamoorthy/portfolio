import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Topic } from '@/types/content';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function TopicList({
  eyebrow,
  title,
  description,
  basePath,
  topics,
}: {
  eyebrow: string;
  title: string;
  description: string;
  basePath: string;
  topics: Topic[];
}) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary-light">{eyebrow}</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
      <p className="mt-4 max-w-2xl text-foreground/70">{description}</p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {topics.map((topic) => (
          <Link key={topic.slug} href={`${basePath}/${topic.slug}`}>
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
