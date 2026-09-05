import { Goal } from '../types/onboarding';

/**
 * Rough starting-point protein target, grams/lb of bodyweight, by goal.
 * NOT medical advice -- a reasonable default the user can override
 * (see the "customize this" link on the reveal screen). Real sports
 * nutrition guidance varies 0.6-1g/lb depending on many factors this
 * simple formula doesn't account for.
 */
const GRAMS_PER_LB: Record<Goal, number> = {
  'build muscle': 1.0,
  'get stronger': 0.9,
  'fuel my training better': 0.8,
  'eat more balanced': 0.7,
  'build healthier habits': 0.6,
};

export function calculateProteinGoal(weightLbs: number, goal: Goal): number {
  if (!weightLbs || weightLbs <= 0) return 100; // sane fallback if weight wasn't entered
  const factor = GRAMS_PER_LB[goal];
  return Math.round(weightLbs * factor);
}
