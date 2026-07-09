import type { Metadata } from 'next';
import { getArchitectureTopics } from '@/content/architecture';
import TopicList from '@/components/docs/TopicList';

export const metadata: Metadata = {
  title: 'Android Architecture',
  description:
    'Clean Architecture, MVVM, MVI, dependency injection and modularization — with enterprise banking examples, pros/cons, and interview questions.',
};

export default function ArchitecturePage() {
  return (
    <TopicList
      eyebrow="Documentation"
      title="Android Architecture"
      description="How to structure Android applications so they stay testable, maintainable and safe to change — grounded in real patterns used to build banking and fintech apps at scale."
      basePath="/architecture"
      topics={getArchitectureTopics()}
    />
  );
}
