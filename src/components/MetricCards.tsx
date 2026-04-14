'use client';

import React from 'react';
import { Target, Info, Activity, Percent } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

interface MetricCardsProps {
  metrics: {
    klDivergence: number;
    marginOfError: number;
    relativeBias: number;
    representativeness: number;
  };
}

export default function MetricCards({ metrics }: MetricCardsProps) {
  const { t } = useLanguage();
  
  const cards = [
    {
      label: t('representativeness'),
      value: `${Math.round(metrics.representativeness)}%`,
      icon: Target,
      color: 'text-indigo-500',
      description: t('accuracyVsPop')
    },
    {
      label: t('marginOfError'),
      value: `±${(metrics.marginOfError / 1000).toFixed(2)}k`,
      icon: Info,
      color: 'text-zinc-400',
      description: t('confidenceThreshold')
    },
    {
      label: t('relativeBias'),
      value: `${metrics.relativeBias.toFixed(2)}%`,
      icon: Percent,
      color: 'text-zinc-400',
      description: t('systemicDeviation')
    },
    {
      label: t('klDivergence'),
      value: metrics.klDivergence.toFixed(4),
      icon: Activity,
      color: 'text-zinc-400',
      description: t('infoEntropy')
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-zinc-950 border border-zinc-800 p-5 rounded-xl hover:border-zinc-700 transition-colors group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{card.label}</span>
            <card.icon size={14} className={card.color} />
          </div>
          <div className="text-2xl font-mono font-semibold tracking-tighter text-zinc-50 mb-1">
            {card.value}
          </div>
          <div className="text-[10px] text-zinc-500 font-medium">
            {card.description}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
