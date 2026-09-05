import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { WelcomeStep } from './WelcomeStep';
import { AboutYouStep } from './AboutYouStep';
import { ActivityStep } from './ActivityStep';
import { GoalStep } from './GoalStep';
import { ProteinRevealStep } from './ProteinRevealStep';
import { AppleHealthStep } from './AppleHealthStep';
import { DoneStep } from './DoneStep';
import { OnboardingData, defaultOnboardingData } from '../../types/onboarding';
import { colors } from '../../theme';

const STEP_COUNT = 7;

interface OnboardingFlowProps {
  onComplete: (data: OnboardingData) => void;
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<OnboardingData>(defaultOnboardingData);

  const updateData = useCallback((updates: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  }, []);

  const next = () => setStep((s) => Math.min(STEP_COUNT - 1, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));

  return (
    <View style={styles.screen}>
      {step === 0 && <WelcomeStep onNext={next} />}
      {step === 1 && <AboutYouStep data={data} onChange={updateData} onNext={next} onBack={back} />}
      {step === 2 && <ActivityStep data={data} onChange={updateData} onNext={next} onBack={back} />}
      {step === 3 && <GoalStep data={data} onChange={updateData} onNext={next} onBack={back} />}
      {step === 4 && <ProteinRevealStep data={data} onChange={updateData} onNext={next} onBack={back} />}
      {step === 5 && (
        <AppleHealthStep
          onConnect={() => {
            updateData({ appleHealthConnected: true });
            next();
          }}
          onSkip={next}
          onBack={back}
        />
      )}
      {step === 6 && <DoneStep onFinish={() => onComplete(data)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.cream },
});
