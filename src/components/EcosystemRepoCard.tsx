'use client';

import { useState } from 'react';
import { Folder, FolderGit2 } from 'lucide-react';
import type { EcosystemRepo } from '@/data/ecosystem-repos';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const statusCopy: Record<EcosystemRepo['status'], string> = {
  available: 'Live',
  building: 'Building now — check back soon',
  'coming-soon': 'Coming soon',
};

export default function EcosystemRepoCard({ repo }: { repo: EcosystemRepo }) {
  const [showStatus, setShowStatus] = useState(false);
  const isAvailable = repo.status === 'available' && repo.githubUrl;

  const cardContent = (
    <Card className="group h-full transition-colors hover:border-primary/40">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          {isAvailable ? (
            <FolderGit2 className="h-4 w-4 shrink-0 text-primary-light" />
          ) : (
            <Folder className="h-4 w-4 shrink-0 text-foreground/40" />
          )}
          <span className="truncate">{repo.name}</span>
        </CardTitle>
        <CardDescription>{repo.description}</CardDescription>
        {isAvailable ? (
          <Badge className="w-fit">{statusCopy.available}</Badge>
        ) : (
          <Badge variant="muted" className="w-fit">
            {repo.status === 'building' ? 'Building' : 'Coming soon'}
          </Badge>
        )}
      </CardHeader>
    </Card>
  );

  if (isAvailable) {
    return (
      <a href={repo.githubUrl} target="_blank" rel="noreferrer">
        {cardContent}
      </a>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setShowStatus((prev) => !prev)}
        className="block w-full text-left"
        aria-expanded={showStatus}
      >
        {cardContent}
      </button>
      {showStatus && (
        <p className="mt-2 rounded-lg bg-foreground/5 px-3 py-2 text-xs text-foreground/60">
          🚧 {statusCopy[repo.status]}
        </p>
      )}
    </div>
  );
}
