'use client';

import { useState, useCallback } from 'react';
import { Upload } from 'lucide-react';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import { Card } from '@/components/ui/Card';
import { useStore } from '@/lib/store';
import { ETFS } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface ParsedRow {
  fecha?: string;
  etf?: string;
  cantidad?: string | number;
  precio?: string | number;
  participaciones?: string | number;
}

export function UploadPanel() {
  const [uploadStatus, setUploadStatus] = useState<{
    type: 'success' | 'error' | 'loading' | null;
    message: string;
  }>({ type: null, message: '' });
  const [isDragging, setIsDragging] = useState(false);
  const { addTransactions } = useStore();

  const processFile = useCallback(
    (file: File) => {
      setUploadStatus({ type: 'loading', message: 'Procesando...' });

      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const data = e.target?.result;
          let parsedData: ParsedRow[];

          if (file.name.endsWith('.csv')) {
            const result = Papa.parse<ParsedRow>(data as string, { header: true });
            parsedData = result.data;
          } else {
            const workbook = XLSX.read(data, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            parsedData = XLSX.utils.sheet_to_json<ParsedRow>(workbook.Sheets[sheetName]);
          }

          const validEtfNames = ETFS.map((e) => e.name.toLowerCase());

          const newTransactions = parsedData
            .filter((row) => {
              const etfName = row.etf?.toLowerCase();
              return etfName && validEtfNames.includes(etfName) && row.cantidad;
            })
            .map((row) => ({
              date: row.fecha || new Date().toISOString().slice(0, 7),
              etf: ETFS.find(
                (e) => e.name.toLowerCase() === row.etf?.toLowerCase()
              )!.name,
              amount: parseFloat(String(row.cantidad)) || 0,
              shares: parseFloat(String(row.participaciones)) || 0,
              price: parseFloat(String(row.precio)) || 0,
            }));

          if (newTransactions.length > 0) {
            addTransactions(newTransactions);
            setUploadStatus({
              type: 'success',
              message: `${newTransactions.length} operaciones importadas`,
            });
          } else {
            setUploadStatus({
              type: 'error',
              message: 'No se encontraron datos validos',
            });
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
    [addTransactions]
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
        Cargar Datos desde Excel/CSV
      </h2>

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
          id="file-upload"
        />
        <label htmlFor="file-upload" className="cursor-pointer">
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
        <h3 className="font-medium mb-2">Formato esperado del archivo:</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-slate-400 border-b border-slate-700">
                <th className="text-left p-2">fecha</th>
                <th className="text-left p-2">etf</th>
                <th className="text-left p-2">cantidad</th>
                <th className="text-left p-2">precio</th>
                <th className="text-left p-2">participaciones</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-slate-300">
                <td className="p-2">2026-01</td>
                <td className="p-2">MSCI World</td>
                <td className="p-2">450</td>
                <td className="p-2">86.54</td>
                <td className="p-2">5.2</td>
              </tr>
              <tr className="text-slate-300">
                <td className="p-2">2026-01</td>
                <td className="p-2">MSCI Europe</td>
                <td className="p-2">250</td>
                <td className="p-2">65.79</td>
                <td className="p-2">3.8</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500 mt-3">
          Los nombres de ETF deben coincidir con: {ETFS.map((e) => e.name).join(', ')}
        </p>
      </div>

      <div className="mt-6 p-4 bg-emerald-900/20 border border-emerald-600/30 rounded-xl">
        <h3 className="font-medium text-emerald-400 mb-2">Consejo</h3>
        <p className="text-sm text-slate-300">
          En DEGIRO puedes exportar tus transacciones desde &quot;Actividad&quot; -&gt;
          &quot;Transacciones&quot; -&gt; &quot;Exportar&quot;. Luego solo tienes que ajustar las
          columnas al formato esperado.
        </p>
      </div>
    </Card>
  );
}
