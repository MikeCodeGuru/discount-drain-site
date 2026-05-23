'use client';
import type React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type GradientBackgroundProps = React.ComponentProps<'div'> & {
  // Animation customization
  gradients?: string[];
  animationDuration?: number;
  animationDelay?: number;

  // Layout customization
  enableCenterContent?: boolean;

  // Visual customization
  overlay?: boolean;
  overlayOpacity?: number;
};

// V2 blue-palette gradients — tuned to match Discount Drain brand
const Default_Gradients = [
  "linear-gradient(135deg, #0a1628 0%, #0d47a1 50%, #1565c0 100%)",
  "linear-gradient(135deg, #0d1b2a 0%, #1976d2 50%, #0288d1 100%)",
  "linear-gradient(135deg, #001f3f 0%, #0055cc 50%, #0080ff 100%)",
  "linear-gradient(135deg, #0a1628 0%, #1565c0 40%, #0288d1 100%)",
  "linear-gradient(135deg, #001529 0%, #0d47a1 60%, #1976d2 100%)",
];

export function GradientBackground({
  children,
  className = '',
  gradients = Default_Gradients,
  animationDuration = 6,
  animationDelay = 0.3,
  overlay = false,
  overlayOpacity = 0.25,
}: GradientBackgroundProps) {
  return (
    <div className={cn('w-full relative overflow-hidden', className)}>
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0"
        style={{ background: gradients[0] }}
        animate={{ background: gradients }}
        transition={{
          delay: animationDelay,
          duration: animationDuration,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'easeInOut',
        }}
      />

      {/* Optional overlay */}
      {overlay && (
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      )}

      {/* Content wrapper */}
      {children && (
        <div className={cn('relative z-10')}>
          {children}
        </div>
      )}
    </div>
  );
}
