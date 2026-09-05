import { DetectedFood, ScanResult } from './visionApi';

/**
 * Stand-in for scanMealPhoto() until a real backend exists. Returns the
 * exact same shape as the real service, so every component that calls
 * this can switch to the live API later with a one-line change --
 * see scanMeal() below, which is the only thing that needs to change.
 */
const MOCK_RESULTS: ScanResult[] = [
  {
    foods: [
      { name: 'chicken breast', proteinGrams: 35, estimatedCalories: 231, foodGroup: 'protein' },
      { name: 'brown rice', proteinGrams: 5, estimatedCalories: 216, foodGroup: 'grain' },
      { name: 'broccoli', proteinGrams: 3, estimatedCalories: 55, foodGroup: 'vegetable' },
    ],
  },
  {
    foods: [
      { name: 'greek yogurt', proteinGrams: 20, estimatedCalories: 146, foodGroup: 'dairy' },
      { name: 'granola', proteinGrams: 4, estimatedCalories: 190, foodGroup: 'grain' },
      { name: 'mixed berries', proteinGrams: 1, estimatedCalories: 42, foodGroup: 'fruit' },
    ],
  },
  {
    foods: [
      { name: 'salmon fillet', proteinGrams: 34, estimatedCalories: 280, foodGroup: 'protein' },
      { name: 'avocado', proteinGrams: 2, estimatedCalories: 234, foodGroup: 'fat' },
      { name: 'mixed greens', proteinGrams: 2, estimatedCalories: 20, foodGroup: 'vegetable' },
    ],
  },
];

export async function mockScanMealPhoto(): Promise<ScanResult> {
  // simulate real network + inference latency so the loading state feels honest
  await new Promise((resolve) => setTimeout(resolve, 1400));
  return MOCK_RESULTS[Math.floor(Math.random() * MOCK_RESULTS.length)];
}

export function totalProtein(foods: DetectedFood[]): number {
  return foods.reduce((sum, f) => sum + f.proteinGrams, 0);
}
