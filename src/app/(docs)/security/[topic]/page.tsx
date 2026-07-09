import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getSecurityTopic, getSecuritySlugs } from '@/content/security';
import TopicDetail from '@/components/docs/TopicDetail';

export function generateStaticParams() {
  return getSecuritySlugs().map((topic) => ({ topic }));
}

export function generateMetadata({ params }: { params: { topic: string } }): Metadata {
  const topic = getSecurityTopic(params.topic);
  if (!topic) return {};
  return { title: topic.title, description: topic.summary };
}

export default function SecurityTopicPage({ params }: { params: { topic: string } }) {
  const topic = getSecurityTopic(params.topic);
  if (!topic) notFound();

  return (
    <TopicDetail
      topic={topic}
      basePath="/security"
      backLabel="Android Security"
      resolveRelated={getSecurityTopic}
    />
  );
}
