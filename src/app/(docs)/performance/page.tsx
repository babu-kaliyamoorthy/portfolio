import type { Metadata } from 'next';
import { getPerformanceTopics } from '@/content/performance';
import TopicList from '@/components/docs/TopicList';

export const metadata: Metadata = {
  title: 'Android Performance',
  description: 'ANRs, memory leaks, Compose recomposition, startup time, Baseline Profiles, APK size and benchmarking.',
};

export default function PerformancePage() {
  return (
    <TopicList
      eyebrow="Documentation"
      title="Android Performance"
      description="Diagnosing and fixing the performance problems that actually show up in production banking apps, with the tools that measure them."
      basePath="/performance"
      topics={getPerformanceTopics()}
    />
  );
}
