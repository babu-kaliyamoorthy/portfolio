import type { HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium tracking-wide',
  {
    variants: {
      variant: {
        default: 'border-primary/30 bg-primary/10 text-primary-light',
        secondary: 'border-secondary/30 bg-secondary/10 text-secondary',
        outline: 'border-foreground/15 text-foreground/70',
        muted: 'border-foreground/10 bg-foreground/5 text-foreground/50',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
