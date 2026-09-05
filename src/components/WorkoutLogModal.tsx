import React, { useState } from 'react';
import { View, Text, Pressable, Modal, StyleSheet } from 'react-native';
import Svg, { Path, Ellipse, Circle } from 'react-native-svg';
import { colors, type, spacing, radius } from '../theme';
import { Mascot } from './Mascot';
import { useSettings } from '../hooks/useSettings';

type WorkoutType = 'lift' | 'cardio' | 'sport' | 'other';
type Intensity = 'light' | 'moderate' | 'intense';

interface WorkoutLogModalProps {
  visible: boolean;
  onClose: () => void;
}

const DURATION_STEP = 5;

// Rough MET-style multiplier per type+intensity, just enough for a
// believable estimate until this is replaced by the real calculation
// service. Not medically precise -- see product doc on why that's fine
// for a directional "fuel target" adjustment.
const INTENSITY_MULT: Record<Intensity, number> = { light: 4, moderate: 7, intense: 10 };

export function WorkoutLogModal({ visible, onClose }: WorkoutLogModalProps) {
  const { showExactNumbers } = useSettings();
  const [type, setType] = useState<WorkoutType>('lift');
  const [duration, setDuration] = useState(50);
  const [intensity, setIntensity] = useState<Intensity>('moderate');
  const [confirmed, setConfirmed] = useState(false);

  const estimatedCalories = Math.round(duration * INTENSITY_MULT[intensity]);

  const reset = () => {
    setConfirmed(false);
    setType('lift');
    setDuration(50);
    setIntensity('moderate');
  };

  const handleClose = () => {
    onClose();
    setTimeout(reset, 250); // let the modal close animation finish first
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={handleClose}>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          {!confirmed ? (
            <>
              <View style={styles.navRow}>
                <Pressable style={styles.backBtn} onPress={handleClose}>
                  <Svg width={13} height={13} viewBox="0 0 24 24" fill="none">
                    <Path d="M15 18l-6-6 6-6" stroke={colors.espresso} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
                  </Svg>
                </Pressable>
                <Text style={styles.navTitle}>log a workout</Text>
              </View>

              <Text style={styles.sectionLabel}>type</Text>
              <View style={styles.typeGrid}>
                {(['lift', 'cardio', 'sport', 'other'] as WorkoutType[]).map((t) => (
                  <Pressable
                    key={t}
                    onPress={() => setType(t)}
                    style={[styles.pill, styles.typePill, type === t && styles.pillActive]}
                  >
                    <Text style={[styles.pillText, type === t && styles.pillTextActive]}>{t}</Text>
                  </Pressable>
                ))}
              </View>

              <Text style={styles.sectionLabel}>duration</Text>
              <View style={styles.durationCard}>
                <View>
                  <Text style={styles.durationValue}>{duration}</Text>
                  <Text style={styles.durationUnit}>minutes</Text>
                </View>
                <View style={styles.stepper}>
                  <Pressable style={styles.stepBtn} onPress={() => setDuration((d) => Math.max(5, d - DURATION_STEP))}>
                    <Text style={styles.stepBtnText}>–</Text>
                  </Pressable>
                  <Pressable style={styles.stepBtn} onPress={() => setDuration((d) => Math.min(240, d + DURATION_STEP))}>
                    <Text style={styles.stepBtnText}>+</Text>
                  </Pressable>
                </View>
              </View>

              <Text style={styles.sectionLabel}>how did it feel</Text>
              <View style={styles.intensityRow}>
                {(['light', 'moderate', 'intense'] as Intensity[]).map((i) => (
                  <Pressable
                    key={i}
                    onPress={() => setIntensity(i)}
                    style={[styles.pill, styles.intensityPill, intensity === i && styles.pillActivePlum]}
                  >
                    <Text style={[styles.pillText, intensity === i && styles.pillTextActive]}>{i}</Text>
                  </Pressable>
                ))}
              </View>

              <Pressable style={styles.logBtn} onPress={() => setConfirmed(true)}>
                <Text style={styles.logBtnText}>log workout</Text>
              </Pressable>
            </>
          ) : (
            <View style={styles.confirmWrap}>
              <View style={styles.confirmCard}>
                <Mascot size={70} expression="celebrating" />
                <Text style={styles.confirmTitle}>nice {type === 'lift' ? 'lift' : 'session'} 🍊</Text>
                <Text style={styles.confirmSub}>
                  {duration} minutes at a {intensity} effort — your body could use a bit more fuel today.
                </Text>
                {showExactNumbers && (
                  <View style={styles.confirmDetail}>
                    <Text style={styles.confirmDetailText}>fuel target: +{estimatedCalories} today</Text>
                  </View>
                )}
              </View>
              <Pressable style={styles.doneBtn} onPress={handleClose}>
                <Text style={styles.doneBtnText}>done</Text>
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
    paddingTop: spacing.xl,
    minHeight: 480,
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
  sectionLabel: { ...type.label, color: colors.rust, marginBottom: spacing.sm, marginTop: spacing.md },
  typeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 7 },
  pill: { borderRadius: radius.md, paddingVertical: 11, paddingHorizontal: 12, backgroundColor: colors.peach },
  typePill: { width: '48%' },
  intensityPill: { flex: 1, alignItems: 'center' },
  pillActive: { backgroundColor: colors.clementine },
  pillActivePlum: { backgroundColor: colors.plum },
  pillText: { ...type.bodySmall, fontWeight: '600' as const, color: colors.espresso, textAlign: 'center' },
  pillTextActive: { color: colors.white },
  durationCard: {
    backgroundColor: colors.peach,
    borderRadius: radius.lg,
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  durationValue: { ...type.dataLarge, color: colors.espresso },
  durationUnit: { ...type.bodySmall, fontWeight: '600' as const, color: colors.espressoSoft },
  stepper: { flexDirection: 'row', gap: 8 },
  stepBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.clementine,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepBtnText: { color: colors.white, fontSize: 16, fontWeight: '700' as const },
  intensityRow: { flexDirection: 'row', gap: 7 },
  logBtn: {
    marginTop: spacing.xl,
    backgroundColor: colors.clementine,
    borderRadius: radius.lg,
    paddingVertical: 15,
    alignItems: 'center',
  },
  logBtnText: { color: colors.white, fontWeight: '700' as const, fontSize: 14 },
  confirmWrap: { flex: 1, justifyContent: 'space-between' },
  confirmCard: { backgroundColor: colors.peach, borderRadius: radius.xl, padding: spacing.xxl, alignItems: 'center', marginTop: spacing.xl },
  confirmTitle: { ...type.sectionTitle, fontSize: 19, color: colors.espresso, marginTop: spacing.sm },
  confirmSub: { ...type.bodySmall, color: colors.espressoSoft, textAlign: 'center', marginTop: 4, maxWidth: 220 },
  confirmDetail: { marginTop: spacing.md, backgroundColor: colors.cream, borderRadius: 9, paddingVertical: 7, paddingHorizontal: 11 },
  confirmDetailText: { fontSize: 10, color: colors.espressoSoft },
  doneBtn: { backgroundColor: colors.clementine, borderRadius: radius.lg, paddingVertical: 15, alignItems: 'center' },
  doneBtnText: { color: colors.white, fontWeight: '700' as const, fontSize: 14 },
});
