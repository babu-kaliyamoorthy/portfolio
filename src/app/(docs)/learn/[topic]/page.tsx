import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLearningTopic, getLearningSlugs } from '@/content/learn';
import TopicDetail from '@/components/docs/TopicDetail';

export function generateStaticParams() {
  return getLearningSlugs().map((topic) => ({ topic }));
}

export function generateMetadata({ params }: { params: { topic: string } }): Metadata {
  const topic = getLearningTopic(params.topic);
  if (!topic) return {};
  return { title: topic.title, description: topic.summary };
}

export default function LearningTopicPage({ params }: { params: { topic: string } }) {
  const topic = getLearningTopic(params.topic);
  if (!topic) notFound();

  return <TopicDetail topic={topic} basePath="/learn" resolveRelated={getLearningTopic} />;
}
