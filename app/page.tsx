'use client';

import { useEffect, useCallback } from 'react';
import { Header } from '@/components/layout/Header';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { KPICards } from '@/components/dashboard/KPICards';
import { GoalsProgress } from '@/components/dashboard/GoalsProgress';
import { PricesPanel } from '@/components/dashboard/PricesPanel';
import { DistributionChart } from '@/components/dashboard/DistributionChart';
import { HistoryChart } from '@/components/dashboard/HistoryChart';
import { UploadPanel } from '@/components/dashboard/UploadPanel';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/lib/store';
import {
  calculateDistribution,
  calculateTotals,
  calculateGoalProgress,
  needsRebalancing,
} from '@/lib/calculations';
import type { PriceData } from '@/types';

export default function Home() {
  const {
    transactions,
    history,
    prices,
    pricesLoading,
    pricesError,
    activeTab,
    setPrices,
    setPricesLoading,
    setPricesError,
    loadDemoData,
  } = useStore();

  const fetchPrices = useCallback(async () => {
    setPricesLoading(true);
    setPricesError(null);

    try {
      const response = await fetch('/api/prices');
      if (!response.ok) throw new Error('Failed to fetch prices');

      const data: Record<string, PriceData> = await response.json();
      setPrices(data);
    } catch (error) {
      console.error('Error fetching prices:', error);
      setPricesError('Error al obtener cotizaciones');
    } finally {
      setPricesLoading(false);
    }
  }, [setPrices, setPricesLoading, setPricesError]);

  useEffect(() => {
    fetchPrices();
  }, [fetchPrices]);

  const distribution = calculateDistribution(transactions);
  const totals = calculateTotals(history);
  const goals = calculateGoalProgress(totals.totalValue);
  const needsRebalance = needsRebalancing(distribution);

  const hasData = transactions.length > 0 || history.length > 0;

  return (
    <div className="min-h-screen p-4 md:p-8">
      <Header onRefresh={fetchPrices} isRefreshing={pricesLoading} />
      <Navigation />

      <main className="space-y-6">
        {!hasData && (
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-8 border border-slate-700/50 text-center">
            <h2 className="text-xl font-medium mb-2">Bienvenido a Wealth Guard</h2>
            <p className="text-slate-400 mb-4">
              Aun no tienes datos cargados. Puedes cargar tus transacciones desde
              Excel/CSV o cargar datos de ejemplo.
            </p>
            <div className="flex gap-4 justify-center">
              <Button variant="primary" onClick={loadDemoData}>
                Cargar datos de ejemplo
              </Button>
            </div>
          </div>
        )}

        {activeTab === 'overview' && hasData && (
          <>
            <KPICards
              totalValue={totals.totalValue}
              totalContributed={totals.totalContributed}
              totalReturn={totals.totalReturn}
              returnPercent={totals.returnPercent}
              needsRebalancing={needsRebalance}
            />
            <GoalsProgress goals={goals} />
            <PricesPanel
              prices={prices}
              loading={pricesLoading}
              error={pricesError}
            />
          </>
        )}

        {activeTab === 'distribution' && hasData && (
          <DistributionChart distribution={distribution} />
        )}

        {activeTab === 'history' && hasData && (
          <HistoryChart
            history={history}
            totalValue={totals.totalValue}
            totalContributed={totals.totalContributed}
            totalReturn={totals.totalReturn}
            returnPercent={totals.returnPercent}
          />
        )}

        {activeTab === 'upload' && <UploadPanel />}
      </main>

      <Footer />
    </div>
  );
}
