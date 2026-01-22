'use client';

import { BookOpen, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/lib/store';
import { MantraModal } from '@/components/dashboard/MantraModal';

interface HeaderProps {
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export function Header({ onRefresh, isRefreshing }: HeaderProps) {
  const { showRandomMantra, showMantra, currentMantra, hideMantra } = useStore();

  return (
    <header className="mb-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-light tracking-tight">
            <span className="text-emerald-400">&#9670;</span> Wealth Guard
          </h1>
          <p className="text-slate-400 mt-1 text-sm">
            Tu cartera a largo plazo | Horizonte 10 anos
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={showRandomMantra} icon={<BookOpen size={16} />}>
            Manifiesto
          </Button>
          {onRefresh && (
            <Button
              variant="primary"
              onClick={onRefresh}
              icon={<RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />}
            >
              Actualizar
            </Button>
          )}
        </div>
      </div>

      <MantraModal
        show={showMantra}
        mantra={currentMantra}
        onClose={hideMantra}
      />
    </header>
  );
}
