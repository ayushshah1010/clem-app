// Fraunces carries personality (greetings, clem's voice).
// Inter stays neutral for anything numeric or functional.
// Font files load via expo-font in App.tsx before render.

export const fonts = {
  display: 'Fraunces_500Medium',
  displayItalic: 'Fraunces_500Medium_Italic',
  body: 'Inter_400Regular',
  bodyMedium: 'Inter_500Medium',
  bodySemibold: 'Inter_600SemiBold',
  bodyBold: 'Inter_700Bold',
  data: 'Inter_800ExtraBold',
} as const;

export const type = {
  greeting: { fontFamily: fonts.display, fontSize: 22 },
  sectionTitle: { fontFamily: fonts.display, fontSize: 17 },
  body: { fontFamily: fonts.body, fontSize: 13 },
  bodySmall: { fontFamily: fonts.body, fontSize: 11 },
  label: { fontFamily: fonts.bodyBold, fontSize: 10.5, letterSpacing: 0.6, textTransform: 'uppercase' as const },
  dataLarge: { fontFamily: fonts.data, fontSize: 26 },
  dataMedium: { fontFamily: fonts.data, fontSize: 15 },
} as const;
