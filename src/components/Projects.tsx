'use client';

import { motion } from 'framer-motion';
import { Smartphone } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { projects } from '@/data/resume';

export default function Projects() {
  return (
    <section id="projects" className="section-padding relative">
      <div className="container-narrow">
        <SectionHeading
          eyebrow="Key Projects"
          title="Domain Expertise"
          description="A selection of the enterprise mobile applications shipped across banking, retail and education."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className="card-surface flex items-start gap-4 rounded-2xl p-6"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary-light">
                <Smartphone className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{project.name}</h3>
                <p className="mt-1 text-sm text-foreground/60">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
