'use client';

import { useEffect, useRef } from 'react';
import { animate, useInView, useMotionValue, useTransform } from 'framer-motion';

type AnimatedCounterProps = {
  value: string;
  suffix?: string;
};

export default function AnimatedCounter({ value, suffix = '' }: AnimatedCounterProps) {
  const numericValue = Number.parseInt(value, 10);
  const isNumeric = !Number.isNaN(numericValue);

  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => Math.round(latest));

  useEffect(() => {
    if (!inView || !isNumeric) return undefined;
    const controls = animate(motionValue, numericValue, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
  }, [inView, isNumeric, motionValue, numericValue]);

  useEffect(() => {
    if (!ref.current) return;
    const unsubscribe = rounded.on('change', (latest) => {
      if (ref.current) ref.current.textContent = `${latest}${suffix}`;
    });
    return () => unsubscribe();
  }, [rounded, suffix]);

  if (!isNumeric) {
    return <span>{value}</span>;
  }

  return <span ref={ref}>0{suffix}</span>;
}
