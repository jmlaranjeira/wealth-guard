'use client';

import { Home, TrendingUp, Wallet, Calendar } from 'lucide-react';
import { Card, CardHeader, CardValue } from '@/components/ui/Card';
import { formatCurrency, formatPercent } from '@/lib/utils';
import type { Property, PropertySummary } from '@/types';

interface PropertyKPIsProps {
  property: Property;
  summary: PropertySummary;
}

export function PropertyKPIs({ property, summary }: PropertyKPIsProps) {
  const nextRentDate = new Date();
  nextRentDate.setMonth(nextRentDate.getMonth() + 1);
  nextRentDate.setDate(1);
  const daysUntilRent = Math.ceil(
    (nextRentDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader
          title="Valor Propiedad"
          icon={<Home size={20} />}
        />
        <CardValue
          value={formatCurrency(property.currentValue)}
          subtitle={`Compra: ${formatCurrency(property.purchasePrice)}`}
        />
      </Card>

      <Card variant={summary.annualYield >= 4 ? 'success' : 'default'}>
        <CardHeader
          title="Rentabilidad Anual"
          icon={<TrendingUp size={20} className="text-emerald-400" />}
        />
        <CardValue
          value={formatPercent(summary.annualYield)}
          subtitle="Neto sobre valor actual"
          subtitleColor={summary.annualYield >= 4 ? 'success' : 'default'}
        />
      </Card>

      <Card>
        <CardHeader
          title="Balance Neto"
          icon={<Wallet size={20} className="text-blue-400" />}
        />
        <CardValue
          value={formatCurrency(summary.netIncome)}
          subtitle={`Ingresos: ${formatCurrency(summary.totalIncome)} | Gastos: ${formatCurrency(summary.totalExpenses)}`}
          subtitleColor={summary.netIncome >= 0 ? 'success' : 'danger'}
        />
      </Card>

      <Card>
        <CardHeader
          title="Proximo Cobro"
          icon={<Calendar size={20} className="text-amber-400" />}
        />
        <CardValue
          value={`${daysUntilRent} dias`}
          subtitle={`Renta mensual: ${formatCurrency(property.monthlyRent)}`}
        />
      </Card>
    </div>
  );
}
