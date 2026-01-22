import { NextResponse } from 'next/server';
import yahooFinance from 'yahoo-finance2';
import { ETFS } from '@/lib/constants';

export const dynamic = 'force-dynamic';

interface PriceResult {
  price: number;
  change: number;
  changePercent: number;
  currency: string;
  lastUpdated: string;
}

interface QuoteResult {
  regularMarketPrice?: number;
  regularMarketChange?: number;
  regularMarketChangePercent?: number;
  currency?: string;
}

export async function GET() {
  try {
    const results: Record<string, PriceResult> = {};

    for (const etf of ETFS) {
      try {
        const quote = await yahooFinance.quote(etf.yahooSymbol) as QuoteResult | null;

        if (quote) {
          results[etf.name] = {
            price: quote.regularMarketPrice ?? 0,
            change: quote.regularMarketChange ?? 0,
            changePercent: quote.regularMarketChangePercent ?? 0,
            currency: quote.currency ?? 'EUR',
            lastUpdated: new Date().toLocaleTimeString('es-ES'),
          };
        }
      } catch (error) {
        console.error(`Error fetching ${etf.yahooSymbol}:`, error);
        results[etf.name] = {
          price: 0,
          change: 0,
          changePercent: 0,
          currency: 'EUR',
          lastUpdated: new Date().toLocaleTimeString('es-ES'),
        };
      }
    }

    return NextResponse.json(results);
  } catch (error) {
    console.error('Error in prices API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch prices' },
      { status: 500 }
    );
  }
}
