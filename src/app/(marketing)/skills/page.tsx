import type { Metadata } from 'next';
import { personal, skills } from '@/data/resume';
import { skillDetails } from '@/data/skill-details';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {
  title: 'Skills',
  description: `A detailed breakdown of ${personal.name}'s technical skills - what each is, why it matters, and how it's actually been used in production.`,
};

export default function SkillsPage() {
  return (
    <div className="section-padding">
      <div className="container-narrow max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary-light">Skills</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Technical Skills, In Depth</h1>
        <p className="mt-4 text-foreground/70">
          Not just a list of tags — what each skill actually means, why it matters in production banking apps,
          and where it’s genuinely been used.
        </p>

        <div className="mt-12 space-y-8">
          {skills.map((skillCategory) => {
            const detail = skillDetails[skillCategory.category];
            return (
              <Card key={skillCategory.category}>
                <CardHeader>
                  <CardTitle>{skillCategory.category}</CardTitle>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {skillCategory.skills.map((skill) => (
                      <Badge key={skill} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                {detail && (
                  <CardContent className="space-y-4">
                    <p className="text-sm leading-relaxed text-foreground/70">{detail.definition}</p>
                    <Separator />
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-foreground/40">
                        Why it matters
                      </p>
                      <p className="mt-1.5 text-sm leading-relaxed text-foreground/70">{detail.whyItMatters}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-foreground/40">
                        Real project usage
                      </p>
                      <p className="mt-1.5 text-sm leading-relaxed text-foreground/70">{detail.realProjectUsage}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-foreground/40">Example</p>
                      <p className="mt-1.5 text-sm leading-relaxed text-foreground/70">{detail.example}</p>
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
