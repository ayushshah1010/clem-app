import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Mascot } from '../../components/Mascot';
import { colors, type, spacing, radius } from '../../theme';

export function WelcomeStep({ onNext }: { onNext: () => void }) {
  return (
    <View style={styles.wrap}>
      <View style={styles.center}>
        <Mascot size={76} expression="content" />
        <Text style={styles.title}>hi, i'm clem 🍊</Text>
        <Text style={styles.sub}>the food tracker for non-restrictive gym girlies. information, not obsession.</Text>
      </View>
      <Pressable style={styles.btn} onPress={onNext}>
        <Text style={styles.btnText}>let's get started</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, justifyContent: 'space-between', padding: spacing.xl, paddingTop: 80, paddingBottom: 60 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.sm },
  title: { ...type.sectionTitle, fontSize: 20, color: colors.espresso, marginTop: spacing.md },
  sub: { ...type.bodySmall, color: colors.espressoSoft, textAlign: 'center', maxWidth: 240, lineHeight: 17 },
  btn: { backgroundColor: colors.clementine, borderRadius: radius.lg, paddingVertical: 15, alignItems: 'center' },
  btnText: { color: colors.white, fontWeight: '700' as const, fontSize: 14 },
});
