import type { Metadata } from 'next';
import { Star } from 'lucide-react';
import { personal } from '@/data/resume';
import { getPublicRepos } from '@/lib/github';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Open Source',
  description: `Public GitHub repositories from ${personal.name}.`,
};

export default async function OpenSourcePage() {
  const username = personal.github.split('/').filter(Boolean).pop() ?? '';
  const repos = await getPublicRepos(username);

  return (
    <div className="section-padding">
      <div className="container-narrow max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary-light">Open Source</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Public Repositories</h1>
        <p className="mt-4 text-foreground/70">
          Live from GitHub — pulled directly from the GitHub API at build time, not hand-maintained.
        </p>

        {repos.length === 0 ? (
          <div className="mt-12 card-surface rounded-2xl p-8 text-center">
            <p className="text-foreground/70">
              No public repositories to show right now — check the GitHub profile directly for the latest.
            </p>
            <Button asChild className="mt-5">
              <a href={personal.github} target="_blank" rel="noreferrer">
                View GitHub Profile
              </a>
            </Button>
          </div>
        ) : (
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {repos.map((repo) => (
              <a key={repo.name} href={repo.htmlUrl} target="_blank" rel="noreferrer">
                <Card className="group h-full transition-colors hover:border-primary/40">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between gap-2">
                      <span className="truncate">{repo.name}</span>
                      {repo.stars > 0 && (
                        <span className="flex shrink-0 items-center gap-1 text-xs font-normal text-foreground/50">
                          <Star className="h-3.5 w-3.5" />
                          {repo.stars}
                        </span>
                      )}
                    </CardTitle>
                    <CardDescription>{repo.description ?? 'No description provided.'}</CardDescription>
                  </CardHeader>
                  {repo.language && (
                    <CardContent>
                      <Badge variant="outline">{repo.language}</Badge>
                    </CardContent>
                  )}
                </Card>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
