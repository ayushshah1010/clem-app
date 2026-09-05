/**
 * IMPORTANT: this file must never import a vision-provider API key directly.
 * The client calls OUR backend (clem-backend, deployed on Vercel), and
 * that backend holds the real OpenAI key server-side. If you find
 * yourself adding an OPENAI_API_KEY to this file, stop -- that key
 * would ship inside the compiled app and be extractable by anyone.
 * Put the key in clem-backend's Vercel environment instead.
 *
 * Auth note: the backend currently checks a shared secret (not
 * per-user auth) -- see clem-backend/README.md's TODO. Replace
 * EXPO_PUBLIC_APP_SHARED_SECRET with a real per-user token once
 * Supabase auth (or equivalent) exists.
 */

const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;
const APP_SHARED_SECRET = process.env.EXPO_PUBLIC_APP_SHARED_SECRET;

export interface DetectedFood {
  name: string;
  proteinGrams: number;
  estimatedCalories: number;
  foodGroup: 'protein' | 'vegetable' | 'fruit' | 'grain' | 'dairy' | 'fat' | 'other';
}

export interface ScanResult {
  foods: DetectedFood[];
}

/** True once a real backend is configured -- used by scanMeal.ts to
 *  decide between this and the mock, so nothing else has to know. */
export function hasRealBackend(): boolean {
  return Boolean(BACKEND_URL && APP_SHARED_SECRET);
}

export async function scanMealPhoto(photoBase64: string): Promise<ScanResult> {
  if (!BACKEND_URL || !APP_SHARED_SECRET) {
    throw new Error('Backend not configured -- see clem-backend/README.md');
  }

  const response = await fetch(`${BACKEND_URL}/api/scan-meal`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-app-secret': APP_SHARED_SECRET,
    },
    body: JSON.stringify({ photo: photoBase64 }),
  });

  if (!response.ok) {
    throw new Error(`Scan request failed: ${response.status}`);
  }

  return response.json();
}
