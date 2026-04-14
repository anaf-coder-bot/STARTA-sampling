import { DataPoint, AgeGroup, UserType, SamplingMethod } from './types';

function randn_bm(min: number, max: number, skew: number) {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

  num = num / 10.0 + 0.5;
  if (num > 1 || num < 0) num = randn_bm(min, max, skew);
  else {
    num = Math.pow(num, skew);
    num *= max - min;
    num += min;
  }
  return num;
}

export function generatePopulation(size: number = 1000): DataPoint[] {
  const ageGroups: AgeGroup[] = ['Young', 'Adult', 'Senior'];
  const userTypes: UserType[] = ['Free', 'Pro', 'Enterprise'];
  
  return Array.from({ length: size }, (_, i) => {
    const ageGroup = ageGroups[Math.floor(Math.random() * ageGroups.length)];
    const userType = userTypes[i % userTypes.length];
    
    const skew = userType === 'Enterprise' ? 0.8 : userType === 'Pro' ? 1.0 : 1.5;
    const income = randn_bm(20000, 200000, skew);

    return {
      id: `p-${i}`,
      income,
      ageGroup,
      userType,
      x: Math.random() * 100,
      y: Math.random() * 100,
    };
  });
};

export function performSampling(
  population: DataPoint[],
  method: SamplingMethod,
  sampleSize: number,
  params: { strata?: 'ageGroup' | 'userType' } = {}
): DataPoint[] {
  const n = Math.min(sampleSize, population.length);
  const N = population.length;

  switch (method) {
    case 'Simple': {
      const shuffled = [...population].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, n);
    }

    case 'Systematic': {
      const k = Math.floor(N / n);
      const start = Math.floor(Math.random() * k);
      const sample: DataPoint[] = [];
      for (let i = 0; i < n; i++) {
        sample.push(population[(start + i * k) % N]);
      }
      return sample;
    }

    case 'Stratified': {
      const strataKey = params.strata || 'userType';
      const groups: Record<string, DataPoint[]> = {};
      
      population.forEach(p => {
        const key = p[strataKey];
        if (!groups[key]) groups[key] = [];
        groups[key].push(p);
      });

      const keys = Object.keys(groups);
      const perStrata = Math.floor(n / keys.length);
      let sample: DataPoint[] = [];

      keys.forEach(key => {
        const group = groups[key];
        const groupSample = [...group]
          .sort(() => 0.5 - Math.random())
          .slice(0, Math.min(perStrata, group.length));
        sample = [...sample, ...groupSample];
      });

      if (sample.length < n) {
        const remaining = population.filter(p => !sample.find(s => s.id === p.id));
        sample = [...sample, ...remaining.slice(0, n - sample.length)];
      }
      return sample;
    }

    case 'Reservoir': {
      const reservoir: DataPoint[] = population.slice(0, n);
      for (let i = n; i < N; i++) {
        const j = Math.floor(Math.random() * (i + 1));
        if (j < n) {
          reservoir[j] = population[i];
        }
      }
      return reservoir;
    }

    default:
      return population.slice(0, n);
  }
}

export function calculateMetrics(population: DataPoint[], sample: DataPoint[]) {
  if (sample.length === 0) return { 
    klDivergence: 0, mse: 0, standardError: 0, marginOfError: 0, relativeBias: 0, representativeness: 0 
  };

  const popIncomes = population.map(p => p.income);
  const sampleIncomes = sample.map(p => p.income);

  const popMean = popIncomes.reduce((a, b) => a + b, 0) / popIncomes.length;
  const sampleMean = sampleIncomes.reduce((a, b) => a + b, 0) / sampleIncomes.length;

  const mse = Math.pow(popMean - sampleMean, 2);

  // Standard Error calculation
  const variance = sampleIncomes.reduce((a, b) => a + Math.pow(b - sampleMean, 2), 0) / (sampleIncomes.length - 1 || 1);
  const standardError = Math.sqrt(variance / sampleIncomes.length);
  
  // Margin of Error at 95% confidence (Z = 1.96)
  const marginOfError = 1.96 * standardError;

  // Relative Bias (%)
  const relativeBias = ((sampleMean - popMean) / popMean) * 100;

  const bins = 10;
  const min = 20000;
  const max = 200000;
  const binWidth = (max - min) / bins;

  const getDist = (data: number[]) => {
    const dist = new Array(bins).fill(0);
    data.forEach(v => {
      const b = Math.min(bins - 1, Math.floor((v - min) / binWidth));
      dist[b]++;
    });
    return dist.map(count => (count + 1) / (data.length + bins));
  };

  const p = getDist(popIncomes);
  const q = getDist(sampleIncomes);

  let kl = 0;
  for (let i = 0; i < bins; i++) {
    kl += p[i] * Math.log(p[i] / q[i]);
  };

  const representativeness = Math.max(0, 100 - (kl * 50 + (Math.abs(relativeBias) / 20) * 50));

  return {
    klDivergence: kl,
    mse,
    standardError,
    marginOfError,
    relativeBias,
    representativeness
  };
}

export function generateCSV(sample: DataPoint[]): string {
  const headers = ['ID', 'Income', 'AgeGroup', 'UserType', 'X', 'Y'];
  const rows = sample.map(p => [
    p.id,
    p.income.toFixed(2),
    p.ageGroup,
    p.userType,
    p.x.toFixed(4),
    p.y.toFixed(4)
  ]);
  
  return [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');
}
