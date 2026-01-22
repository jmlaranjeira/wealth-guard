'use client';

import { useState, useCallback } from 'react';
import { Upload, Plus } from 'lucide-react';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/lib/store';
import { EXPENSE_CATEGORIES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import type { ExpenseCategory } from '@/types';

type UploadType = 'income' | 'expense';

interface ParsedIncomeRow {
  fecha?: string;
  monto?: string | number;
  concepto?: string;
  inquilino?: string;
}

interface ParsedExpenseRow {
  fecha?: string;
  monto?: string | number;
  categoria?: string;
  concepto?: string;
}

export function PropertyUpload() {
  const [uploadType, setUploadType] = useState<UploadType>('income');
  const [uploadStatus, setUploadStatus] = useState<{
    type: 'success' | 'error' | 'loading' | null;
    message: string;
  }>({ type: null, message: '' });
  const [isDragging, setIsDragging] = useState(false);

  const { properties, addIncomes, addExpenses } = useStore();
  const property = properties[0];

  const processFile = useCallback(
    (file: File) => {
      if (!property) {
        setUploadStatus({
          type: 'error',
          message: 'Primero debes tener una propiedad registrada',
        });
        return;
      }

      setUploadStatus({ type: 'loading', message: 'Procesando...' });

      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const data = e.target?.result;
          let parsedData: (ParsedIncomeRow | ParsedExpenseRow)[];

          if (file.name.endsWith('.csv')) {
            const result = Papa.parse(data as string, { header: true });
            parsedData = result.data as (ParsedIncomeRow | ParsedExpenseRow)[];
          } else {
            const workbook = XLSX.read(data, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            parsedData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]) as (ParsedIncomeRow | ParsedExpenseRow)[];
          }

          if (uploadType === 'income') {
            const newIncomes = (parsedData as ParsedIncomeRow[])
              .filter((row) => row.monto && row.fecha)
              .map((row) => ({
                propertyId: property.id,
                date: row.fecha || new Date().toISOString().slice(0, 7),
                amount: parseFloat(String(row.monto)) || 0,
                concept: row.concepto || 'Alquiler',
                tenant: row.inquilino,
              }));

            if (newIncomes.length > 0) {
              addIncomes(newIncomes);
              setUploadStatus({
                type: 'success',
                message: `${newIncomes.length} ingresos importados`,
              });
            } else {
              setUploadStatus({
                type: 'error',
                message: 'No se encontraron datos validos',
              });
            }
          } else {
            const validCategories = EXPENSE_CATEGORIES.map((c) => c.value);

            const newExpenses = (parsedData as ParsedExpenseRow[])
              .filter((row) => row.monto && row.fecha)
              .map((row) => {
                const category = row.categoria?.toLowerCase() as ExpenseCategory;
                return {
                  propertyId: property.id,
                  date: row.fecha || new Date().toISOString().slice(0, 7),
                  amount: parseFloat(String(row.monto)) || 0,
                  category: validCategories.includes(category) ? category : 'otros' as ExpenseCategory,
                  concept: row.concepto || 'Gasto',
                };
              });

            if (newExpenses.length > 0) {
              addExpenses(newExpenses);
              setUploadStatus({
                type: 'success',
                message: `${newExpenses.length} gastos importados`,
              });
            } else {
              setUploadStatus({
                type: 'error',
                message: 'No se encontraron datos validos',
              });
            }
          }
        } catch (error) {
          console.error('Error processing file:', error);
          setUploadStatus({
            type: 'error',
            message: 'Error al procesar archivo',
          });
        }
      };

      if (file.name.endsWith('.csv')) {
        reader.readAsText(file);
      } else {
        reader.readAsBinaryString(file);
      }
    },
    [property, uploadType, addIncomes, addExpenses]
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      setIsDragging(false);
      const file = event.dataTransfer.files?.[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <Card className="p-6">
      <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
        <Upload size={20} className="text-emerald-400" />
        Cargar Datos de Alquiler
      </h2>

      <div className="flex gap-2 mb-4">
        <Button
          variant={uploadType === 'income' ? 'primary' : 'default'}
          onClick={() => setUploadType('income')}
          icon={<Plus size={16} />}
        >
          Ingresos
        </Button>
        <Button
          variant={uploadType === 'expense' ? 'primary' : 'default'}
          onClick={() => setUploadType('expense')}
          icon={<Plus size={16} />}
        >
          Gastos
        </Button>
      </div>

      <div
        className={cn(
          'border-2 border-dashed rounded-xl p-8 text-center transition-all',
          isDragging
            ? 'border-emerald-500 bg-emerald-900/10'
            : 'border-slate-600 hover:border-emerald-500/50'
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          type="file"
          accept=".xlsx,.xls,.csv"
          onChange={handleFileChange}
          className="hidden"
          id="property-file-upload"
        />
        <label htmlFor="property-file-upload" className="cursor-pointer">
          <Upload size={48} className="mx-auto mb-4 text-slate-500" />
          <p className="text-lg mb-2">
            Arrastra tu archivo aqui o haz clic para seleccionar
          </p>
          <p className="text-sm text-slate-400">
            Formatos aceptados: .xlsx, .xls, .csv
          </p>
        </label>
      </div>

      {uploadStatus.type && (
        <p
          className={cn(
            'mt-4 text-center',
            uploadStatus.type === 'success' && 'text-emerald-400',
            uploadStatus.type === 'error' && 'text-red-400',
            uploadStatus.type === 'loading' && 'text-amber-400'
          )}
        >
          {uploadStatus.type === 'success' && '+ '}
          {uploadStatus.type === 'error' && 'x '}
          {uploadStatus.message}
        </p>
      )}

      <div className="mt-6 bg-slate-900/50 rounded-xl p-4">
        <h3 className="font-medium mb-2">
          Formato esperado ({uploadType === 'income' ? 'Ingresos' : 'Gastos'}):
        </h3>
        <div className="overflow-x-auto">
          {uploadType === 'income' ? (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-slate-400 border-b border-slate-700">
                  <th className="text-left p-2">fecha</th>
                  <th className="text-left p-2">monto</th>
                  <th className="text-left p-2">concepto</th>
                  <th className="text-left p-2">inquilino</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-slate-300">
                  <td className="p-2">2025-01</td>
                  <td className="p-2">850</td>
                  <td className="p-2">Alquiler Enero</td>
                  <td className="p-2">Juan Garcia</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-slate-400 border-b border-slate-700">
                  <th className="text-left p-2">fecha</th>
                  <th className="text-left p-2">monto</th>
                  <th className="text-left p-2">categoria</th>
                  <th className="text-left p-2">concepto</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-slate-300">
                  <td className="p-2">2025-01</td>
                  <td className="p-2">45</td>
                  <td className="p-2">comunidad</td>
                  <td className="p-2">Cuota mensual</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
        {uploadType === 'expense' && (
          <p className="text-xs text-slate-500 mt-3">
            Categorias validas: {EXPENSE_CATEGORIES.map((c) => c.value).join(', ')}
          </p>
        )}
      </div>
    </Card>
  );
}
