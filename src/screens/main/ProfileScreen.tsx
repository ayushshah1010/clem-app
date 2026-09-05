import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { Mascot } from '../../components/Mascot';
import { useSettings } from '../../hooks/useSettings';
import { colors, type, spacing, radius } from '../../theme';

const mockStats = [
  { label: 'day streak', value: '12' },
  { label: 'meals logged', value: '48' },
  { label: 'workouts', value: '9' },
];

export function ProfileScreen() {
  const { showExactNumbers, toggleShowExactNumbers } = useSettings();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Mascot size={60} expression="content" />
        <Text style={styles.name}>maya rivera</Text>
        <Text style={styles.sub}>member since july 2026</Text>
      </View>

      <View style={styles.statsRow}>
        {mockStats.map((s) => (
          <View key={s.label} style={styles.statCard}>
            <Text style={styles.statNum}>{s.value}</Text>
            <Text style={styles.statLabel}>{s.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.goalCard}>
        <View style={styles.goalTop}>
          <Text style={styles.goalTitle}>build muscle</Text>
          <Text style={styles.goalEdit}>edit</Text>
        </View>
        <Text style={styles.goalDesc}>protein goal: 120g / day</Text>
      </View>

      <Text style={styles.sectionLabel}>preferences</Text>
      <PlainRow label="units" value="grams, lbs" />
      <PlainRow label="notifications" value="gentle" />
      <PlainRow label="apple health" value="not connected" />

      <Text style={styles.sectionLabel}>advanced</Text>
      <View style={styles.toggleRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.toggleTitle}>show exact numbers</Text>
          <Text style={styles.toggleDesc}>
            reveals calorie estimates behind fuel and workouts. protein stays visible either way.
          </Text>
        </View>
        <Pressable
          onPress={toggleShowExactNumbers}
          style={[styles.toggle, showExactNumbers && styles.toggleOn]}
        >
          <View style={[styles.toggleKnob, showExactNumbers && styles.toggleKnobOn]} />
        </Pressable>
      </View>

      <Text style={styles.sectionLabel}>account</Text>
      <PlainRow label="help & support" link />
      <PlainRow label="log out" link />
    </ScrollView>
  );
}

function PlainRow({ label, value, link }: { label: string; value?: string; link?: boolean }) {
  return (
    <View style={styles.plainRow}>
      <Text style={[styles.plainLabel, link && styles.plainLabelLink]}>{label}</Text>
      {value && <Text style={styles.plainValue}>{value}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.cream },
  content: { padding: spacing.xl, paddingTop: 60, paddingBottom: 80 },
  header: { alignItems: 'center', marginBottom: spacing.lg },
  name: { ...type.sectionTitle, fontSize: 18, color: colors.espresso, marginTop: spacing.sm },
  sub: { ...type.bodySmall, color: colors.espressoSoft },
  statsRow: { flexDirection: 'row', gap: 8, marginBottom: spacing.lg },
  statCard: { flex: 1, backgroundColor: colors.peach, borderRadius: radius.md, paddingVertical: 10, alignItems: 'center' },
  statNum: { ...type.dataMedium, fontSize: 16, color: colors.espresso },
  statLabel: { fontSize: 8.5, fontWeight: '700' as const, textTransform: 'uppercase', letterSpacing: 0.5, color: colors.espressoSoft, marginTop: 2 },
  goalCard: { backgroundColor: colors.peach, borderRadius: radius.lg, padding: spacing.lg, marginBottom: spacing.lg },
  goalTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  goalTitle: { fontSize: 12, fontWeight: '700' as const, color: colors.espresso },
  goalEdit: { fontSize: 10, fontWeight: '700' as const, color: colors.rust },
  goalDesc: { ...type.bodySmall, color: colors.espressoSoft },
  sectionLabel: { ...type.label, color: colors.rust, marginTop: spacing.md, marginBottom: spacing.sm },
  plainRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderBottomColor: colors.creamDeep,
  },
  plainLabel: { fontSize: 11.5, fontWeight: '600' as const, color: colors.espresso },
  plainLabelLink: { color: colors.rust },
  plainValue: { fontSize: 10, color: colors.espressoSoft },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.peach,
    borderRadius: radius.lg,
    padding: spacing.md,
    gap: spacing.md,
  },
  toggleTitle: { fontSize: 13, fontWeight: '700' as const, color: colors.espresso },
  toggleDesc: { fontSize: 10.5, color: colors.espressoSoft, marginTop: 3, lineHeight: 14 },
  toggle: { width: 42, height: 24, borderRadius: 12, backgroundColor: colors.creamDeep, justifyContent: 'center' },
  toggleOn: { backgroundColor: colors.clementine },
  toggleKnob: { width: 18, height: 18, borderRadius: 9, backgroundColor: colors.white, marginLeft: 3 },
  toggleKnobOn: { marginLeft: 21 },
});
