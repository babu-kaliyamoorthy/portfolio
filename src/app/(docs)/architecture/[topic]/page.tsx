import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArchitectureTopic, getArchitectureSlugs } from '@/content/architecture';
import TopicDetail from '@/components/docs/TopicDetail';

export function generateStaticParams() {
  return getArchitectureSlugs().map((topic) => ({ topic }));
}

export function generateMetadata({ params }: { params: { topic: string } }): Metadata {
  const topic = getArchitectureTopic(params.topic);
  if (!topic) return {};
  return { title: topic.title, description: topic.summary };
}

export default function ArchitectureTopicPage({ params }: { params: { topic: string } }) {
  const topic = getArchitectureTopic(params.topic);
  if (!topic) notFound();

  return (
    <TopicDetail
      topic={topic}
      basePath="/architecture"
      backLabel="Architecture"
      resolveRelated={getArchitectureTopic}
    />
  );
}
