'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Download, Mail } from 'lucide-react';
import TypingAnimation from '@/components/TypingAnimation';
import HeroIllustration from '@/components/HeroIllustration';
import ParticlesBackground from '@/components/ParticlesBackground';
import { personal } from '@/data/resume';
import { withBasePath } from '@/lib/utils';

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-radial-fade pt-24"
    >
      <div className="noise-overlay absolute inset-0 opacity-40" aria-hidden />
      <div className="absolute inset-0 bg-grid-pattern bg-grid [mask-image:radial-gradient(ellipse_60%_60%_at_50%_20%,black,transparent)]" aria-hidden />
      <ParticlesBackground />

      <div className="container-narrow relative z-10 grid gap-12 px-6 sm:px-10 lg:grid-cols-2 lg:items-center lg:px-16">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p variants={item} className="mb-4 font-mono text-sm text-primary-light">
            Hello, I&apos;m
          </motion.p>

          <motion.h1 variants={item} className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {personal.name}
          </motion.h1>

          <motion.div variants={item} className="mt-3 h-10 text-xl font-semibold text-foreground/90 sm:text-2xl">
            <TypingAnimation words={personal.roles} className="gradient-text" />
          </motion.div>

          <motion.span
            variants={item}
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-4 py-1.5 text-sm font-medium text-secondary"
          >
            {personal.experienceLabel}
          </motion.span>

          <motion.p variants={item} className="mt-6 max-w-xl text-balance text-base leading-relaxed text-foreground/70 sm:text-lg">
            {personal.tagline}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href={withBasePath(personal.resumeFile)}
              download="Babu_Kaliyamoorthy_Resume.pdf"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.03] active:scale-95"
            >
              <Download className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
              Download Resume
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground/5 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/50 hover:bg-primary/10"
            >
              <Mail className="h-4 w-4" />
              Contact Me
            </a>
            <a
              href="#experience"
              className="inline-flex items-center gap-2 px-2 py-3 text-sm font-semibold text-foreground/70 transition-colors hover:text-foreground"
            >
              View Experience
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <HeroIllustration />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
      >
        <span className="text-xs uppercase tracking-[0.3em] text-foreground/40">Scroll</span>
        <div className="h-9 w-5 rounded-full border border-foreground/20 p-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="h-1.5 w-1.5 rounded-full bg-primary-light"
          />
        </div>
      </motion.div>
    </section>
  );
}
