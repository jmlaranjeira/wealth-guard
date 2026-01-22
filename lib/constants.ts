import type { ETF, Goal, Mantra, ExpenseCategory } from '@/types';

export const ETFS: ETF[] = [
  {
    name: 'MSCI World',
    fullName: 'iShares Core MSCI World',
    isin: 'IE00B4L5Y983',
    targetPercent: 45,
    color: '#10B981',
    yahooSymbol: 'IWDA.AS',
  },
  {
    name: 'MSCI Europe',
    fullName: 'iShares Core MSCI Europe',
    isin: 'IE00B4K48X80',
    targetPercent: 25,
    color: '#3B82F6',
    yahooSymbol: 'IMAE.AS',
  },
  {
    name: 'VanEck Defense',
    fullName: 'VanEck Defense ETF',
    isin: 'IE000YYE6WK5',
    targetPercent: 15,
    color: '#8B5CF6',
    yahooSymbol: 'DFNS.DE',
  },
  {
    name: 'MSCI EM IMI',
    fullName: 'iShares Core MSCI EM IMI',
    isin: 'IE00BKM4GZ66',
    targetPercent: 15,
    color: '#F59E0B',
    yahooSymbol: 'EIMI.AS',
  },
];

export const GOALS: Goal[] = [
  { year: 2027, amount: 20000, label: '2027' },
  { year: 2028, amount: 40000, label: '2028' },
  { year: 2031, amount: 136000, label: '5 anos' },
  { year: 2036, amount: 300000, label: '10 anos' },
];

export const MANTRAS: Mantra[] = [
  { trigger: 'caida', text: 'Las caidas son el peaje que pago por las subidas futuras.' },
  { trigger: 'euforia', text: 'La euforia es tan peligrosa como el panico.' },
  { trigger: 'duda', text: 'Esta estrategia se diseno en frio. Confia en el plan.' },
  { trigger: 'default', text: 'Manten el rumbo. El tiempo esta de tu lado.' },
  { trigger: 'paciencia', text: 'La paciencia es la virtud del inversor.' },
  { trigger: 'disciplina', text: 'La disciplina supera a la inteligencia.' },
];

export const STRATEGY = {
  monthlyMin: 1000,
  contributionDays: '1-5 de cada mes',
  rebalanceThreshold: 5,
  horizon: 10,
};

export const EXPENSE_CATEGORIES: { value: ExpenseCategory; label: string }[] = [
  { value: 'mantenimiento', label: 'Mantenimiento' },
  { value: 'impuestos', label: 'Impuestos' },
  { value: 'seguros', label: 'Seguros' },
  { value: 'comunidad', label: 'Comunidad' },
  { value: 'suministros', label: 'Suministros' },
  { value: 'gestion', label: 'Gestion' },
  { value: 'otros', label: 'Otros' },
];

export const DEMO_TRANSACTIONS = [
  { id: '1', date: '2026-01', etf: 'MSCI World', amount: 450, shares: 5.2, price: 86.54 },
  { id: '2', date: '2026-01', etf: 'MSCI Europe', amount: 250, shares: 3.8, price: 65.79 },
  { id: '3', date: '2026-01', etf: 'VanEck Defense', amount: 150, shares: 4.1, price: 36.59 },
  { id: '4', date: '2026-01', etf: 'MSCI EM IMI', amount: 150, shares: 4.5, price: 33.33 },
];

export const DEMO_HISTORY = [
  { month: 'Ene 26', value: 1000, contributed: 1000 },
  { month: 'Feb 26', value: 2050, contributed: 2000 },
  { month: 'Mar 26', value: 3180, contributed: 3000 },
  { month: 'Abr 26', value: 4420, contributed: 4000 },
  { month: 'May 26', value: 5350, contributed: 5000 },
  { month: 'Jun 26', value: 6680, contributed: 6000 },
];

export const DEMO_PROPERTY = {
  id: 'pt-1',
  name: 'Apartamento Lisboa',
  location: 'Lisboa, Portugal',
  purchaseDate: '2024-06',
  purchasePrice: 180000,
  currentValue: 195000,
  monthlyRent: 850,
};

export const DEMO_PROPERTY_INCOMES = [
  { id: 'inc-1', propertyId: 'pt-1', date: '2025-01', amount: 850, concept: 'Alquiler Enero' },
  { id: 'inc-2', propertyId: 'pt-1', date: '2025-02', amount: 850, concept: 'Alquiler Febrero' },
  { id: 'inc-3', propertyId: 'pt-1', date: '2025-03', amount: 850, concept: 'Alquiler Marzo' },
  { id: 'inc-4', propertyId: 'pt-1', date: '2025-04', amount: 850, concept: 'Alquiler Abril' },
  { id: 'inc-5', propertyId: 'pt-1', date: '2025-05', amount: 850, concept: 'Alquiler Mayo' },
  { id: 'inc-6', propertyId: 'pt-1', date: '2025-06', amount: 850, concept: 'Alquiler Junio' },
];

export const DEMO_PROPERTY_EXPENSES = [
  { id: 'exp-1', propertyId: 'pt-1', date: '2025-01', amount: 45, category: 'comunidad' as ExpenseCategory, concept: 'Cuota comunidad' },
  { id: 'exp-2', propertyId: 'pt-1', date: '2025-04', amount: 1200, category: 'impuestos' as ExpenseCategory, concept: 'IMI anual' },
  { id: 'exp-3', propertyId: 'pt-1', date: '2025-02', amount: 180, category: 'seguros' as ExpenseCategory, concept: 'Seguro hogar' },
  { id: 'exp-4', propertyId: 'pt-1', date: '2025-03', amount: 95, category: 'mantenimiento' as ExpenseCategory, concept: 'Reparacion grifo' },
];
