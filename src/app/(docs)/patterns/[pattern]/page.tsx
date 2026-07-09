import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDesignPattern, getDesignPatternSlugs } from '@/content/patterns';
import TopicDetail from '@/components/docs/TopicDetail';

export function generateStaticParams() {
  return getDesignPatternSlugs().map((pattern) => ({ pattern }));
}

export function generateMetadata({ params }: { params: { pattern: string } }): Metadata {
  const topic = getDesignPattern(params.pattern);
  if (!topic) return {};
  return { title: topic.title, description: topic.summary };
}

export default function DesignPatternPage({ params }: { params: { pattern: string } }) {
  const topic = getDesignPattern(params.pattern);
  if (!topic) notFound();

  return <TopicDetail topic={topic} basePath="/patterns" resolveRelated={getDesignPattern} />;
}
