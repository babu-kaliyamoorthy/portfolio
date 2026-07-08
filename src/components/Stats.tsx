'use client';

import { motion } from 'framer-motion';
import AnimatedCounter from '@/components/AnimatedCounter';
import { stats } from '@/data/resume';

export default function Stats() {
  return (
    <section className="relative px-6 sm:px-10 lg:px-16">
      <div className="container-narrow -mt-4 mb-4">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="card-surface grid grid-cols-2 gap-6 rounded-3xl p-8 sm:grid-cols-3 sm:p-10 lg:grid-cols-5"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="text-center"
            >
              <div className="text-3xl font-extrabold text-foreground sm:text-4xl">
                {stat.isRange ? (
                  <span className="gradient-text">
                    {stat.rangeFrom} <span className="text-foreground/40">&rarr;</span> {stat.rangeTo}
                  </span>
                ) : (
                  <span className="gradient-text">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </span>
                )}
              </div>
              <p className="mt-2 text-xs font-medium uppercase tracking-wider text-foreground/50 sm:text-sm">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
