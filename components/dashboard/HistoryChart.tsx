'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Card } from '@/components/ui/Card';
import type { HistoryPoint } from '@/types';
import { formatCurrency, formatPercent } from '@/lib/utils';

interface HistoryChartProps {
  history: HistoryPoint[];
  totalValue: number;
  totalContributed: number;
  totalReturn: number;
  returnPercent: number;
}

export function HistoryChart({
  history,
  totalValue,
  totalContributed,
  totalReturn,
  returnPercent,
}: HistoryChartProps) {
  const monthlyAverage =
    history.length > 0 ? totalContributed / history.length : 0;

  return (
    <Card className="p-6">
      <h2 className="text-lg font-medium mb-4">Evolucion del Patrimonio</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={history}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis
              dataKey="month"
              tick={{ fill: '#94a3b8', fontSize: 12 }}
            />
            <YAxis
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip
              formatter={(value) => [formatCurrency(Number(value))]}
              contentStyle={{
                backgroundColor: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              name="Valor cartera"
              stroke="#10B981"
              strokeWidth={3}
              dot={{ fill: '#10B981', strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="contributed"
              name="Aportado"
              stroke="#3B82F6"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: '#3B82F6', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div className="p-4 bg-slate-900/30 rounded-xl">
          <p className="text-slate-400 text-sm">Rentabilidad Total</p>
          <p
            className={`text-2xl font-light ${
              totalReturn >= 0 ? 'text-emerald-400' : 'text-red-400'
            }`}
          >
            {formatPercent(returnPercent)}
          </p>
        </div>
        <div className="p-4 bg-slate-900/30 rounded-xl">
          <p className="text-slate-400 text-sm">Ganancia/Perdida</p>
          <p
            className={`text-2xl font-light ${
              totalReturn >= 0 ? 'text-emerald-400' : 'text-red-400'
            }`}
          >
            {totalReturn >= 0 ? '+' : ''}
            {formatCurrency(totalReturn)}
          </p>
        </div>
        <div className="p-4 bg-slate-900/30 rounded-xl">
          <p className="text-slate-400 text-sm">Media mensual</p>
          <p className="text-2xl font-light text-blue-400">
            {formatCurrency(monthlyAverage)}
          </p>
        </div>
      </div>
    </Card>
  );
}
