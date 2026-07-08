'use client';

import { motion } from 'framer-motion';
import { Briefcase, MapPin } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { experience } from '@/data/resume';

export default function Experience() {
  return (
    <section id="experience" className="section-padding relative">
      <div className="container-narrow">
        <SectionHeading
          eyebrow="Career Journey"
          title="Professional Experience"
          description="13+ years delivering enterprise Android applications for global banking and retail brands."
        />

        <div className="relative mt-16">
          <div className="absolute left-[19px] top-2 h-full w-px bg-gradient-to-b from-primary via-foreground/10 to-transparent sm:left-1/2 sm:-translate-x-1/2" />

          <div className="space-y-12">
            {experience.map((entry, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={`${entry.company}-${entry.role}`}
                  className={`relative flex flex-col gap-6 sm:flex-row sm:items-start ${
                    isEven ? 'sm:flex-row' : 'sm:flex-row-reverse'
                  }`}
                >
                  <div className="absolute left-0 top-1 z-10 flex h-10 w-10 items-center justify-center rounded-full border-4 border-background bg-primary shadow-glow sm:left-1/2 sm:-translate-x-1/2">
                    <Briefcase className="h-4 w-4 text-white" />
                  </div>

                  <div className="hidden flex-1 sm:block" />

                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 32 : -32 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="card-surface ml-14 flex-1 rounded-2xl p-6 sm:ml-0"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-lg font-bold text-foreground">{entry.role}</h3>
                      {entry.period && (
                        <span className="rounded-full bg-secondary/15 px-3 py-1 font-mono text-xs font-semibold text-secondary">
                          {entry.period}
                        </span>
                      )}
                    </div>

                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-primary-light">
                      <span className="font-semibold">{entry.company}</span>
                      {entry.client && <span className="text-foreground/50">Client: {entry.client}</span>}
                      {entry.location && (
                        <span className="flex items-center gap-1 text-foreground/50">
                          <MapPin className="h-3.5 w-3.5" />
                          {entry.location}
                        </span>
                      )}
                    </div>

                    <ul className="mt-4 space-y-2">
                      {entry.highlights.map((point) => (
                        <li key={point} className="flex items-start gap-2 text-sm text-foreground/70">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                          {point}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {entry.tech.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-foreground/10 bg-foreground/[0.04] px-3 py-1 text-xs font-medium text-foreground/60"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
