import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Mascot, MascotExpression } from './Mascot';
import { colors, type, spacing, radius } from '../theme';

interface CheckinCardProps {
  title: string;
  subtitle: string;
  expression?: MascotExpression;
  onPress?: () => void;
}

export function CheckinCard({ title, subtitle, expression = 'content', onPress }: CheckinCardProps) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <Mascot size={52} expression={expression} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      {onPress && <Text style={styles.hint}>tap clem to say hi</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.peach,
    borderRadius: radius.xl,
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  pressed: { transform: [{ scale: 0.98 }] },
  title: { ...type.sectionTitle, color: colors.espresso, marginTop: spacing.xs },
  subtitle: { ...type.bodySmall, color: colors.espressoSoft, marginTop: 2, textAlign: 'center' },
  hint: { ...type.bodySmall, color: colors.clementine, fontWeight: '700' as const, marginTop: spacing.sm },
});
