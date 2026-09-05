import React, { useState } from 'react';
import { View, Text, Pressable, Modal, Image, ActivityIndicator, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Svg, { Path, Circle } from 'react-native-svg';
import { colors, type, spacing, radius } from '../theme';
import { Mascot } from './Mascot';
import { scanMeal } from '../services/scanMeal';
import { DetectedFood } from '../services/visionApi';

type Step = 'intro' | 'loading' | 'results' | 'confirmed';

interface ScanMealModalProps {
  visible: boolean;
  onClose: () => void;
  onLogMeal: (foods: DetectedFood[]) => void;
}

export function ScanMealModal({ visible, onClose, onLogMeal }: ScanMealModalProps) {
  const [step, setStep] = useState<Step>('intro');
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [foods, setFoods] = useState<DetectedFood[]>([]);

  const reset = () => {
    setStep('intro');
    setPhotoUri(null);
    setFoods([]);
  };

  const handleClose = () => {
    onClose();
    setTimeout(reset, 250);
  };

  const runScan = async (uri: string) => {
    setPhotoUri(uri);
    setStep('loading');
    try {
      const result = await scanMeal(uri);
      setFoods(result.foods);
      setStep('results');
    } catch (err) {
      console.error('Scan failed:', err);
      setStep('intro'); // TODO: real error state once backend exists
    }
  };

  const pickFrom = async (source: 'camera' | 'library') => {
    const permission =
      source === 'camera'
        ? await ImagePicker.requestCameraPermissionsAsync()
        : await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) return;

    const result =
      source === 'camera'
        ? await ImagePicker.launchCameraAsync({ quality: 0.6, allowsEditing: true, aspect: [1, 1] })
        : await ImagePicker.launchImageLibraryAsync({ quality: 0.6, allowsEditing: true, aspect: [1, 1] });

    if (!result.canceled && result.assets[0]) {
      runScan(result.assets[0].uri);
    }
  };

  const removeFood = (index: number) => {
    setFoods((prev) => prev.filter((_, i) => i !== index));
  };

  const confirmLog = () => {
    onLogMeal(foods);
    setStep('confirmed');
  };

  const totalProtein = foods.reduce((sum, f) => sum + f.proteinGrams, 0);

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={handleClose}>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          {step === 'intro' && (
            <View style={styles.introWrap}>
              <View style={styles.navRow}>
                <Pressable style={styles.backBtn} onPress={handleClose}>
                  <Svg width={13} height={13} viewBox="0 0 24 24" fill="none">
                    <Path d="M15 18l-6-6 6-6" stroke={colors.espresso} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
                  </Svg>
                </Pressable>
                <Text style={styles.navTitle}>scan a meal</Text>
              </View>

              <View style={styles.introCenter}>
                <Mascot size={64} expression="encouraging" />
                <Text style={styles.introText}>snap a photo and clem will figure out the rest</Text>
              </View>

              <Pressable style={styles.primaryBtn} onPress={() => pickFrom('camera')}>
                <Text style={styles.primaryBtnText}>take a photo</Text>
              </Pressable>
              <Pressable style={styles.secondaryBtn} onPress={() => pickFrom('library')}>
                <Text style={styles.secondaryBtnText}>choose from library</Text>
              </Pressable>
            </View>
          )}

          {step === 'loading' && (
            <View style={styles.loadingWrap}>
              {photoUri && <Image source={{ uri: photoUri }} style={styles.previewImage} />}
              <ActivityIndicator color={colors.clementine} style={{ marginTop: spacing.lg }} />
              <Text style={styles.loadingText}>clem's taking a look...</Text>
            </View>
          )}

          {step === 'results' && (
            <View style={styles.resultsWrap}>
              <Text style={styles.navTitle}>here's what clem sees</Text>
              <Text style={styles.resultsSub}>tap the × on anything that's wrong</Text>

              {foods.map((food, i) => (
                <View key={`${food.name}-${i}`} style={styles.foodRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.foodName}>{food.name}</Text>
                    <Text style={styles.foodMeta}>{food.proteinGrams}g protein</Text>
                  </View>
                  <Pressable style={styles.removeBtn} onPress={() => removeFood(i)}>
                    <Text style={styles.removeBtnText}>×</Text>
                  </Pressable>
                </View>
              ))}

              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>total protein</Text>
                <Text style={styles.totalValue}>{totalProtein}g</Text>
              </View>

              <Pressable style={styles.primaryBtn} onPress={confirmLog} disabled={foods.length === 0}>
                <Text style={styles.primaryBtnText}>looks good, log it</Text>
              </Pressable>
            </View>
          )}

          {step === 'confirmed' && (
            <View style={styles.confirmWrap}>
              <View style={styles.confirmCard}>
                <Mascot size={70} expression="celebrating" />
                <Text style={styles.confirmTitle}>nice :) 🍊</Text>
                <Text style={styles.confirmSub}>
                  solid protein hit — {totalProtein}g from this meal. logged to today.
                </Text>
              </View>
              <Pressable style={styles.primaryBtn} onPress={handleClose}>
                <Text style={styles.primaryBtnText}>done</Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(36,27,21,0.35)', justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: colors.cream,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: spacing.xl,
    minHeight: 520,
  },
  navRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.lg },
  backBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.peach,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  navTitle: { ...type.sectionTitle, color: colors.espresso },

  introWrap: { flex: 1, justifyContent: 'space-between' },
  introCenter: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.md },
  introText: { ...type.body, color: colors.espressoSoft, textAlign: 'center', maxWidth: 220 },

  primaryBtn: { backgroundColor: colors.clementine, borderRadius: radius.lg, paddingVertical: 15, alignItems: 'center', marginTop: spacing.sm },
  primaryBtnText: { color: colors.white, fontWeight: '700' as const, fontSize: 14 },
  secondaryBtn: { paddingVertical: 14, alignItems: 'center' },
  secondaryBtnText: { color: colors.espressoSoft, fontWeight: '700' as const, fontSize: 13 },

  loadingWrap: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  previewImage: { width: 140, height: 140, borderRadius: radius.lg },
  loadingText: { ...type.bodySmall, color: colors.espressoSoft, marginTop: spacing.sm },

  resultsWrap: { flex: 1 },
  resultsSub: { ...type.bodySmall, color: colors.espressoSoft, marginBottom: spacing.md },
  foodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.peach,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  foodName: { fontSize: 13, fontWeight: '700' as const, color: colors.espresso, textTransform: 'capitalize' },
  foodMeta: { ...type.bodySmall, color: colors.espressoSoft, marginTop: 2 },
  removeBtn: { width: 26, height: 26, borderRadius: 13, backgroundColor: colors.cream, alignItems: 'center', justifyContent: 'center' },
  removeBtnText: { color: colors.rust, fontSize: 15, fontWeight: '700' as const, lineHeight: 16 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', paddingTop: spacing.sm, marginTop: spacing.xs },
  totalLabel: { ...type.label, color: colors.rust },
  totalValue: { ...type.dataMedium, color: colors.espresso },

  confirmWrap: { flex: 1, justifyContent: 'space-between' },
  confirmCard: { backgroundColor: colors.peach, borderRadius: radius.xl, padding: spacing.xxl, alignItems: 'center', marginTop: spacing.xl, flex: 1, justifyContent: 'center' },
  confirmTitle: { ...type.sectionTitle, fontSize: 19, color: colors.espresso, marginTop: spacing.sm },
  confirmSub: { ...type.bodySmall, color: colors.espressoSoft, textAlign: 'center', marginTop: 4, maxWidth: 220 },
});
