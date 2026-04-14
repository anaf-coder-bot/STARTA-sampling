import React from 'react';
import { SamplingMethod } from '@/lib/types';
import { Settings2, Cpu, Filter, Layers, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

interface SamplingControlsProps {
  method: SamplingMethod;
  setMethod: (m: SamplingMethod) => void;
  sampleSize: number;
  setSampleSize: (n: number) => void;
  strata: 'ageGroup' | 'userType';
  setStrata: (s: 'ageGroup' | 'userType') => void;
}

export default function SamplingControls({
  method,
  setMethod,
  sampleSize,
  setSampleSize,
  strata,
  setStrata
}: SamplingControlsProps) {
  const { t } = useLanguage();

  const methods: { id: SamplingMethod; icon: React.ElementType; label: string }[] = [
    { id: 'Simple', icon: Cpu, label: t('methods.Simple') },
    { id: 'Stratified', icon: Layers, label: t('methods.Stratified') },
    { id: 'Systematic', icon: Filter, label: t('methods.Systematic') },
    { id: 'Reservoir', icon: Settings2, label: t('methods.Reservoir') },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
            <Settings2 size={12} /> {t('parameters')}
          </label>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between text-[10px] font-mono text-zinc-400">
              <span>{t('sampleSize')}</span>
              <span className="text-indigo-400">{sampleSize}</span>
            </div>
            <input
              type="range"
              min="10"
              max="500"
              step="10"
              value={sampleSize}
              onChange={(e) => setSampleSize(parseInt(e.target.value))}
              className="w-full h-1 bg-zinc-900 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
          </div>

          <div className="p-3 bg-indigo-500/5 border border-indigo-500/10 rounded-lg">
             <div className="flex items-center gap-2 text-indigo-400 mb-1">
               <Info size={10} />
               <span className="text-[9px] font-bold uppercase tracking-tight">{t('activeConfidence')}</span>
             </div>
             <div className="text-[10px] text-zinc-500 font-medium">{t('confidenceNote')}</div>
          </div>
        </div>
      </div>

      <div className="h-[1px] bg-zinc-900" />

      <div>
        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2 mb-4">
          <Cpu size={12} /> {t('algorithm')}
        </label>
        <div className="grid grid-cols-1 gap-1.5">
          {methods.map((m) => {
            const Icon = m.icon;
            const isSelected = method === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setMethod(m.id)}
                className={`
                  flex items-center gap-3 p-2.5 rounded-md text-left transition-all duration-200
                  ${isSelected ? 'bg-zinc-900 text-zinc-100 border-zinc-800' : 'bg-transparent border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50'}
                  border
                `}
              >
                <Icon size={14} className={isSelected ? 'text-indigo-500' : 'text-zinc-600'} />
                <span className="text-xs font-medium">{m.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {method === 'Stratified' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="space-y-3 pt-2"
        >
          <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block">{t('stratificationKey')}</label>
          <div className="flex gap-1.5 p-1 bg-zinc-900/50 rounded-md border border-zinc-900/50">
            {(['userType', 'ageGroup'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStrata(s)}
                className={`
                  flex-1 py-1 px-2 rounded-sm text-[10px] font-bold uppercase tracking-tighter transition-all
                  ${strata === s ? 'bg-zinc-800 text-zinc-100' : 'text-zinc-600 hover:text-zinc-400'}
                `}
              >
                {s}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
