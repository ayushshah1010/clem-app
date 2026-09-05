import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { ProgressDots } from './ProgressDots';
import { colors, type, spacing, radius } from '../../theme';

interface AppleHealthStepProps {
  onConnect: () => void;
  onSkip: () => void;
  onBack: () => void;
}

export function AppleHealthStep({ onConnect, onSkip, onBack }: AppleHealthStepProps) {
  return (
    <View style={styles.wrap}>
      <View style={styles.top}>
        <ProgressDots total={7} current={5} />
      </View>

      <View style={styles.center}>
        <Svg width={56} height={56} viewBox="0 0 24 24" fill="none">
          <Path
            d="M12 21s-7-4.6-9.5-9A5.5 5.5 0 0112 5.5 5.5 5.5 0 0121.5 12c-2.5 4.4-9.5 9-9.5 9z"
            stroke={colors.clementine}
            strokeWidth={1.6}
            strokeLinejoin="round"
          />
        </Svg>
        <Text style={styles.title}>connect apple health?</Text>
        <Text style={styles.sub}>optional — lets clem see your workouts automatically instead of logging by hand.</Text>
      </View>

      <View>
        <Pressable style={styles.btn} onPress={onConnect}>
          <Text style={styles.btnText}>connect</Text>
        </Pressable>
        <Pressable onPress={onSkip} style={styles.skipLink}>
          <Text style={styles.skipLinkText}>skip for now</Text>
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
  top: { alignItems: 'center' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.sm },
  title: { ...type.sectionTitle, fontSize: 18, color: colors.espresso, marginTop: spacing.xs },
  sub: { ...type.bodySmall, color: colors.espressoSoft, textAlign: 'center', maxWidth: 240, lineHeight: 16 },
  btn: { backgroundColor: colors.clementine, borderRadius: radius.lg, paddingVertical: 15, alignItems: 'center' },
  btnText: { color: colors.white, fontWeight: '700' as const, fontSize: 14 },
  skipLink: { alignItems: 'center', paddingVertical: spacing.md },
  skipLinkText: { color: colors.espressoSoft, fontWeight: '600' as const, fontSize: 12.5 },
  backLink: { alignItems: 'center', paddingVertical: spacing.xs },
  backLinkText: { color: colors.espressoSoft, fontWeight: '600' as const, fontSize: 12 },
});
