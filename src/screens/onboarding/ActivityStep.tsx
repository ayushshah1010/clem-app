import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { ProgressDots } from './ProgressDots';
import { OnboardingData, ActivityLevel, TrainingFrequency } from '../../types/onboarding';
import { colors, type, spacing, radius } from '../../theme';

const ACTIVITY_OPTIONS: ActivityLevel[] = ['light', 'active', 'very active'];
const FREQUENCY_OPTIONS: TrainingFrequency[] = ['0-2x', '3-4x', '5-6x', '7x+'];

interface ActivityStepProps {
  data: OnboardingData;
  onChange: (updates: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function ActivityStep({ data, onChange, onNext, onBack }: ActivityStepProps) {
  return (
    <View style={styles.wrap}>
      <View>
        <ProgressDots total={7} current={2} />
        <Text style={styles.title}>how do you train</Text>
        <Text style={styles.sub}>roughly — this just shapes your starting numbers.</Text>

        <Text style={styles.sectionLabel}>general activity</Text>
        <View style={styles.pillRow}>
          {ACTIVITY_OPTIONS.map((opt) => (
            <Pressable
              key={opt}
              style={[styles.pill, styles.pillFlex, data.activityLevel === opt && styles.pillActive]}
              onPress={() => onChange({ activityLevel: opt })}
            >
              <Text style={[styles.pillText, data.activityLevel === opt && styles.pillTextActive]}>{opt}</Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.sectionLabel}>training / week</Text>
        <View style={styles.pillGrid}>
          {FREQUENCY_OPTIONS.map((opt) => (
            <Pressable
              key={opt}
              style={[styles.pill, styles.pillHalf, data.trainingFrequency === opt && styles.pillActive]}
              onPress={() => onChange({ trainingFrequency: opt })}
            >
              <Text style={[styles.pillText, data.trainingFrequency === opt && styles.pillTextActive]}>{opt}</Text>
            </Pressable>
          ))}
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
  sectionLabel: { ...type.label, color: colors.rust, marginBottom: spacing.sm, marginTop: spacing.md },
  pillRow: { flexDirection: 'row', gap: 7 },
  pillGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 7 },
  pill: { backgroundColor: colors.peach, borderRadius: radius.md, paddingVertical: 12, alignItems: 'center' },
  pillFlex: { flex: 1 },
  pillHalf: { width: '48%' },
  pillActive: { backgroundColor: colors.clementine },
  pillText: { fontSize: 12, fontWeight: '600' as const, color: colors.espresso },
  pillTextActive: { color: colors.white },
  btn: { backgroundColor: colors.clementine, borderRadius: radius.lg, paddingVertical: 15, alignItems: 'center' },
  btnText: { color: colors.white, fontWeight: '700' as const, fontSize: 14 },
  backLink: { alignItems: 'center', paddingVertical: spacing.sm },
  backLinkText: { color: colors.espressoSoft, fontWeight: '600' as const, fontSize: 12 },
});
