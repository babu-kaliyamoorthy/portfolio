import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getSolidPrinciple, getSolidSlugs } from '@/content/solid';
import TopicDetail from '@/components/docs/TopicDetail';

export function generateStaticParams() {
  return getSolidSlugs().map((principle) => ({ principle }));
}

export function generateMetadata({ params }: { params: { principle: string } }): Metadata {
  const topic = getSolidPrinciple(params.principle);
  if (!topic) return {};
  return { title: topic.title, description: topic.summary };
}

export default function SolidPrinciplePage({ params }: { params: { principle: string } }) {
  const topic = getSolidPrinciple(params.principle);
  if (!topic) notFound();

  return <TopicDetail topic={topic} basePath="/solid" resolveRelated={getSolidPrinciple} />;
}
