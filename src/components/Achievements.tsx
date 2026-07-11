'use client';

import { motion } from 'framer-motion';
import { Award, Boxes, TrendingUp, UserCheck, Workflow, type LucideIcon } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import AnimatedCounter from '@/components/AnimatedCounter';
import { achievements, type Achievement } from '@/data/resume';

const iconMap: Record<Achievement['icon'], LucideIcon> = {
  trend: TrendingUp,
  feature: Workflow,
  modularization: Boxes,
  mentor: UserCheck,
  recognition: Award,
};

export default function Achievements() {
  return (
    <section id="achievements" className="section-padding relative overflow-hidden">
      <div className="absolute right-0 top-1/3 -z-10 h-80 w-80 rounded-full bg-secondary/10 blur-[100px]" aria-hidden />

      <div className="container-narrow">
        <SectionHeading
          eyebrow="Impact"
          title="Achievements"
          description="Measurable outcomes delivered across enterprise banking and fintech engagements."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {achievements.map((achievement, index) => {
            const Icon = iconMap[achievement.icon];
            return (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6 }}
                className="card-surface relative overflow-hidden rounded-2xl p-7"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary-light">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-foreground">{achievement.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/65">{achievement.description}</p>

                {achievement.icon === 'trend' && (
                  <div className="mt-5 flex items-center gap-3 font-mono text-2xl font-bold">
                    <span className="text-foreground/40">95%</span>
                    <span className="text-secondary">&rarr;</span>
                    <span className="gradient-text">
                      <AnimatedCounter value="98" suffix="%" />
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
