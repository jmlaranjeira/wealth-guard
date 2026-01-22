'use client';

import { Target, PieChart, TrendingUp, Upload, Home } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useStore } from '@/lib/store';

const tabs = [
  { id: 'overview', label: 'Resumen', icon: Target, href: '/' },
  { id: 'distribution', label: 'Distribucion', icon: PieChart, href: '/?tab=distribution' },
  { id: 'history', label: 'Evolucion', icon: TrendingUp, href: '/?tab=history' },
  { id: 'upload', label: 'Cargar Datos', icon: Upload, href: '/?tab=upload' },
  { id: 'property', label: 'Portugal', icon: Home, href: '/property' },
];

export function Navigation() {
  const pathname = usePathname();
  const { activeTab, setActiveTab } = useStore();

  const isPropertyPage = pathname === '/property';

  return (
    <nav className="flex gap-1 mb-6 bg-slate-800/30 p-1 rounded-xl w-fit overflow-x-auto">
      {tabs.map((tab) => {
        const isActive = isPropertyPage
          ? tab.id === 'property'
          : tab.id === activeTab && !isPropertyPage;

        if (tab.id === 'property') {
          return (
            <Link
              key={tab.id}
              href={tab.href}
              className={cn(
                'px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-all whitespace-nowrap',
                isActive
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              )}
            >
              <tab.icon size={16} />
              <span className="hidden sm:inline">{tab.label}</span>
            </Link>
          );
        }

        return (
          <Link
            key={tab.id}
            href="/"
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-all whitespace-nowrap',
              isActive
                ? 'bg-emerald-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            )}
          >
            <tab.icon size={16} />
            <span className="hidden sm:inline">{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
