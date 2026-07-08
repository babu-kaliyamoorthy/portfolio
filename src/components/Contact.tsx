'use client';

import { type FormEvent, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, MapPin, Send } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { personal } from '@/data/resume';

const contactLinks = [
  { icon: Mail, label: 'Email', value: personal.email, href: `mailto:${personal.email}` },
  { icon: Linkedin, label: 'LinkedIn', value: 'Connect on LinkedIn', href: personal.linkedin },
  { icon: Github, label: 'GitHub', value: 'View my code', href: personal.github },
  { icon: MapPin, label: 'Location', value: personal.location, href: undefined },
];

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sent'>('idle');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get('name') ?? '');
    const email = String(formData.get('email') ?? '');
    const message = String(formData.get('message') ?? '');

    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n—\n${name}\n${email}`);
    window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;

    setStatus('sent');
    event.currentTarget.reset();
  };

  return (
    <section id="contact" className="section-padding relative">
      <div className="container-narrow">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Let's Work Together"
          description="Open to senior Android roles, consulting engagements and architecture reviews."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4 lg:col-span-2"
          >
            {contactLinks.map(({ icon: Icon, label, value, href }) => {
              const content = (
                <div className="card-surface flex items-center gap-4 rounded-2xl p-5 transition-colors hover:border-primary/30 hover:bg-primary/[0.04]">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary-light">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-foreground/40">{label}</p>
                    <p className="text-sm font-medium text-foreground">{value}</p>
                  </div>
                </div>
              );

              return href ? (
                <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                  {content}
                </a>
              ) : (
                <div key={label}>{content}</div>
              );
            })}
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            onSubmit={handleSubmit}
            className="card-surface space-y-4 rounded-2xl p-7 lg:col-span-3"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-foreground/50">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full rounded-xl border border-foreground/10 bg-foreground/[0.03] px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary/50"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-foreground/50">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-xl border border-foreground/10 bg-foreground/[0.03] px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary/50"
                  placeholder="you@company.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-foreground/50">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="w-full resize-none rounded-xl border border-foreground/10 bg-foreground/[0.03] px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary/50"
                placeholder="Tell me about the opportunity..."
              />
            </div>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.01] active:scale-95 sm:w-auto"
            >
              <Send className="h-4 w-4" />
              Send Message
            </button>
            {status === 'sent' && (
              <p className="text-sm text-secondary">Your email client should now open with your message ready to send.</p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
