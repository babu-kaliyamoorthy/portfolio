import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPerformanceTopic, getPerformanceSlugs } from '@/content/performance';
import TopicDetail from '@/components/docs/TopicDetail';

export function generateStaticParams() {
  return getPerformanceSlugs().map((topic) => ({ topic }));
}

export function generateMetadata({ params }: { params: { topic: string } }): Metadata {
  const topic = getPerformanceTopic(params.topic);
  if (!topic) return {};
  return { title: topic.title, description: topic.summary };
}

export default function PerformanceTopicPage({ params }: { params: { topic: string } }) {
  const topic = getPerformanceTopic(params.topic);
  if (!topic) notFound();

  return <TopicDetail topic={topic} basePath="/performance" resolveRelated={getPerformanceTopic} />;
}
