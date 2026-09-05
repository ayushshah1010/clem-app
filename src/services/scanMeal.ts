import * as FileSystem from 'expo-file-system';
import { ScanResult, scanMealPhoto, hasRealBackend } from './visionApi';
import { mockScanMealPhoto } from './mockVisionApi';

/**
 * Every screen/component should call THIS function, never visionApi.ts
 * or mockVisionApi.ts directly.
 *
 * Automatically uses the real backend (clem-backend on Vercel) once
 * EXPO_PUBLIC_BACKEND_URL and EXPO_PUBLIC_APP_SHARED_SECRET are set in
 * .env, and quietly falls back to mock data otherwise -- so local
 * development never breaks just because the backend isn't configured
 * yet, and nothing needs to change in the UI layer when it is.
 */
export async function scanMeal(photoUri: string): Promise<ScanResult> {
  if (!hasRealBackend()) {
    return mockScanMealPhoto();
  }

  const base64 = await FileSystem.readAsStringAsync(photoUri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  return scanMealPhoto(base64);
}
