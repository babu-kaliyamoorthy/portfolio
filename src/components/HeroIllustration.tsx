'use client';

import { motion } from 'framer-motion';
import { AndroidIcon, ComposeIcon, HiltIcon, KotlinIcon, MvvmIcon } from '@/components/icons/TechIcons';

const badges = [
  { Icon: KotlinIcon, label: 'Kotlin', className: '-left-6 top-10 sm:-left-10', delay: 0, anim: 'animate-float' },
  { Icon: ComposeIcon, label: 'Compose', className: '-right-4 top-4 sm:-right-8', delay: 0.4, anim: 'animate-float-delayed' },
  { Icon: AndroidIcon, label: 'Android', className: 'left-0 bottom-24 sm:-left-14', delay: 0.8, anim: 'animate-float-slow' },
  { Icon: HiltIcon, label: 'Hilt', className: 'right-0 bottom-32 sm:-right-12', delay: 1.2, anim: 'animate-float' },
  { Icon: MvvmIcon, label: 'MVVM', className: 'left-1/2 bottom-0 -translate-x-1/2 sm:-bottom-6', delay: 1.6, anim: 'animate-float-delayed' },
];

export default function HeroIllustration() {
  return (
    <div className="relative mx-auto flex h-[420px] w-full max-w-sm items-center justify-center sm:h-[480px]">
      <div className="absolute h-72 w-72 animate-blob rounded-full bg-primary/25 blur-3xl sm:h-96 sm:w-96" />
      <div className="absolute h-56 w-56 animate-blob rounded-full bg-secondary/15 blur-3xl [animation-delay:3s] sm:h-72 sm:w-72" />

      <motion.div
        initial={{ opacity: 0, y: 40, rotate: -4 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 h-[360px] w-[190px] rounded-[2.2rem] border-4 border-foreground/15 bg-gradient-to-b from-foreground/[0.06] to-transparent p-2 shadow-2xl shadow-primary/20 backdrop-blur-xl sm:h-[400px] sm:w-[210px]"
      >
        <div className="absolute left-1/2 top-2 h-1.5 w-12 -translate-x-1/2 rounded-full bg-foreground/20" />
        <div className="h-full w-full overflow-hidden rounded-[1.6rem] bg-[#070b1d]">
          <div className="flex h-9 items-center justify-between px-4 pt-3 text-[10px] text-white/50">
            <span>9:41</span>
            <span className="h-2 w-2 rounded-full bg-primary" />
          </div>
          <div className="space-y-3 px-4 pt-4">
            <div className="h-3 w-2/3 rounded-full bg-white/10" />
            <div className="h-3 w-1/2 rounded-full bg-white/10" />
            <div className="mt-4 h-20 w-full rounded-xl border border-primary/30 bg-gradient-to-br from-primary/20 to-secondary/10" />
            <div className="grid grid-cols-2 gap-2">
              <div className="h-14 rounded-lg bg-white/[0.06]" />
              <div className="h-14 rounded-lg bg-white/[0.06]" />
            </div>
            <div className="space-y-2 pt-2">
              <div className="h-2.5 w-full rounded-full bg-white/[0.08]" />
              <div className="h-2.5 w-4/5 rounded-full bg-white/[0.08]" />
              <div className="h-2.5 w-3/5 rounded-full bg-white/[0.08]" />
            </div>
          </div>
        </div>
      </motion.div>

      {badges.map(({ Icon, label, className, delay, anim }) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 + delay * 0.2, ease: [0.16, 1, 0.3, 1] }}
          className={`absolute z-20 ${className} ${anim}`}
        >
          <div className="flex items-center gap-2 rounded-2xl border border-foreground/10 bg-surface/80 px-3 py-2 shadow-card backdrop-blur-md">
            <Icon className="h-5 w-5" />
            <span className="text-xs font-medium text-foreground/80">{label}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
