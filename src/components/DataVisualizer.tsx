import React, { useMemo } from 'react';
import { DataPoint } from '@/lib/types';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useLanguage } from '@/context/LanguageContext';

interface DataVisualizerProps {
  population: DataPoint[];
  sample: DataPoint[];
}

export default function DataVisualizer({ population, sample }: DataVisualizerProps) {
  const { t } = useLanguage();

  const histogramData = useMemo(() => {
    const bins = 20;
    const min = 20000;
    const max = 200000;
    const binWidth = (max - min) / bins;
    
    const popDist = new Array(bins).fill(0);
    const sampleDist = new Array(bins).fill(0);
    
    population.forEach(p => {
      const b = Math.min(bins - 1, Math.floor((p.income - min) / binWidth));
      popDist[b]++;
    });
    
    sample.forEach(s => {
      const b = Math.min(bins - 1, Math.floor((s.income - min) / binWidth));
      sampleDist[b]++;
    });
    
    return popDist.map((count, i) => ({
      income: `$${Math.round((min + i * binWidth) / 1000)}k`,
      population: (count / population.length) * 100,
      sample: sample.length > 0 ? (sampleDist[i] / sample.length) * 100 : 0,
      popRaw: count,
      sampleRaw: sampleDist[i],
    }));
  }, [population, sample]);

  const sampledIds = useMemo(() => new Set(sample.map(s => s.id)), [sample]);

  const gridConfig = useMemo(() => {
    const n = population.length;
    const cols = Math.max(10, Math.ceil(Math.sqrt(n * 1.77)));
    const gap = n > 2000 ? 1 : n > 500 ? 2 : 4;
    return { cols, gap };
  }, [population.length]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-zinc-950 border border-zinc-800 p-6 rounded-xl overflow-hidden">
          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-6">{t('visualizer.entityMapping')}</h3>
          <div className="flex items-start justify-center min-h-[400px] overflow-y-auto max-h-[600px] scrollbar-hide p-1">
            <div 
              className="grid w-full max-w-4xl"
              style={{ 
                gridTemplateColumns: `repeat(${gridConfig.cols}, 1fr)`,
                gap: `${gridConfig.gap}px`
              }}
            >
              {population.map((p) => {
                const isSampled = sampledIds.has(p.id);
                return (
                  <div
                    key={p.id}
                    className={`
                      w-full aspect-square rounded-sm transition-all duration-300 cursor-help
                      ${isSampled 
                        ? 'bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.4)] scale-110 z-10 ring-1 ring-indigo-400/10' 
                        : 'bg-zinc-900 hover:bg-zinc-800'
                      }
                    `}
                  />
                );
              })}
            </div>
          </div>
          <div className="mt-4 flex gap-6 text-[10px] font-mono justify-center text-zinc-500">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-sm bg-indigo-500" />
              <span>{t('visualizer.sampledMatrix')}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-sm bg-zinc-800" />
              <span>{t('visualizer.referencePop')}</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 bg-zinc-950 border border-zinc-800 p-6 rounded-xl flex flex-col">
          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-6">{t('visualizer.dynamicDensity')}</h3>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={histogramData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPop" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#27272a" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#27272a" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSample" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="5 5" stroke="#18181b" vertical={false} />
                <XAxis 
                  dataKey="income" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#52525b', fontSize: 9, fontFamily: 'monospace'}}
                  interval={4}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#52525b', fontSize: 9, fontFamily: 'monospace'}}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#09090b', 
                    border: '1px solid #27272a', 
                    borderRadius: '8px', 
                    fontSize: '10px',
                    fontFamily: 'monospace'
                  }}
                  itemStyle={{color: '#fafafa'}}
                  formatter={(value: number, name: string, props: { payload: { sampleRaw: number; popRaw: number } }) => {
                    const isSample = name === 'sample';
                    const rawCount = isSample ? props.payload.sampleRaw : props.payload.popRaw;
                    return [`${value.toFixed(1)}% (${rawCount} ${t('visualizer.units')})`, isSample ? t('visualizer.activeSample') : t('visualizer.populationBase')];
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="population" 
                  stroke="#3f3f46" 
                  fillOpacity={1} 
                  fill="url(#colorPop)" 
                  strokeWidth={1}
                  strokeDasharray="4 4"
                />
                <Area 
                  type="monotone" 
                  dataKey="sample" 
                  stroke="#6366f1" 
                  fillOpacity={1} 
                  fill="url(#colorSample)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-4 text-[9px] text-zinc-600 font-mono text-center leading-tight">
            {t('visualizer.densityNote')}
          </p>
        </div>
      </div>
    </div>
  );
}
