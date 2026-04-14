'use client';

import React, { useState, useEffect, useMemo } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import MetricCards from '@/components/MetricCards';
import SamplingControls from '@/components/SamplingControls';
import DataVisualizer from '@/components/DataVisualizer';
import DataTable from '@/components/DataTable';
import TechSpecs from '@/components/TechSpecs';
import Glossary from '@/components/Glossary';
import { generatePopulation, performSampling, calculateMetrics, generateCSV, parseCsv } from '@/lib/math';
import { DataPoint, SamplingMethod } from '@/lib/types';
import { Activity } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Home() {
  const { language } = useLanguage();
  
  const [population, setPopulation] = useState<DataPoint[]>([]);
  const [method, setMethod] = useState<SamplingMethod>('Simple');
  const [sampleSize, setSampleSize] = useState(100);
  const [strata, setStrata] = useState<'ageGroup' | 'userType'>('userType');
  const [sample, setSample] = useState<DataPoint[]>([]);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isCustom, setIsCustom] = useState(false);

  useEffect(() => {
    if (!isCustom) {
      setPopulation(generatePopulation(1000));
    }
    setIsInitializing(false);
  }, [isCustom]);

  const handleImport = (text: string) => {
    const customPop = parseCsv(text);
    if (customPop.length > 0) {
      setPopulation(customPop);
      setIsCustom(true);
      // Adjust sample size if necessary
      if (sampleSize > customPop.length) {
        setSampleSize(Math.min(100, customPop.length));
      }
    }
  };

  const handleReset = () => {
    setIsCustom(false);
    setPopulation(generatePopulation(1000));
  };

  useEffect(() => {
    if (population.length === 0) return;
    setSample(performSampling(population, method, sampleSize, { strata }));
  }, [population, method, sampleSize, strata]);

  const metrics = useMemo(() => {
    return calculateMetrics(population, sample);
  }, [population, sample]);

  const handleExport = () => {
    if (sample.length === 0) return;
    const csvContent = generateCSV(sample);
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `sampling_extract_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center font-mono text-indigo-500">
        <Activity className="animate-spin" size={24} />
      </div>
    );
  }

  return (
    <DashboardLayout 
      projectTitle="STRATA ENGINE v1.0" 
      onExport={handleExport}
      sidebar={
        <SamplingControls
          method={method}
          setMethod={setMethod}
          sampleSize={sampleSize}
          setSampleSize={setSampleSize}
          strata={strata}
          setStrata={setStrata}
          onImport={handleImport}
          onReset={handleReset}
          isCustom={isCustom}
          maxPoints={population.length}
        />
      }
    >
      <div className="space-y-8 overflow-hidden">
        <section>
          <MetricCards metrics={metrics} />
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{language === 'am' ? 'የእይታ መድረክ' : 'Visualization Stage'}</h2>
            <div className="h-[1px] flex-1 bg-zinc-900" />
          </div>
          <DataVisualizer population={population} sample={sample} />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <DataTable sample={sample} />
          </div>
          <div className="lg:col-span-4 space-y-6">
            <TechSpecs 
              sampleSize={sample.length} 
              popSize={population.length} 
              metrics={metrics} 
            />
            <Glossary />
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
