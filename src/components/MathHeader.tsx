import React from 'react';
import Latex from 'react-latex-next';
import { SamplingMethod } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

interface MathHeaderProps {
  method: SamplingMethod;
}

const formulas: Record<SamplingMethod, string> = {
  Simple: '$$P(X=x) = \\frac{1}{N}$$',
  Stratified: '$$n_h = \\frac{N_h}{N} \\times n$$',
  Systematic: '$$k = \\lfloor \\frac{N}{n} \\rfloor, \\quad i = r + m \\times k$$',
  Reservoir: '$$P(\\text{included}) = \\frac{k}{n}$$',
};

export default function MathHeader({ method }: MathHeaderProps) {
  const { t } = useLanguage();

  return (
    <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-xl overflow-hidden relative">
      <div className="absolute top-0 right-0 p-4 opacity-5 font-mono text-4xl select-none text-zinc-500">
        {method.toUpperCase()}
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={method}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="relative z-10"
        >
          <h2 className="text-indigo-500 text-[10px] font-bold font-mono tracking-widest uppercase mb-4">Core Model // {t(`methods.${method}`)}</h2>
          <div className="text-4xl mb-6 font-serif italic text-zinc-100 flex items-center justify-center min-h-[100px] bg-zinc-900/20 rounded-lg border border-zinc-900/50">
            <Latex>{formulas[method]}</Latex>
          </div>
          <p className="text-zinc-500 text-xs max-w-2xl mx-auto text-center leading-relaxed">
            {t(`descriptions.${method}`)}
          </p>
        </motion.div>
      </AnimatePresence>

      <div className="mt-6 flex justify-between items-center text-[9px] font-mono text-zinc-600 uppercase tracking-widest border-t border-zinc-900 pt-4">
        <div className="flex gap-4">
          <span>Stochastic Engine v2.1</span>
          <span>Precision: High</span>
        </div>
        <div className="flex gap-2 items-center">
          <div className="w-1 h-1 rounded-full bg-indigo-500" />
          <span>Status: CALIBRATED</span>
        </div>
      </div>
    </div>
  );
}
