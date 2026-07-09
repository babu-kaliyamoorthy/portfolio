import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Topic } from '@/types/content';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import MermaidDiagram from '@/components/docs/MermaidDiagram';
import CodeBlock from '@/components/docs/CodeBlock';

export default function TopicDetail({
  topic,
  basePath,
  backLabel,
  resolveRelated,
}: {
  topic: Topic;
  basePath: string;
  backLabel: string;
  resolveRelated?: (slug: string) => Topic | undefined;
}) {
  return (
    <article>
      <Link
        href={basePath}
        className="group mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground/60 transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back to {backLabel}
      </Link>

      <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary-light">{topic.category}</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{topic.title}</h1>
      <p className="mt-4 max-w-2xl text-foreground/70">{topic.summary}</p>

      {topic.tech && (
        <div className="mt-5 flex flex-wrap gap-2">
          {topic.tech.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>
      )}

      {topic.diagram && (
        <div className="mt-10">
          <MermaidDiagram chart={topic.diagram} caption={`${topic.title} diagram`} />
        </div>
      )}

      <div className="mt-10 space-y-8">
        {topic.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-xl font-semibold text-foreground">{section.heading}</h2>
            <div className="mt-3 space-y-3">
              {section.body.map((paragraph) => (
                <p key={paragraph} className="leading-relaxed text-foreground/70">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>

      {(topic.pros || topic.cons || topic.whenToUse) && (
        <>
          <Separator className="my-10" />
          <Tabs defaultValue="pros">
            <TabsList>
              {topic.pros && <TabsTrigger value="pros">Pros</TabsTrigger>}
              {topic.cons && <TabsTrigger value="cons">Cons</TabsTrigger>}
              {topic.whenToUse && <TabsTrigger value="when">When to use</TabsTrigger>}
            </TabsList>
            {topic.pros && (
              <TabsContent value="pros">
                <ul className="space-y-2">
                  {topic.pros.map((item) => (
                    <li key={item} className="flex gap-3 text-foreground/70">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </TabsContent>
            )}
            {topic.cons && (
              <TabsContent value="cons">
                <ul className="space-y-2">
                  {topic.cons.map((item) => (
                    <li key={item} className="flex gap-3 text-foreground/70">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </TabsContent>
            )}
            {topic.whenToUse && (
              <TabsContent value="when">
                <ul className="space-y-2">
                  {topic.whenToUse.map((item) => (
                    <li key={item} className="flex gap-3 text-foreground/70">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </TabsContent>
            )}
          </Tabs>
        </>
      )}

      {topic.enterpriseExample && (
        <>
          <Separator className="my-10" />
          <section>
            <h2 className="text-xl font-semibold text-foreground">Enterprise example</h2>
            <p className="mt-3 leading-relaxed text-foreground/70">{topic.enterpriseExample}</p>
          </section>
        </>
      )}

      {topic.codeSnippets && (
        <>
          <Separator className="my-10" />
          <section>
            <h2 className="text-xl font-semibold text-foreground">Code</h2>
            <div className="mt-4 space-y-5">
              {topic.codeSnippets.map((snippet) => (
                <CodeBlock key={snippet.title} title={snippet.title} language={snippet.language} code={snippet.code} />
              ))}
            </div>
          </section>
        </>
      )}

      {topic.interviewQuestions && (
        <>
          <Separator className="my-10" />
          <section>
            <h2 className="text-xl font-semibold text-foreground">Interview questions</h2>
            <Accordion type="single" collapsible className="mt-2">
              {topic.interviewQuestions.map((qa) => (
                <AccordionItem key={qa.question} value={qa.question}>
                  <AccordionTrigger>
                    <span className="flex items-center gap-3">
                      {qa.level && <Badge variant="secondary">{qa.level}</Badge>}
                      {qa.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>{qa.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        </>
      )}

      {resolveRelated && topic.relatedSlugs && topic.relatedSlugs.length > 0 && (
        <>
          <Separator className="my-10" />
          <section>
            <h2 className="text-xl font-semibold text-foreground">Related topics</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {topic.relatedSlugs.map((slug) => {
                const related = resolveRelated(slug);
                if (!related) return null;
                return (
                  <Link
                    key={slug}
                    href={`${basePath}/${slug}`}
                    className="group flex items-center gap-2 rounded-full border border-foreground/10 px-4 py-2 text-sm font-medium text-foreground/70 transition-colors hover:border-primary/40 hover:text-foreground"
                  >
                    {related.title}
                    <ArrowRight className="h-3.5 w-3.5 text-foreground/30 transition-transform group-hover:translate-x-1 group-hover:text-primary-light" />
                  </Link>
                );
              })}
            </div>
          </section>
        </>
      )}
    </article>
  );
}
