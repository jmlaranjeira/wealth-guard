import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'success' | 'warning' | 'danger';
}

export function Card({ children, className, variant = 'default' }: CardProps) {
  const variantClasses = {
    default: 'from-slate-800/50 to-slate-900/50 border-slate-700/50',
    success: 'from-emerald-900/30 to-slate-900/50 border-emerald-600/50',
    warning: 'from-amber-900/30 to-slate-900/50 border-amber-600/50',
    danger: 'from-red-900/30 to-slate-900/50 border-red-600/50',
  };

  return (
    <div
      className={cn(
        'bg-gradient-to-br rounded-2xl p-5 border',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  title: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export function CardHeader({ title, icon, action }: CardHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        {icon && <span className="text-emerald-400">{icon}</span>}
        <span className="text-slate-400 text-sm">{title}</span>
      </div>
      {action}
    </div>
  );
}

interface CardValueProps {
  value: string | number;
  subtitle?: string;
  subtitleColor?: 'default' | 'success' | 'danger';
}

export function CardValue({ value, subtitle, subtitleColor = 'default' }: CardValueProps) {
  const subtitleColors = {
    default: 'text-slate-400',
    success: 'text-emerald-400',
    danger: 'text-red-400',
  };

  return (
    <div>
      <p className="text-3xl font-light">{value}</p>
      {subtitle && (
        <p className={cn('text-sm mt-1', subtitleColors[subtitleColor])}>{subtitle}</p>
      )}
    </div>
  );
}
