'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  Transaction,
  HistoryPoint,
  PriceData,
  Property,
  PropertyIncome,
  PropertyExpense,
  Mantra,
} from '@/types';
import {
  DEMO_TRANSACTIONS,
  DEMO_HISTORY,
  DEMO_PROPERTY,
  DEMO_PROPERTY_INCOMES,
  DEMO_PROPERTY_EXPENSES,
  MANTRAS,
} from './constants';
import { generateId, getCurrentMonthLabel } from './utils';

interface StoreState {
  // Portfolio
  transactions: Transaction[];
  history: HistoryPoint[];
  prices: Record<string, PriceData>;
  pricesLoading: boolean;
  pricesError: string | null;

  // Property
  properties: Property[];
  incomes: PropertyIncome[];
  expenses: PropertyExpense[];

  // UI
  activeTab: string;
  showMantra: boolean;
  currentMantra: Mantra | null;

  // Actions - Portfolio
  addTransactions: (txs: Omit<Transaction, 'id'>[]) => void;
  clearTransactions: () => void;
  addHistoryPoint: (point: Omit<HistoryPoint, 'id'>) => void;
  setPrices: (prices: Record<string, PriceData>) => void;
  setPricesLoading: (loading: boolean) => void;
  setPricesError: (error: string | null) => void;

  // Actions - Property
  addProperty: (property: Omit<Property, 'id'>) => void;
  updateProperty: (id: string, updates: Partial<Property>) => void;
  addIncome: (income: Omit<PropertyIncome, 'id'>) => void;
  addIncomes: (incomes: Omit<PropertyIncome, 'id'>[]) => void;
  addExpense: (expense: Omit<PropertyExpense, 'id'>) => void;
  addExpenses: (expenses: Omit<PropertyExpense, 'id'>[]) => void;

  // Actions - UI
  setActiveTab: (tab: string) => void;
  showRandomMantra: () => void;
  hideMantra: () => void;

  // Utils
  loadDemoData: () => void;
  clearAllData: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Initial state - Portfolio
      transactions: [],
      history: [],
      prices: {},
      pricesLoading: false,
      pricesError: null,

      // Initial state - Property
      properties: [],
      incomes: [],
      expenses: [],

      // Initial state - UI
      activeTab: 'overview',
      showMantra: false,
      currentMantra: null,

      // Actions - Portfolio
      addTransactions: (txs) =>
        set((state) => {
          const newTransactions = txs.map((tx) => ({
            ...tx,
            id: generateId(),
          }));

          const totalNew = newTransactions.reduce((sum, t) => sum + t.amount, 0);
          const lastHistory = state.history[state.history.length - 1] || {
            value: 0,
            contributed: 0,
          };

          const newHistoryPoint: HistoryPoint = {
            month: getCurrentMonthLabel(),
            value: lastHistory.value + totalNew * 1.02,
            contributed: lastHistory.contributed + totalNew,
          };

          return {
            transactions: [...state.transactions, ...newTransactions],
            history: [...state.history, newHistoryPoint],
          };
        }),

      clearTransactions: () => set({ transactions: [], history: [] }),

      addHistoryPoint: (point) =>
        set((state) => ({
          history: [...state.history, point],
        })),

      setPrices: (prices) => set({ prices, pricesError: null }),

      setPricesLoading: (pricesLoading) => set({ pricesLoading }),

      setPricesError: (pricesError) => set({ pricesError }),

      // Actions - Property
      addProperty: (property) =>
        set((state) => ({
          properties: [...state.properties, { ...property, id: generateId() }],
        })),

      updateProperty: (id, updates) =>
        set((state) => ({
          properties: state.properties.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        })),

      addIncome: (income) =>
        set((state) => ({
          incomes: [...state.incomes, { ...income, id: generateId() }],
        })),

      addIncomes: (newIncomes) =>
        set((state) => ({
          incomes: [
            ...state.incomes,
            ...newIncomes.map((i) => ({ ...i, id: generateId() })),
          ],
        })),

      addExpense: (expense) =>
        set((state) => ({
          expenses: [...state.expenses, { ...expense, id: generateId() }],
        })),

      addExpenses: (newExpenses) =>
        set((state) => ({
          expenses: [
            ...state.expenses,
            ...newExpenses.map((e) => ({ ...e, id: generateId() })),
          ],
        })),

      // Actions - UI
      setActiveTab: (activeTab) => set({ activeTab }),

      showRandomMantra: () => {
        const random = MANTRAS[Math.floor(Math.random() * MANTRAS.length)];
        set({ showMantra: true, currentMantra: random });
        setTimeout(() => {
          set({ showMantra: false });
        }, 5000);
      },

      hideMantra: () => set({ showMantra: false }),

      // Utils
      loadDemoData: () =>
        set({
          transactions: DEMO_TRANSACTIONS,
          history: DEMO_HISTORY,
          properties: [DEMO_PROPERTY],
          incomes: DEMO_PROPERTY_INCOMES,
          expenses: DEMO_PROPERTY_EXPENSES,
        }),

      clearAllData: () =>
        set({
          transactions: [],
          history: [],
          prices: {},
          properties: [],
          incomes: [],
          expenses: [],
        }),
    }),
    {
      name: 'wealth-guard-storage',
      partialize: (state) => ({
        transactions: state.transactions,
        history: state.history,
        prices: state.prices,
        properties: state.properties,
        incomes: state.incomes,
        expenses: state.expenses,
      }),
    }
  )
);
