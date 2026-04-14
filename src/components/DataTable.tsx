import React from 'react';
import { DataPoint } from '@/lib/types';
import { FileSpreadsheet, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface DataTableProps {
  sample: DataPoint[];
}

export default function DataTable({ sample }: DataTableProps) {
  const { t } = useLanguage();

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden flex flex-col">
      <div className="px-5 py-4 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/20">
        <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
          <FileSpreadsheet size={14} className="text-zinc-600" /> {t('extractionBuffer')}
        </h3>
        <div className="flex gap-2">
           <span className="text-[10px] font-mono text-zinc-600 bg-zinc-900 px-2 py-0.5 rounded uppercase">
             {t('liveRegistry')}
           </span>
        </div>
      </div>
      
      <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead className="sticky top-0 bg-zinc-950/95 backdrop-blur-sm z-10 border-b border-zinc-900">
            <tr>
              <th className="px-6 py-3 text-[10px] font-bold text-zinc-600 uppercase tracking-tight">{t('index')}</th>
              <th className="px-6 py-3 text-[10px] font-bold text-zinc-600 uppercase tracking-tight">{t('systemId')}</th>
              <th className="px-6 py-3 text-[10px] font-bold text-zinc-600 uppercase tracking-tight">{t('incomeDelta')}</th>
              <th className="px-6 py-3 text-[10px] font-bold text-zinc-600 uppercase tracking-tight">{t('segment')}</th>
              <th className="px-6 py-3 text-[10px] font-bold text-zinc-600 uppercase tracking-tight">{t('cluster')}</th>
              <th className="px-6 py-3 text-[10px] font-bold text-zinc-600 uppercase tracking-tight text-right">{t('mapping')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-900">
            {sample.length > 0 ? (
              sample.map((p, i) => (
                <tr key={p.id} className="hover:bg-zinc-900/50 transition-colors group">
                  <td className="px-6 py-3 text-xs font-mono text-zinc-700">{(i + 1).toString().padStart(3, '0')}</td>
                  <td className="px-6 py-3 text-xs font-mono text-zinc-300 flex items-center gap-2">
                    {p.id} <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 text-indigo-500 transition-opacity" />
                  </td>
                  <td className="px-6 py-3 text-xs font-mono text-zinc-400 tabular-nums">
                    ${p.income.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-3">
                    <span className={`text-[9px] px-1.5 py-0.5 rounded border border-zinc-800 text-zinc-400 bg-zinc-900 uppercase font-bold tracking-tight`}>
                      {p.ageGroup === 'Young' ? 'Young' : p.ageGroup === 'Adult' ? 'Adult' : 'Senior'}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-xs font-mono text-zinc-500">{p.userType}</td>
                  <td className="px-6 py-3 text-[10px] font-mono text-zinc-800 text-right tabular-nums">
                    [{p.x.toFixed(2)}, {p.y.toFixed(2)}]
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-20 text-center text-zinc-700 font-mono italic text-xs uppercase tracking-widest">
                  {t('bufferEmpty')}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
