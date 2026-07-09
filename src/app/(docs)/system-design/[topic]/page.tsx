import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getSystemDesignTopic, getSystemDesignSlugs } from '@/content/system-design';
import TopicDetail from '@/components/docs/TopicDetail';

export function generateStaticParams() {
  return getSystemDesignSlugs().map((topic) => ({ topic }));
}

export function generateMetadata({ params }: { params: { topic: string } }): Metadata {
  const topic = getSystemDesignTopic(params.topic);
  if (!topic) return {};
  return { title: topic.title, description: topic.summary };
}

export default function SystemDesignTopicPage({ params }: { params: { topic: string } }) {
  const topic = getSystemDesignTopic(params.topic);
  if (!topic) notFound();

  return <TopicDetail topic={topic} basePath="/system-design" resolveRelated={getSystemDesignTopic} />;
}
