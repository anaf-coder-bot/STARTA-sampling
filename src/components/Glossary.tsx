'use client';

import React, { useState } from 'react';
import { ChevronDown, BookOpen, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const items = [
  {
    title: 'Representativeness',
    content: 'How accurately a sample reflects the characteristics of the entire population. High representativeness minimizes selection bias.',
    formula: '$$R = 100 - (\\text{Bias Penalty})$$'
  },
  {
    title: 'KL Divergence',
    content: 'A measure (in bits/nats) of how the sample distribution "diverges" from the population distribution. It quantifies information loss when approximating P with Q.',
    formula: '$$D_{KL}(P || Q) = \\sum P(x) \\log \\frac{P(x)}{Q(x)}$$'
  },
  {
    title: 'Standard Error (SE)',
    content: 'The standard deviation of the sampling distribution. It measures how much the sample mean is expected to vary from the true population mean.',
    formula: '$$SE = \\frac{\\sigma}{\\sqrt{n}}$$'
  },
  {
    title: 'Relative Bias',
    content: 'The percentage difference between the sample mean and the true population mean, indicating the direction and magnitude of systematic error.',
    formula: '$$\\text{Bias} = \\frac{\\bar{x} - \\mu}{\\mu} \\times 100$$'
  }
];

export default function Glossary() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden">
      <div className="p-4 border-b border-zinc-800 flex items-center gap-2">
        <BookOpen size={16} className="text-indigo-500" />
        <h3 className="text-sm font-semibold tracking-tight">Statistical Insights</h3>
      </div>
      
      <div className="divide-y divide-zinc-800">
        {items.map((item, i) => (
          <div key={item.title} className="bg-zinc-950">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full p-4 flex items-center justify-between hover:bg-zinc-900 transition-colors text-left"
            >
              <span className="text-xs font-medium text-zinc-300">{item.title}</span>
              <ChevronDown 
                size={14} 
                className={`text-zinc-500 transition-transform duration-200 ${openIndex === i ? 'rotate-180' : ''}`} 
              />
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 pt-0 space-y-3">
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      {item.content}
                    </p>
                    <div className="p-3 bg-zinc-900/50 rounded-lg border border-zinc-800 text-sm font-serif italic text-zinc-400">
                      {item.formula}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <div className="p-4 bg-zinc-900/20">
        <div className="flex gap-3 p-3 rounded-lg border border-indigo-500/20 bg-indigo-500/5 items-start">
          <AlertCircle size={14} className="text-indigo-500 mt-0.5" />
          <p className="text-[10px] text-zinc-500 leading-normal italic">
            Confidence intervals are calculated at a standard <span className="text-indigo-400">Z-score of 1.96</span>, covering 95% of expected variances.
          </p>
        </div>
      </div>
    </div>
  );
}
