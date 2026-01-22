import type {
  Transaction,
  HistoryPoint,
  Distribution,
  GoalProgress,
  Property,
  PropertyIncome,
  PropertyExpense,
  PropertySummary,
} from '@/types';
import { ETFS, GOALS, STRATEGY } from './constants';

export function calculateDistribution(transactions: Transaction[]): Distribution[] {
  const totals: Record<string, number> = {};

  transactions.forEach((t) => {
    if (!totals[t.etf]) totals[t.etf] = 0;
    totals[t.etf] += t.amount;
  });

  const total = Object.values(totals).reduce((a, b) => a + b, 0);

  return ETFS.map((etf) => {
    const value = totals[etf.name] || 0;
    const percent = total > 0 ? (value / total) * 100 : 0;
    const deviation = percent - etf.targetPercent;

    return {
      name: etf.name,
      value,
      percent: Number(percent.toFixed(1)),
      target: etf.targetPercent,
      color: etf.color,
      deviation: Number(deviation.toFixed(1)),
    };
  });
}

export function calculateTotals(history: HistoryPoint[]) {
  if (history.length === 0) {
    return {
      totalValue: 0,
      totalContributed: 0,
      totalReturn: 0,
      returnPercent: 0,
    };
  }

  const latest = history[history.length - 1];
  const totalValue = latest.value;
  const totalContributed = latest.contributed;
  const totalReturn = totalValue - totalContributed;
  const returnPercent = totalContributed > 0 ? (totalReturn / totalContributed) * 100 : 0;

  return {
    totalValue,
    totalContributed,
    totalReturn,
    returnPercent: Number(returnPercent.toFixed(2)),
  };
}

export function calculateGoalProgress(totalValue: number): GoalProgress[] {
  const currentYear = new Date().getFullYear();

  return GOALS.map((goal) => ({
    ...goal,
    progress: Number(Math.min(100, (totalValue / goal.amount) * 100).toFixed(1)),
    remaining: Math.max(0, goal.amount - totalValue),
    yearsLeft: goal.year - currentYear,
  }));
}

export function needsRebalancing(distribution: Distribution[]): boolean {
  return distribution.some((d) => Math.abs(d.deviation) > STRATEGY.rebalanceThreshold);
}

export function calculateRebalanceActions(
  distribution: Distribution[],
  totalValue: number
): { etf: string; action: 'comprar' | 'vender'; amount: number }[] {
  if (totalValue === 0) return [];

  return distribution
    .filter((d) => Math.abs(d.deviation) > STRATEGY.rebalanceThreshold)
    .map((d) => {
      const targetValue = (d.target / 100) * totalValue;
      const diff = targetValue - d.value;

      return {
        etf: d.name,
        action: diff > 0 ? 'comprar' as const : 'vender' as const,
        amount: Math.abs(diff),
      };
    })
    .sort((a, b) => b.amount - a.amount);
}

export function calculatePropertySummary(
  property: Property,
  incomes: PropertyIncome[],
  expenses: PropertyExpense[]
): PropertySummary {
  const propertyIncomes = incomes.filter((i) => i.propertyId === property.id);
  const propertyExpenses = expenses.filter((e) => e.propertyId === property.id);

  const totalIncome = propertyIncomes.reduce((sum, i) => sum + i.amount, 0);
  const totalExpenses = propertyExpenses.reduce((sum, e) => sum + e.amount, 0);
  const netIncome = totalIncome - totalExpenses;
  const annualYield = property.currentValue > 0 ? (netIncome / property.currentValue) * 100 : 0;

  return {
    totalIncome,
    totalExpenses,
    netIncome,
    annualYield: Number(annualYield.toFixed(2)),
  };
}

export function calculateAnnualPropertyData(
  incomes: PropertyIncome[],
  expenses: PropertyExpense[],
  year: number
) {
  const yearStr = year.toString();

  const yearIncomes = incomes.filter((i) => i.date.startsWith(yearStr));
  const yearExpenses = expenses.filter((e) => e.date.startsWith(yearStr));

  const totalIncome = yearIncomes.reduce((sum, i) => sum + i.amount, 0);
  const totalExpenses = yearExpenses.reduce((sum, e) => sum + e.amount, 0);

  const monthlyData = [];
  for (let m = 1; m <= 12; m++) {
    const monthStr = `${yearStr}-${m.toString().padStart(2, '0')}`;
    const monthIncome = yearIncomes
      .filter((i) => i.date.startsWith(monthStr))
      .reduce((sum, i) => sum + i.amount, 0);
    const monthExpense = yearExpenses
      .filter((e) => e.date.startsWith(monthStr))
      .reduce((sum, e) => sum + e.amount, 0);

    monthlyData.push({
      month: new Date(year, m - 1).toLocaleDateString('es-ES', { month: 'short' }),
      income: monthIncome,
      expense: monthExpense,
      net: monthIncome - monthExpense,
    });
  }

  return {
    totalIncome,
    totalExpenses,
    netIncome: totalIncome - totalExpenses,
    monthlyData,
  };
}

export function getExpensesByCategory(expenses: PropertyExpense[]) {
  const byCategory: Record<string, number> = {};

  expenses.forEach((e) => {
    if (!byCategory[e.category]) byCategory[e.category] = 0;
    byCategory[e.category] += e.amount;
  });

  return Object.entries(byCategory).map(([category, amount]) => ({
    category,
    amount,
  }));
}
