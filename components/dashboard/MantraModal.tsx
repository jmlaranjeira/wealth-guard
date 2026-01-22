'use client';

import type { Mantra } from '@/types';
import { cn } from '@/lib/utils';

interface MantraModalProps {
  show: boolean;
  mantra: Mantra | null;
  onClose: () => void;
}

export function MantraModal({ show, mantra }: MantraModalProps) {
  if (!show || !mantra) return null;

  return (
    <div
      className={cn(
        'mt-4 p-4 bg-gradient-to-r from-emerald-900/30 to-slate-800/30 rounded-xl border border-emerald-600/20',
        'animate-pulse'
      )}
    >
      <p className="text-emerald-300 italic text-center">
        &quot;{mantra.text}&quot;
      </p>
    </div>
  );
}
