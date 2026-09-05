import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { ProgressDots } from './ProgressDots';
import { OnboardingData, Goal } from '../../types/onboarding';
import { colors, type, spacing, radius } from '../../theme';

const GOAL_OPTIONS: Goal[] = [
  'build muscle',
  'get stronger',
  'fuel my training better',
  'eat more balanced',
  'build healthier habits',
];

interface GoalStepProps {
  data: OnboardingData;
  onChange: (updates: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function GoalStep({ data, onChange, onNext, onBack }: GoalStepProps) {
  return (
    <View style={styles.wrap}>
      <View>
        <ProgressDots total={7} current={3} />
        <Text style={styles.title}>what are you working toward</Text>
        <Text style={styles.sub}>pick what feels closest — you can change this anytime.</Text>

        <View style={styles.list}>
          {GOAL_OPTIONS.map((opt) => (
            <Pressable
              key={opt}
              style={[styles.pill, data.goal === opt && styles.pillActive]}
              onPress={() => onChange({ goal: opt })}
            >
              <Text style={[styles.pillText, data.goal === opt && styles.pillTextActive]}>{opt}</Text>
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
  list: { gap: 7 },
  pill: { backgroundColor: colors.peach, borderRadius: radius.md, paddingVertical: 13, paddingHorizontal: spacing.md },
  pillActive: { backgroundColor: colors.clementine },
  pillText: { fontSize: 12.5, fontWeight: '600' as const, color: colors.espresso, textTransform: 'capitalize' },
  pillTextActive: { color: colors.white },
  btn: { backgroundColor: colors.clementine, borderRadius: radius.lg, paddingVertical: 15, alignItems: 'center' },
  btnText: { color: colors.white, fontWeight: '700' as const, fontSize: 14 },
  backLink: { alignItems: 'center', paddingVertical: spacing.sm },
  backLinkText: { color: colors.espressoSoft, fontWeight: '600' as const, fontSize: 12 },
});
