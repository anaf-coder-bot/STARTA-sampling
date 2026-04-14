import React from 'react';
import { Cpu, Hash } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface TechSpecsProps {
  sampleSize: number;
  popSize: number;
  metrics: {
    klDivergence: number;
    mse: number;
    standardError: number;
  };
}

export default function TechSpecs({ sampleSize, popSize, metrics }: TechSpecsProps) {
  const { t } = useLanguage();

  const specs = [
    { label: t('sampleCount'), value: sampleSize.toString() },
    { label: t('popCount'), value: popSize.toString() },
    { label: t('samplingRatio'), value: (sampleSize / popSize).toFixed(3) },
    { label: t('mse'), value: metrics.mse.toFixed(2) },
    { label: t('stdError'), value: metrics.standardError.toFixed(6) },
    { label: t('entropy'), value: metrics.klDivergence.toFixed(8) },
  ];

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Cpu size={16} className="text-zinc-500" />
          <h3 className="text-sm font-semibold tracking-tight text-zinc-300">{t('techSpecs')}</h3>
        </div>
        <div className="px-1.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[9px] font-bold text-indigo-400 uppercase">
          {t('precision')}: 64bit
        </div>
      </div>
      
      <div className="p-4 space-y-4 font-mono">
        {specs.map((spec) => (
          <div key={spec.label} className="flex flex-col gap-1.5 pt-4 first:pt-0 border-t border-zinc-900 first:border-0">
            <div className="text-[10px] text-zinc-500 uppercase tracking-tighter">{spec.label}</div>
            <div className="text-sm text-zinc-100 flex items-center justify-between">
              {spec.value}
              <Hash size={12} className="text-zinc-800" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto p-4 border-t border-zinc-800 bg-zinc-900/10">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-[10px] uppercase font-bold text-zinc-600">
            <span>{t('utilization')}</span>
            <span>{(sampleSize / popSize * 100).toFixed(1)}%</span>
          </div>
          <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-500 transition-all duration-500" 
              style={{ width: `${(sampleSize / popSize * 100)}%` }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
