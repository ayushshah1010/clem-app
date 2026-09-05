import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, Pressable, ActivityIndicator, StyleSheet } from 'react-native';
import { useFonts, Fraunces_500Medium, Fraunces_500Medium_Italic } from '@expo-google-fonts/fraunces';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
} from '@expo-google-fonts/inter';
import { TodayScreen } from './src/screens/main/TodayScreen';
import { ProfileScreen } from './src/screens/main/ProfileScreen';
import { OnboardingFlow } from './src/screens/onboarding/OnboardingFlow';
import { OnboardingData } from './src/types/onboarding';
import { SettingsProvider } from './src/hooks/useSettings';
import { colors } from './src/theme';

type Tab = 'today' | 'profile';

export default function App() {
  const [fontsLoaded] = useFonts({
    Fraunces_500Medium,
    Fraunces_500Medium_Italic,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });
  const [tab, setTab] = useState<Tab>('today');
  const [onboardingComplete, setOnboardingComplete] = useState(false);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.cream }}>
        <ActivityIndicator color={colors.clementine} />
      </View>
    );
  }

  if (!onboardingComplete) {
    return (
      <>
        <OnboardingFlow
          onComplete={(data: OnboardingData) => {
            // TODO: once a backend exists, save `data` to the user's profile here
            // instead of just logging it. Nothing persists across app restarts yet.
            console.log('Onboarding complete:', data);
            setOnboardingComplete(true);
          }}
        />
        <StatusBar style="dark" />
      </>
    );
  }

  // TODO: swap for a real navigator (src/navigation) once History is built too.
  return (
    <SettingsProvider>
      <View style={{ flex: 1 }}>
        {tab === 'today' ? <TodayScreen /> : <ProfileScreen />}

        <View style={styles.tabBar}>
          <TabButton label="today" active={tab === 'today'} onPress={() => setTab('today')} />
          <TabButton label="profile" active={tab === 'profile'} onPress={() => setTab('profile')} />
        </View>
      </View>
      <StatusBar style="dark" />
    </SettingsProvider>
  );
}

function TabButton({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <Pressable style={styles.tabBtn} onPress={onPress}>
      <View style={[styles.tabDot, active && styles.tabDotActive]} />
      <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colors.creamDeep,
    backgroundColor: colors.cream,
    paddingBottom: 18,
    paddingTop: 8,
  },
  tabBtn: { flex: 1, alignItems: 'center', gap: 4 },
  tabDot: { width: 5, height: 5, borderRadius: 2.5, backgroundColor: 'transparent' },
  tabDotActive: { backgroundColor: colors.clementine },
  tabLabel: { fontSize: 10.5, fontWeight: '600', color: colors.espressoSoft },
  tabLabelActive: { color: colors.espresso, fontWeight: '700' },
});
