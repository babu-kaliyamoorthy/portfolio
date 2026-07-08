'use client';

import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { education } from '@/data/resume';

export default function Education() {
  return (
    <section id="education" className="section-padding relative">
      <div className="container-narrow">
        <SectionHeading eyebrow="Academic Background" title="Education" />

        <div className="mx-auto mt-14 grid max-w-2xl gap-5 sm:grid-cols-2">
          {education.map((entry, index) => (
            <motion.div
              key={entry.degree}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className="card-surface flex flex-col items-center gap-4 rounded-2xl p-8 text-center"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-glow">
                <GraduationCap className="h-6 w-6" />
              </div>
              <h3 className="text-base font-semibold text-foreground sm:text-lg">{entry.degree}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
