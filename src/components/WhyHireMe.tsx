'use client';

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { whyHireMe } from '@/data/resume';

export default function WhyHireMe() {
  return (
    <section id="why-hire-me" className="section-padding relative bg-gradient-to-b from-transparent via-primary/[0.04] to-transparent">
      <div className="container-narrow">
        <SectionHeading
          eyebrow="The Value I Bring"
          title="Why Hire Me"
          description="A blend of deep technical expertise, architectural leadership and enterprise delivery experience."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyHireMe.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex gap-4 rounded-2xl border border-foreground/5 bg-foreground/[0.02] p-6 transition-colors hover:border-primary/30 hover:bg-primary/[0.04]"
            >
              <CheckCircle2 className="h-6 w-6 shrink-0 text-secondary" />
              <div>
                <h3 className="font-semibold text-foreground">{reason.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground/65">{reason.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
