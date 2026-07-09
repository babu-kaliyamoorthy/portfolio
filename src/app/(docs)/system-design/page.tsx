import type { Metadata } from 'next';
import { getSystemDesignTopics } from '@/content/system-design';
import TopicList from '@/components/docs/TopicList';

export const metadata: Metadata = {
  title: 'System Design',
  description: 'How a banking app fits into the larger system - payments, notifications, deep links, feature flags and microservices integration.',
};

export default function SystemDesignPage() {
  return (
    <TopicList
      eyebrow="Documentation"
      title="System Design"
      description="End-to-end system design for banking apps — where the client's responsibility ends and the backend's begins, and how the pieces actually fit together."
      basePath="/system-design"
      topics={getSystemDesignTopics()}
    />
  );
}
