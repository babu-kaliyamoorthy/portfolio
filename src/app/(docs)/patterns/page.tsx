import type { Metadata } from 'next';
import { getDesignPatterns } from '@/content/patterns';
import TopicList from '@/components/docs/TopicList';

export const metadata: Metadata = {
  title: 'Design Patterns',
  description: 'Classic design patterns with real Android examples, violation/fix code, and interview questions.',
};

export default function PatternsPage() {
  return (
    <TopicList
      eyebrow="Documentation"
      title="Design Patterns"
      description="Classic object-oriented patterns as they actually show up in Android code — where they earn their keep, and where Kotlin makes them unnecessary."
      basePath="/patterns"
      topics={getDesignPatterns()}
    />
  );
}
