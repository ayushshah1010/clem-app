import React, { useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { ProgressDots } from './ProgressDots';
import { OnboardingData } from '../../types/onboarding';
import { calculateProteinGoal } from '../../utils/calculateProteinGoal';
import { colors, type, spacing, radius } from '../../theme';

interface ProteinRevealStepProps {
  data: OnboardingData;
  onChange: (updates: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function ProteinRevealStep({ data, onChange, onNext, onBack }: ProteinRevealStepProps) {
  useEffect(() => {
    if (data.proteinGoal === null) {
      const weight = parseInt(data.weightLbs, 10) || 0;
      onChange({ proteinGoal: calculateProteinGoal(weight, data.goal) });
    }
  }, [data.proteinGoal, data.weightLbs, data.goal, onChange]);

  const adjust = (delta: number) => {
    onChange({ proteinGoal: Math.max(40, (data.proteinGoal ?? 100) + delta) });
  };

  return (
    <View style={styles.wrap}>
      <View>
        <ProgressDots total={7} current={4} />
        <Text style={styles.title}>your protein goal</Text>
        <Text style={styles.sub}>calculated from what you told us — the one number clem always shows.</Text>

        <View style={styles.hero}>
          <Text style={styles.heroNum}>{data.proteinGoal ?? '--'}</Text>
          <Text style={styles.heroUnit}>grams / day</Text>
          <View style={styles.adjustRow}>
            <Pressable style={styles.adjustBtn} onPress={() => adjust(-5)}>
              <Text style={styles.adjustBtnText}>–</Text>
            </Pressable>
            <Text style={styles.adjustLabel}>customize</Text>
            <Pressable style={styles.adjustBtn} onPress={() => adjust(5)}>
              <Text style={styles.adjustBtnText}>+</Text>
            </Pressable>
          </View>
        </View>
      </View>

      <View>
        <Pressable style={styles.btn} onPress={onNext}>
          <Text style={styles.btnText}>continue</Text>
        </Pressable>
        <Pressable onPress={onBack} style={styles.backLink}>
          <Text style={styles.backLinkText}>back</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, justifyContent: 'space-between', padding: spacing.xl, paddingTop: 60, paddingBottom: 40 },
  title: { ...type.sectionTitle, fontSize: 19, color: colors.espresso, textAlign: 'center', marginBottom: 6 },
  sub: { ...type.bodySmall, color: colors.espressoSoft, textAlign: 'center', marginBottom: spacing.lg, lineHeight: 16 },
  hero: { backgroundColor: colors.peach, borderRadius: radius.xl, paddingVertical: spacing.xxl, alignItems: 'center' },
  heroNum: { ...type.dataLarge, fontSize: 42, color: colors.espresso },
  heroUnit: { fontSize: 12, color: colors.espressoSoft, fontWeight: '600' as const, marginTop: 2 },
  adjustRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginTop: spacing.lg },
  adjustBtn: { width: 30, height: 30, borderRadius: 15, backgroundColor: colors.clementine, alignItems: 'center', justifyContent: 'center' },
  adjustBtnText: { color: colors.white, fontSize: 16, fontWeight: '700' as const },
  adjustLabel: { fontSize: 10.5, fontWeight: '700' as const, color: colors.rust },
  btn: { backgroundColor: colors.clementine, borderRadius: radius.lg, paddingVertical: 15, alignItems: 'center' },
  btnText: { color: colors.white, fontWeight: '700' as const, fontSize: 14 },
  backLink: { alignItems: 'center', paddingVertical: spacing.sm },
  backLinkText: { color: colors.espressoSoft, fontWeight: '600' as const, fontSize: 12 },
});
