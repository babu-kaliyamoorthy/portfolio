import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getInterviewQuestionsByLevel } from '@/lib/interview-questions';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

export const metadata: Metadata = {
  title: 'Interview Preparation',
  description: 'Senior, lead and architect-level Android interview questions, pulled from real architecture, SOLID and design pattern discussions.',
};

const levelCopy: Record<string, { label: string; description: string }> = {
  senior: { label: 'Senior', description: 'Depth on the concept itself and its direct trade-offs.' },
  lead: { label: 'Lead', description: 'How you\'d catch, fix or teach this in a real team setting.' },
  architect: { label: 'Architect', description: 'Judgment calls — when the "right" answer is actually "it depends."' },
};

export default function InterviewPrepPage() {
  const groups = getInterviewQuestionsByLevel();

  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary-light">Documentation</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Interview Preparation</h1>
      <p className="mt-4 max-w-2xl text-foreground/70">
        Every interview question from the Architecture, SOLID and Design Patterns sections, in one place —
        grouped by the level it&apos;s typically asked at.
      </p>

      <div className="mt-12 space-y-12">
        {groups.map(({ level, questions }, index) => {
          if (questions.length === 0) return null;
          const copy = levelCopy[level] ?? { label: level, description: '' };
          return (
            <section key={level}>
              {index > 0 && <Separator className="mb-12" />}
              <div className="flex items-center gap-3">
                <Badge>{copy.label}</Badge>
                <p className="text-sm text-foreground/50">{copy.description}</p>
              </div>

              <Accordion type="single" collapsible className="mt-6">
                {questions.map((q) => (
                  <AccordionItem key={`${q.topicHref}-${q.question}`} value={`${q.topicHref}-${q.question}`}>
                    <AccordionTrigger>{q.question}</AccordionTrigger>
                    <AccordionContent>
                      <p>{q.answer}</p>
                      <Link
                        href={q.topicHref}
                        className="group mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-primary-light transition-colors hover:text-primary"
                      >
                        From {q.topicTitle}
                        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          );
        })}
      </div>
    </div>
  );
}
