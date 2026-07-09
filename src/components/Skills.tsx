'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Blocks,
  Boxes,
  Code2,
  FlaskConical,
  GitMerge,
  Layers,
  Network,
  Syringe,
  Wrench,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { skills } from '@/data/resume';

const categoryIcons: Record<string, LucideIcon> = {
  Languages: Code2,
  Architecture: Layers,
  Jetpack: Blocks,
  Networking: Network,
  Async: Zap,
  'Dependency Injection': Syringe,
  Testing: FlaskConical,
  'CI/CD': GitMerge,
  Tools: Wrench,
};

export default function Skills() {
  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      <div className="absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" aria-hidden />

      <div className="container-narrow">
        <SectionHeading
          eyebrow="Technical Toolbox"
          title="Skills &amp; Technologies"
          description="A comprehensive toolkit built over 13+ years of shipping production Android applications."
        />

        <div className="mt-6 text-center">
          <Link
            href="/skills"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary-light transition-colors hover:text-primary"
          >
            See each skill in depth
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, index) => {
            const Icon = categoryIcons[group.category] ?? Boxes;
            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6 }}
                className="card-surface group rounded-2xl p-6 transition-shadow hover:shadow-glow"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary-light transition-colors group-hover:bg-primary group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mb-3 text-lg font-semibold text-foreground">{group.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-foreground/10 bg-foreground/[0.04] px-3 py-1 text-xs font-medium text-foreground/70"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
