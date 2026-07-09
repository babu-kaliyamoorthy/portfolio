import type { Metadata } from 'next';
import { getLearningTopics } from '@/content/learn';
import TopicList from '@/components/docs/TopicList';

export const metadata: Metadata = {
  title: 'Android Learning Hub',
  description: 'Kotlin Coroutines, Flow, Compose, Room, WorkManager, Paging, Testing and Animations - Android fundamentals.',
};

export default function LearnPage() {
  return (
    <TopicList
      eyebrow="Documentation"
      title="Android Learning Hub"
      description="The framework and language fundamentals underneath the Architecture and Performance sections — Coroutines, Flow, Compose, Room, WorkManager, Paging, Testing and Animations."
      basePath="/learn"
      topics={getLearningTopics()}
    />
  );
}
