'use client';

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Card } from '@/components/ui/Card';
import type { Distribution } from '@/types';
import { cn, formatCurrency } from '@/lib/utils';
import { STRATEGY } from '@/lib/constants';

interface DistributionChartProps {
  distribution: Distribution[];
}

export function DistributionChart({ distribution }: DistributionChartProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="p-6">
        <h2 className="text-lg font-medium mb-4">Distribucion Actual</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={distribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {distribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [formatCurrency(Number(value)), 'Valor']}
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4">
          {distribution.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 text-sm">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span>
                {item.name}: {item.percent}%
              </span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-medium mb-4">Actual vs Objetivo</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={distribution} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis
                type="number"
                domain={[0, 50]}
                tick={{ fill: '#94a3b8', fontSize: 12 }}
              />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fill: '#94a3b8', fontSize: 12 }}
                width={100}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Bar dataKey="percent" name="Actual %" fill="#10B981" />
              <Bar dataKey="target" name="Objetivo %" fill="#3B82F6" opacity={0.5} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 space-y-2">
          <h3 className="text-sm font-medium text-slate-400">Desviaciones</h3>
          {distribution.map((item, idx) => {
            const needsAttention = Math.abs(item.deviation) > STRATEGY.rebalanceThreshold;
            return (
              <div
                key={idx}
                className={cn(
                  'flex items-center justify-between p-2 rounded-lg',
                  needsAttention
                    ? 'bg-amber-900/20 border border-amber-600/30'
                    : 'bg-slate-900/30'
                )}
              >
                <span className="text-sm">{item.name}</span>
                <span
                  className={cn(
                    'text-sm font-medium',
                    item.deviation > 0
                      ? 'text-emerald-400'
                      : item.deviation < 0
                      ? 'text-red-400'
                      : 'text-slate-400'
                  )}
                >
                  {item.deviation > 0 ? '+' : ''}
                  {item.deviation}%
                  {needsAttention && ' !'}
                </span>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
