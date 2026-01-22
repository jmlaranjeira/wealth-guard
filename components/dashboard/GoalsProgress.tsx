'use client';

import { Target } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import type { GoalProgress } from '@/types';
import { formatCurrency } from '@/lib/utils';

interface GoalsProgressProps {
  goals: GoalProgress[];
}

export function GoalsProgress({ goals }: GoalsProgressProps) {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
        <Target size={20} className="text-emerald-400" />
        Progreso hacia Objetivos
      </h2>
      <div className="space-y-4">
        {goals.map((goal, idx) => (
          <div key={idx}>
            <div className="flex justify-between text-sm mb-1">
              <span>
                {goal.label} - {formatCurrency(goal.amount)}
              </span>
              <span
                className={goal.progress >= 100 ? 'text-emerald-400' : 'text-slate-400'}
              >
                {goal.progress}%
              </span>
            </div>
            <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, goal.progress)}%` }}
              />
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Faltan {formatCurrency(goal.remaining)} | {goal.yearsLeft} anos restantes
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}
