'use client';

import { Header } from '@/components/layout/Header';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { PropertyKPIs } from '@/components/property/PropertyKPIs';
import { RentalHistory } from '@/components/property/RentalHistory';
import { ExpensesPanel } from '@/components/property/ExpensesPanel';
import { PropertyUpload } from '@/components/property/PropertyUpload';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useStore } from '@/lib/store';
import { calculatePropertySummary } from '@/lib/calculations';

export default function PropertyPage() {
  const { properties, incomes, expenses, loadDemoData } = useStore();

  const property = properties[0];
  const hasProperty = !!property;

  const summary = property
    ? calculatePropertySummary(property, incomes, expenses)
    : { totalIncome: 0, totalExpenses: 0, netIncome: 0, annualYield: 0 };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <Header />
      <Navigation />

      <main className="space-y-6">
        {!hasProperty ? (
          <Card className="p-8 text-center">
            <h2 className="text-xl font-medium mb-2">Propiedad en Portugal</h2>
            <p className="text-slate-400 mb-4">
              Aun no tienes una propiedad registrada. Carga datos de ejemplo
              para ver como funciona el panel.
            </p>
            <Button variant="primary" onClick={loadDemoData}>
              Cargar datos de ejemplo
            </Button>
          </Card>
        ) : (
          <>
            <div className="mb-4">
              <h2 className="text-2xl font-light">
                <span className="text-emerald-400">&#9670;</span> {property.name}
              </h2>
              <p className="text-slate-400 text-sm">{property.location}</p>
            </div>

            <PropertyKPIs property={property} summary={summary} />
            <RentalHistory incomes={incomes} expenses={expenses} />
            <ExpensesPanel expenses={expenses} />
            <PropertyUpload />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
