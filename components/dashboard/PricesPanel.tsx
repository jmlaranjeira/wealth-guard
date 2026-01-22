'use client';

import { Zap, TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { ETFS } from '@/lib/constants';
import type { PriceData } from '@/types';
import { formatNumber } from '@/lib/utils';

interface PricesPanelProps {
  prices: Record<string, PriceData>;
  loading?: boolean;
  error?: string | null;
}

export function PricesPanel({ prices, loading, error }: PricesPanelProps) {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
        <Zap size={20} className="text-emerald-400" />
        Cotizaciones en Tiempo Real
      </h2>

      {error && (
        <p className="text-red-400 text-sm mb-4">{error}</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {ETFS.map((etf) => {
          const priceData = prices[etf.name];

          if (loading || !priceData) {
            return (
              <div
                key={etf.isin}
                className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/30"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: etf.color }}
                  />
                  <span className="text-sm font-medium">{etf.name}</span>
                </div>
                <Skeleton className="h-8 w-24 mb-2" />
                <Skeleton className="h-4 w-20" />
              </div>
            );
          }

          const isPositive = priceData.change >= 0;

          return (
            <div
              key={etf.isin}
              className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/30"
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: etf.color }}
                />
                <span className="text-sm font-medium">{etf.name}</span>
              </div>
              <p className="text-2xl font-light">
                {formatNumber(priceData.price)}
                {priceData.currency === 'EUR' ? ' EUR' : ` ${priceData.currency}`}
              </p>
              <p
                className={`text-sm flex items-center gap-1 ${
                  isPositive ? 'text-emerald-400' : 'text-red-400'
                }`}
              >
                {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {isPositive ? '+' : ''}
                {formatNumber(priceData.change)} ({formatNumber(priceData.changePercent)}%)
              </p>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-slate-500 mt-4 text-center">
        * Precios con retraso de 15 minutos. Ultima actualizacion:{' '}
        {prices[ETFS[0].name]?.lastUpdated || '-'}
      </p>
    </Card>
  );
}
