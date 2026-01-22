'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Card } from '@/components/ui/Card';
import type { PropertyExpense } from '@/types';
import { getExpensesByCategory } from '@/lib/calculations';
import { formatCurrency } from '@/lib/utils';
import { EXPENSE_CATEGORIES } from '@/lib/constants';

interface ExpensesPanelProps {
  expenses: PropertyExpense[];
}

const COLORS = ['#EF4444', '#F59E0B', '#3B82F6', '#8B5CF6', '#EC4899', '#10B981', '#6B7280'];

export function ExpensesPanel({ expenses }: ExpensesPanelProps) {
  const byCategory = getExpensesByCategory(expenses);
  const total = byCategory.reduce((sum, c) => sum + c.amount, 0);

  const chartData = byCategory.map((c) => ({
    name: EXPENSE_CATEGORIES.find((cat) => cat.value === c.category)?.label || c.category,
    value: c.amount,
    percent: total > 0 ? ((c.amount / total) * 100).toFixed(1) : 0,
  }));

  const recentExpenses = [...expenses]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="p-6">
        <h2 className="text-lg font-medium mb-4">Gastos por Categoria</h2>
        {chartData.length > 0 ? (
          <>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {chartData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [formatCurrency(Number(value)), 'Gasto']}
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
              {chartData.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                  />
                  <span>
                    {item.name}: {item.percent}%
                  </span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-slate-400 text-center py-8">
            No hay gastos registrados
          </p>
        )}
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-medium mb-4">Ultimos Gastos</h2>
        {recentExpenses.length > 0 ? (
          <div className="space-y-3">
            {recentExpenses.map((expense) => (
              <div
                key={expense.id}
                className="flex items-center justify-between p-3 bg-slate-900/30 rounded-lg"
              >
                <div>
                  <p className="text-sm font-medium">{expense.concept}</p>
                  <p className="text-xs text-slate-400">
                    {EXPENSE_CATEGORIES.find((c) => c.value === expense.category)?.label} | {expense.date}
                  </p>
                </div>
                <p className="text-red-400 font-medium">
                  -{formatCurrency(expense.amount)}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-400 text-center py-8">
            No hay gastos registrados
          </p>
        )}

        <div className="mt-4 p-3 bg-slate-900/50 rounded-xl">
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Total Gastos</span>
            <span className="text-xl font-light text-red-400">
              {formatCurrency(total)}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}
