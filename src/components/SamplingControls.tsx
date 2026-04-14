import React from 'react';
import { SamplingMethod } from '@/lib/types';
import { Settings2, Cpu, Filter, Layers, Info, Upload, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

interface SamplingControlsProps {
  method: SamplingMethod;
  setMethod: (m: SamplingMethod) => void;
  sampleSize: number;
  setSampleSize: (n: number) => void;
  strata: 'ageGroup' | 'userType';
  setStrata: (s: 'ageGroup' | 'userType') => void;
  onImport?: (data: string) => void;
  onReset?: () => void;
  isCustom?: boolean;
  maxPoints?: number;
}

export default function SamplingControls({
  method,
  setMethod,
  sampleSize,
  setSampleSize,
  strata,
  setStrata,
  onImport,
  onReset,
  isCustom,
  maxPoints
}: SamplingControlsProps) {
  const { t } = useLanguage();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onImport) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onImport(event.target?.result as string);
      };
      reader.readAsText(file);
    }
    // Reset input
    if (e.target) e.target.value = '';
  };

  const methods: { id: SamplingMethod; icon: React.ElementType; label: string }[] = [
    { id: 'Simple', icon: Cpu, label: t('methods.Simple') },
    { id: 'Stratified', icon: Layers, label: t('methods.Stratified') },
    { id: 'Systematic', icon: Filter, label: t('methods.Systematic') },
    { id: 'Reservoir', icon: Settings2, label: t('methods.Reservoir') },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2 mb-4">
          <Upload size={12} /> {t('importData')}
        </label>
        <div className="space-y-2">
          <input 
            type="file" 
            accept=".csv" 
            className="hidden" 
            ref={fileInputRef} 
            onChange={handleFileChange}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex items-center justify-between p-3 bg-zinc-900/50 border border-zinc-800 rounded-lg hover:bg-zinc-900 transition-colors text-xs text-zinc-300"
          >
            <span className="flex items-center gap-2">
              <Upload size={14} className="text-indigo-500" />
              {t('uploadCsv')}
            </span>
            {isCustom && (
              <span className="text-[9px] bg-indigo-500/20 text-indigo-400 px-1.5 py-0.5 rounded font-bold uppercase">Active</span>
            )}
          </button>
          
          {isCustom && (
            <button
              onClick={onReset}
              className="w-full flex items-center gap-2 p-3 bg-red-500/5 border border-red-500/10 rounded-lg hover:bg-red-500/10 transition-colors text-xs text-red-400"
            >
              <RotateCcw size={14} />
              {t('dataReset')}
            </button>
          )}
        </div>
      </div>

      <div className="h-[1px] bg-zinc-900" />

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
              max={maxPoints || 1000}
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
