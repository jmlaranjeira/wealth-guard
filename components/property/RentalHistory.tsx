'use client';

import { useState } from 'react';
import {
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
import { Button } from '@/components/ui/Button';
import type { PropertyIncome, PropertyExpense } from '@/types';
import { calculateAnnualPropertyData } from '@/lib/calculations';
import { formatCurrency } from '@/lib/utils';

interface RentalHistoryProps {
  incomes: PropertyIncome[];
  expenses: PropertyExpense[];
}

export function RentalHistory({ incomes, expenses }: RentalHistoryProps) {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const years = [currentYear - 1, currentYear, currentYear + 1].filter(
    (y) => y <= currentYear
  );

  const data = calculateAnnualPropertyData(incomes, expenses, selectedYear);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium">Historial de Alquiler</h2>
        <div className="flex gap-2">
          {years.map((year) => (
            <Button
              key={year}
              variant={selectedYear === year ? 'primary' : 'default'}
              size="sm"
              onClick={() => setSelectedYear(year)}
            >
              {year}
            </Button>
          ))}
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data.monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis
              dataKey="month"
              tick={{ fill: '#94a3b8', fontSize: 12 }}
            />
            <YAxis
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              tickFormatter={(v) => `${v}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '8px',
              }}
              formatter={(value) => [formatCurrency(Number(value))]}
            />
            <Legend />
            <Bar dataKey="income" name="Ingresos" fill="#10B981" />
            <Bar dataKey="expense" name="Gastos" fill="#EF4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div className="p-3 bg-slate-900/30 rounded-xl">
          <p className="text-slate-400 text-sm">Total Ingresos</p>
          <p className="text-xl font-light text-emerald-400">
            {formatCurrency(data.totalIncome)}
          </p>
        </div>
        <div className="p-3 bg-slate-900/30 rounded-xl">
          <p className="text-slate-400 text-sm">Total Gastos</p>
          <p className="text-xl font-light text-red-400">
            {formatCurrency(data.totalExpenses)}
          </p>
        </div>
        <div className="p-3 bg-slate-900/30 rounded-xl">
          <p className="text-slate-400 text-sm">Balance Neto</p>
          <p
            className={`text-xl font-light ${
              data.netIncome >= 0 ? 'text-emerald-400' : 'text-red-400'
            }`}
          >
            {formatCurrency(data.netIncome)}
          </p>
        </div>
      </div>
    </Card>
  );
}
