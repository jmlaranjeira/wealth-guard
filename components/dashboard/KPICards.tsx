'use client';

import { DollarSign, PiggyBank, Calendar, Shield, AlertTriangle } from 'lucide-react';
import { Card, CardHeader, CardValue } from '@/components/ui/Card';
import { formatCurrency, formatPercent, getDaysUntilContribution } from '@/lib/utils';
import { STRATEGY } from '@/lib/constants';

interface KPICardsProps {
  totalValue: number;
  totalContributed: number;
  totalReturn: number;
  returnPercent: number;
  needsRebalancing: boolean;
}

export function KPICards({
  totalValue,
  totalContributed,
  totalReturn,
  returnPercent,
  needsRebalancing,
}: KPICardsProps) {
  const daysUntilContribution = getDaysUntilContribution();
  const monthsContributed = Math.floor(totalContributed / STRATEGY.monthlyMin);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader
          title="Patrimonio Total"
          icon={<DollarSign size={20} />}
        />
        <CardValue
          value={formatCurrency(totalValue)}
          subtitle={`${totalReturn >= 0 ? '+' : ''}${formatCurrency(totalReturn)} (${formatPercent(returnPercent)})`}
          subtitleColor={totalReturn >= 0 ? 'success' : 'danger'}
        />
      </Card>

      <Card>
        <CardHeader
          title="Aportado"
          icon={<PiggyBank size={20} className="text-blue-400" />}
        />
        <CardValue
          value={formatCurrency(totalContributed)}
          subtitle={`${monthsContributed} meses de aportaciones`}
        />
      </Card>

      <Card>
        <CardHeader
          title="Proxima Aportacion"
          icon={<Calendar size={20} className="text-amber-400" />}
        />
        <CardValue
          value={daysUntilContribution === 0 ? 'Hoy!' : `${daysUntilContribution} dias`}
          subtitle={`Minimo ${formatCurrency(STRATEGY.monthlyMin)}`}
        />
      </Card>

      <Card variant={needsRebalancing ? 'warning' : 'success'}>
        <CardHeader
          title="Rebalanceo"
          icon={
            needsRebalancing ? (
              <AlertTriangle size={20} className="text-amber-400" />
            ) : (
              <Shield size={20} className="text-emerald-400" />
            )
          }
        />
        <CardValue
          value={needsRebalancing ? 'Necesario' : 'OK'}
          subtitle={needsRebalancing ? 'Algun ETF >5% desviado' : 'Todo en balance'}
        />
      </Card>
    </div>
  );
}
