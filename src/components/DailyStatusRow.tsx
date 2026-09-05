import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WedgeRing } from './WedgeRing';
import { colors, spacing } from '../theme';

export interface DailyStatus {
  proteinGrams: number;
  proteinGoal: number;
  fuelProgress: number; // 0-1, internal only
  fuelLabel: string; // e.g. "fueled" -- what actually renders
  varietyProgress: number; // 0-1, internal only
  varietyLabel: string; // e.g. "growing"
}

export function DailyStatusRow({ status }: { status: DailyStatus }) {
  return (
    <View style={styles.row}>
      <WedgeRing
        progress={status.proteinGrams / status.proteinGoal}
        color={colors.clementine}
        centerLabel={`${status.proteinGrams}g`}
        label="protein"
      />
      <WedgeRing
        progress={status.fuelProgress}
        color={colors.clementineSoft}
        centerLabel={status.fuelLabel}
        label="fuel"
      />
      <WedgeRing
        progress={status.varietyProgress}
        color={colors.plum}
        centerLabel={status.varietyLabel}
        label="variety"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.lg },
});
