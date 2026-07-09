import type { Metadata } from 'next';
import { personal } from '@/data/resume';
import Contact from '@/components/Contact';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Get in touch with ${personal.name} for senior Android roles, consulting engagements and architecture reviews.`,
};

export default function ContactPage() {
  return <Contact />;
}
