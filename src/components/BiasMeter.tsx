'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Target, AlertCircle, Percent, Zap } from 'lucide-react';

interface BiasMeterProps {
  metrics: {
    klDivergence: number;
    mse: number;
    standardError: number;
    representativeness: number;
  };
}

export default function BiasMeter({ metrics }: BiasMeterProps) {
  const score = Math.round(metrics.representativeness);
  
  const getScoreColor = (s: number) => {
    if (s > 90) return 'text-accent-cyan';
    if (s > 70) return 'text-accent-indigo';
    if (s > 40) return 'text-amber-400';
    return 'text-accent-rose';
  };

  const getScoreBg = (s: number) => {
    if (s > 90) return 'bg-accent-cyan/20';
    if (s > 70) return 'bg-accent-indigo/20';
    if (s > 40) return 'bg-amber-400/20';
    return 'bg-accent-rose/20';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="glass p-5 rounded-2xl neon-border relative overflow-hidden group">
        <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
          <Target size={80} />
        </div>
        <div className="flex items-center gap-2 text-slate-400 text-[10px] font-mono uppercase tracking-widest mb-1">
          <Target size={12} className="text-accent-cyan" /> Representativeness
        </div>
        <div className={`text-3xl font-bold ${getScoreColor(score)} font-mono`}>
          {score}%
        </div>
        <div className="mt-3 w-full h-1 bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            className={`h-full ${getScoreBg(score).replace('/20', '')}`}
          />
        </div>
      </div>

      <div className="glass p-5 rounded-2xl neon-border relative overflow-hidden">
        <div className="flex items-center gap-2 text-slate-400 text-[10px] font-mono uppercase tracking-widest mb-1">
          <AlertCircle size={12} className="text-accent-rose" /> KL Divergence
        </div>
        <div className="text-3xl font-bold text-slate-100 font-mono">
          {metrics.klDivergence.toFixed(4)}
        </div>
        <div className="text-[10px] text-slate-500 mt-1 uppercase font-mono">Information Loss</div>
      </div>

      <div className="glass p-5 rounded-2xl neon-border relative overflow-hidden">
        <div className="flex items-center gap-2 text-slate-400 text-[10px] font-mono uppercase tracking-widest mb-1">
          <Zap size={12} className="text-amber-400" /> Standard Error
        </div>
        <div className="text-3xl font-bold text-slate-100 font-mono">
          ±{(metrics.standardError / 1000).toFixed(2)}k
        </div>
        <div className="text-[10px] text-slate-500 mt-1 uppercase font-mono">Mean Uncertainty</div>
      </div>

      <div className="glass p-5 rounded-2xl neon-border relative overflow-hidden">
        <div className="flex items-center gap-2 text-slate-400 text-[10px] font-mono uppercase tracking-widest mb-1">
          <Percent size={12} className="text-accent-indigo" /> Relative Bias
        </div>
        <div className="text-3xl font-bold text-slate-100 font-mono">
          {((metrics.mse / 100000000) * 100).toFixed(1)}%
        </div>
        <div className="text-[10px] text-slate-500 mt-1 uppercase font-mono">Metric Variance</div>
      </div>
    </div>
  );
}
