export type ActivityLevel = 'light' | 'active' | 'very active';
export type TrainingFrequency = '0-2x' | '3-4x' | '5-6x' | '7x+';
export type Goal = 'build muscle' | 'get stronger' | 'fuel my training better' | 'eat more balanced' | 'build healthier habits';

export interface OnboardingData {
  age: string;
  heightFeet: string;
  heightInches: string;
  weightLbs: string;
  activityLevel: ActivityLevel;
  trainingFrequency: TrainingFrequency;
  goal: Goal;
  proteinGoal: number | null; // null until calculated on the reveal step
  appleHealthConnected: boolean;
}

export const defaultOnboardingData: OnboardingData = {
  age: '',
  heightFeet: '',
  heightInches: '',
  weightLbs: '',
  activityLevel: 'active',
  trainingFrequency: '3-4x',
  goal: 'build muscle',
  proteinGoal: null,
  appleHealthConnected: false,
};
