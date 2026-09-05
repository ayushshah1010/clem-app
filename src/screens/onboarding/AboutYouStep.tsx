import React from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { ProgressDots } from './ProgressDots';
import { OnboardingData } from '../../types/onboarding';
import { colors, type, spacing, radius } from '../../theme';

interface AboutYouStepProps {
  data: OnboardingData;
  onChange: (updates: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function AboutYouStep({ data, onChange, onNext, onBack }: AboutYouStepProps) {
  const canContinue = data.age && data.heightFeet && data.weightLbs;

  return (
    <View style={styles.wrap}>
      <View>
        <ProgressDots total={7} current={1} />
        <Text style={styles.title}>a little about you</Text>
        <Text style={styles.sub}>helps us understand your energy needs — never about a number on a scale.</Text>

        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>age</Text>
          <TextInput
            style={styles.fieldInput}
            keyboardType="number-pad"
            value={data.age}
            onChangeText={(v) => onChange({ age: v.replace(/[^0-9]/g, '') })}
            placeholder="23"
            placeholderTextColor={colors.espressoSoft}
          />
        </View>

        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>height</Text>
          <View style={styles.heightInputs}>
            <TextInput
              style={[styles.fieldInput, styles.heightInput]}
              keyboardType="number-pad"
              value={data.heightFeet}
              onChangeText={(v) => onChange({ heightFeet: v.replace(/[^0-9]/g, '') })}
              placeholder="5"
              placeholderTextColor={colors.espressoSoft}
            />
            <Text style={styles.heightUnit}>ft</Text>
            <TextInput
              style={[styles.fieldInput, styles.heightInput]}
              keyboardType="number-pad"
              value={data.heightInches}
              onChangeText={(v) => onChange({ heightInches: v.replace(/[^0-9]/g, '') })}
              placeholder="6"
              placeholderTextColor={colors.espressoSoft}
            />
            <Text style={styles.heightUnit}>in</Text>
          </View>
        </View>

        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>weight</Text>
          <TextInput
            style={styles.fieldInput}
            keyboardType="number-pad"
            value={data.weightLbs}
            onChangeText={(v) => onChange({ weightLbs: v.replace(/[^0-9]/g, '') })}
            placeholder="142"
            placeholderTextColor={colors.espressoSoft}
          />
        </View>
      </View>

      <View>
        <Pressable style={[styles.btn, !canContinue && styles.btnDisabled]} onPress={onNext} disabled={!canContinue}>
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
  fieldRow: {
    backgroundColor: colors.peach,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    marginBottom: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fieldLabel: { fontSize: 11, fontWeight: '700' as const, color: colors.espressoSoft },
  fieldInput: { fontSize: 16, fontWeight: '800' as const, color: colors.espresso, textAlign: 'right', minWidth: 50 },
  heightInputs: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  heightInput: { minWidth: 30 },
  heightUnit: { fontSize: 11, color: colors.espressoSoft, marginRight: 6 },
  btn: { backgroundColor: colors.clementine, borderRadius: radius.lg, paddingVertical: 15, alignItems: 'center' },
  btnDisabled: { opacity: 0.4 },
  btnText: { color: colors.white, fontWeight: '700' as const, fontSize: 14 },
  backLink: { alignItems: 'center', paddingVertical: spacing.sm },
  backLinkText: { color: colors.espressoSoft, fontWeight: '600' as const, fontSize: 12 },
});
