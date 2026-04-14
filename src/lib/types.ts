export type AgeGroup = 'Young' | 'Adult' | 'Senior';
export type UserType = 'Free' | 'Pro' | 'Enterprise';

export interface DataPoint {
  id: string;
  income: number;
  ageGroup: AgeGroup;
  userType: UserType;
  x: number;
  y: number;
};

export type SamplingMethod = 'Simple' | 'Stratified' | 'Systematic' | 'Reservoir';

export interface SamplingResults {
  sample: DataPoint[];
  metrics: {
    klDivergence: number;
    mse: number;
    standardError: number;
    marginOfError: number;
    relativeBias: number;
    representativeness: number;
  };
}
