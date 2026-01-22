import { cn } from '@/lib/utils';
import type { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'default' | 'primary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
}

export function Button({
  children,
  variant = 'default',
  size = 'md',
  icon,
  className,
  ...props
}: ButtonProps) {
  const variantClasses = {
    default:
      'bg-slate-800/50 hover:bg-slate-700/50 border-slate-700/50 text-slate-100',
    primary:
      'bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border-emerald-600/30',
    ghost: 'bg-transparent hover:bg-slate-800/50 border-transparent text-slate-400',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base',
  };

  return (
    <button
      className={cn(
        'rounded-lg flex items-center justify-center gap-2 transition-all border',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
