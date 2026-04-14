'use client';

import React, { useMemo } from 'react';
import { DataPoint } from '@/lib/types';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface DataVisualizerProps {
  population: DataPoint[];
  sample: DataPoint[];
}

export default function DataVisualizer({ population, sample }: DataVisualizerProps) {
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

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Population Grid */}
        <div className="lg:col-span-2 bg-zinc-950 border border-zinc-800 p-6 rounded-xl">
          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-6">Entity Mapping Index</h3>
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="grid grid-cols-[repeat(40,1fr)] gap-1 w-full max-w-3xl aspect-video">
              {population.map((p) => {
                const isSampled = sampledIds.has(p.id);
                return (
                  <div
                    key={p.id}
                    className={`
                      w-full aspect-square rounded-sm transition-all duration-300
                      ${isSampled ? 'bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.4)] scale-110 z-10' : 'bg-zinc-900'}
                    `}
                  />
                );
              })}
            </div>
          </div>
          <div className="mt-4 flex gap-6 text-[10px] font-mono justify-center text-zinc-500">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-sm bg-indigo-500" />
              <span>Sampled Matrix</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-sm bg-zinc-800" />
              <span>Reference Population</span>
            </div>
          </div>
        </div>

        {/* Distribution Plot */}
        <div className="lg:col-span-1 bg-zinc-950 border border-zinc-800 p-6 rounded-xl flex flex-col">
          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-6">Dynamic Density</h3>
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
                  formatter={(value: number, name: string, props: any) => {
                    const isSample = name === 'sample';
                    const rawCount = isSample ? props.payload.sampleRaw : props.payload.popRaw;
                    return [`${value.toFixed(1)}% (${rawCount} units)`, isSample ? 'Active Sample' : 'Population Base'];
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
            Comparison of Population Probability Density vs. Local Sample Extraction.
          </p>
        </div>
      </div>
    </div>
  );
}
