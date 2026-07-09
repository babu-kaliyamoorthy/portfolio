import type { Metadata } from 'next';
import { getSolidPrinciples } from '@/content/solid';
import TopicList from '@/components/docs/TopicList';

export const metadata: Metadata = {
  title: 'SOLID Principles',
  description: 'The five SOLID principles with real Android violation/fix examples and interview questions.',
};

export default function SolidPage() {
  return (
    <TopicList
      eyebrow="Documentation"
      title="SOLID Principles"
      description="Five principles for object-oriented design that keep classes easy to change, test and extend — each with a real Android violation and its fix."
      basePath="/solid"
      topics={getSolidPrinciples()}
    />
  );
}
