// ETF Types
export interface ETF {
  name: string;
  fullName: string;
  isin: string;
  targetPercent: number;
  color: string;
  yahooSymbol: string;
}

export interface Transaction {
  id: string;
  date: string;
  etf: string;
  amount: number;
  shares: number;
  price: number;
}

export interface HistoryPoint {
  month: string;
  value: number;
  contributed: number;
}

export interface PriceData {
  price: number;
  change: number;
  changePercent: number;
  currency: string;
  lastUpdated: string;
}

export interface Distribution {
  name: string;
  value: number;
  percent: number;
  target: number;
  color: string;
  deviation: number;
}

export interface Goal {
  year: number;
  amount: number;
  label: string;
}

export interface GoalProgress extends Goal {
  progress: number;
  remaining: number;
  yearsLeft: number;
}

export interface Mantra {
  trigger: string;
  text: string;
}

// Property Types (Portugal)
export interface Property {
  id: string;
  name: string;
  location: string;
  purchaseDate: string;
  purchasePrice: number;
  currentValue: number;
  monthlyRent: number;
}

export interface PropertyIncome {
  id: string;
  propertyId: string;
  date: string;
  amount: number;
  concept: string;
  tenant?: string;
}

export interface PropertyExpense {
  id: string;
  propertyId: string;
  date: string;
  amount: number;
  category: ExpenseCategory;
  concept: string;
}

export type ExpenseCategory =
  | 'mantenimiento'
  | 'impuestos'
  | 'seguros'
  | 'comunidad'
  | 'suministros'
  | 'gestion'
  | 'otros';

export interface PropertySummary {
  totalIncome: number;
  totalExpenses: number;
  netIncome: number;
  annualYield: number;
}

// Store Types
export interface PortfolioState {
  transactions: Transaction[];
  history: HistoryPoint[];
  prices: Record<string, PriceData>;
  pricesLoading: boolean;
  pricesError: string | null;
}

export interface PropertyState {
  properties: Property[];
  incomes: PropertyIncome[];
  expenses: PropertyExpense[];
}

export interface UIState {
  activeTab: string;
  showMantra: boolean;
  currentMantra: Mantra | null;
}
