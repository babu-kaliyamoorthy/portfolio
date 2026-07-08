'use client';

import { motion } from 'framer-motion';
import { Building2, Code2, Sparkles } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { about } from '@/data/resume';

const highlights = [
  { icon: Code2, label: 'Kotlin · Compose · MVVM' },
  { icon: Building2, label: 'Banking & FinTech at Scale' },
  { icon: Sparkles, label: 'Architecture & Mentorship' },
];

export default function About() {
  return (
    <section id="about" className="section-padding relative">
      <div className="container-narrow">
        <SectionHeading eyebrow="Get To Know Me" title={about.title} />

        <div className="mt-16 grid gap-12 lg:grid-cols-5 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative lg:col-span-2"
          >
            <div className="relative mx-auto max-w-xs">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/30 to-secondary/20 blur-2xl" />
              <div className="card-surface relative rounded-3xl p-8">
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-2xl font-bold text-white shadow-glow">
                    BK
                  </div>
                  <p className="font-mono text-sm text-primary-light">Senior Android Engineer</p>
                  <div className="grid w-full grid-cols-1 gap-2 pt-2">
                    {highlights.map(({ icon: Icon, label }) => (
                      <div
                        key={label}
                        className="flex items-center gap-3 rounded-xl border border-foreground/5 bg-foreground/[0.03] px-3 py-2.5 text-left text-sm text-foreground/70"
                      >
                        <Icon className="h-4 w-4 shrink-0 text-secondary" />
                        {label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="space-y-5 lg:col-span-3"
          >
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-base leading-relaxed sm:text-lg">
                {paragraph}
              </p>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
