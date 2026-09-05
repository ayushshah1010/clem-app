import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Mascot } from '../../components/Mascot';
import { colors, type, spacing, radius } from '../../theme';

export function DoneStep({ onFinish }: { onFinish: () => void }) {
  return (
    <View style={styles.wrap}>
      <View style={styles.center}>
        <Mascot size={76} expression="celebrating" />
        <Text style={styles.title}>you're all set 🍊</Text>
        <Text style={styles.sub}>let's see how you're fueling today.</Text>
      </View>
      <Pressable style={styles.btn} onPress={onFinish}>
        <Text style={styles.btnText}>go to today</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, justifyContent: 'space-between', padding: spacing.xl, paddingTop: 80, paddingBottom: 60 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.sm },
  title: { ...type.sectionTitle, fontSize: 20, color: colors.espresso, marginTop: spacing.md },
  sub: { ...type.bodySmall, color: colors.espressoSoft, textAlign: 'center' },
  btn: { backgroundColor: colors.clementine, borderRadius: radius.lg, paddingVertical: 15, alignItems: 'center' },
  btnText: { color: colors.white, fontWeight: '700' as const, fontSize: 14 },
});
