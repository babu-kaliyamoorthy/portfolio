import type { Metadata } from 'next';
import { getSecurityTopics } from '@/content/security';
import TopicList from '@/components/docs/TopicList';

export const metadata: Metadata = {
  title: 'Android Security',
  description: 'SSL pinning, OAuth, biometric authentication, encrypted storage, root detection and session security for banking-grade Android apps.',
};

export default function SecurityPage() {
  return (
    <TopicList
      eyebrow="Documentation"
      title="Android Security"
      description="How production banking apps actually protect data in transit, at rest, and against a compromised device — not just the theory."
      basePath="/security"
      topics={getSecurityTopics()}
    />
  );
}
