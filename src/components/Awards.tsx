'use client';

import { motion } from 'framer-motion';
import { Award as AwardIcon } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { awards } from '@/data/resume';

export default function Awards() {
  return (
    <section id="awards" className="section-padding relative overflow-hidden">
      <div className="absolute left-1/2 top-0 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-secondary/10 blur-[110px]" aria-hidden />

      <div className="container-narrow">
        <SectionHeading
          eyebrow="Recognition"
          title="Awards & Recognition"
          description="Recognized by employers for consistent impact and engineering excellence."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {awards.map((award, index) => (
            <motion.div
              key={`${award.title}-${award.organization}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className="card-surface flex flex-col items-center gap-3 rounded-2xl p-7 text-center"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary to-primary text-white shadow-glow-amber">
                <AwardIcon className="h-6 w-6" />
              </div>
              <h3 className="text-base font-semibold text-foreground">{award.title}</h3>
              <p className="text-sm text-foreground/60">{award.organization}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
