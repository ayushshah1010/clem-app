# clem

The food tracker for non-restrictive gym girlies. Information, not obsession.

## Getting started

```bash
npm install
cp .env.example .env   # then fill in real values -- .env is git-ignored
npx expo start
```

## Project structure

One component per file, grouped by what it is, so a broken piece is easy to isolate:

```
src/
  theme/          Design tokens. colors.ts, typography.ts, spacing.ts.
                   Never hardcode a hex value or font size in a component --
                   import from here so the whole app stays visually consistent.

  components/      Small, reusable pieces. One file each:
                    Mascot.tsx        clem herself, with expression variants
                    WedgeRing.tsx     the protein/fuel/variety progress ring
                    DailyStatusRow.tsx  the row of three rings
                    CheckinCard.tsx   mascot + status line card
                    MealRow.tsx       single row in the meal list

  screens/
    main/          TodayScreen, ProfileScreen, WorkoutLogScreen, etc.
    onboarding/     One file per onboarding step.

  navigation/       Stack/tab navigators live here once wired up.

  services/         Anything that talks to the network.
                    visionApi.ts calls OUR backend -- never the vision
                    provider directly. See security note below.

  hooks/            Shared React hooks (e.g. useDailyStatus).
  types/            Shared TypeScript types not local to one component.
  utils/            Pure helper functions (calorie math, date formatting).
```

## Security -- API keys

Four layers, each catching what the one before it misses:

1. **`.env` is git-ignored.** Real secrets never get committed. Only
   `.env.example` (placeholder names, no values) is tracked in git.

2. **Pre-commit secret scan.** `scripts/scan-secrets.js` runs on every
   commit via husky and blocks it if a key-shaped string (OpenAI, Google,
   AWS, Supabase JWT patterns) shows up in a tracked file, or if `.env`
   itself is staged. This is the safety net for the case `.gitignore`
   can't cover -- someone pastes a key into a *tracked* file by accident.

3. **Vision AI keys never ship in the app bundle.** Expo bundles any
   `EXPO_PUBLIC_*` variable directly into the compiled app -- that's
   necessary for things like a Supabase URL, but it means a value with
   that prefix can be extracted from the shipped binary by anyone, even
   if it was never committed to GitHub. The vision provider's API key
   must live only in the backend's environment (Supabase edge function
   or equivalent), and the app calls that backend -- see
   `src/services/visionApi.ts` for the pattern to follow.

4. **The backend proxy itself requires auth.** An unauthenticated proxy
   endpoint is still an open door: even without ever seeing the real key,
   anyone who finds the backend URL could hit it directly and run up the
   vision API bill. Every call to `/scan-meal` must carry the user's
   Supabase auth token, and the backend should rate-limit per user, not
   just per IP.

If you're ever about to add a key to a file under `src/`, stop and ask
whether it belongs in a backend environment variable instead.

### Other things worth doing before launch (not yet automated here)

- **Scope the vision API key narrowly** if the provider supports it
  (spending caps, restricted to that one endpoint) so a leak is capped
  in blast radius, not just prevented.
- **Separate dev and prod keys**, so a leaked dev key doesn't touch
  production spend or data.
- **Enable GitHub's built-in secret scanning** (Settings > Code security)
  as a second opinion behind the local pre-commit hook -- it catches
  history that predates the hook, or a hook someone bypassed with
  `--no-verify`.
- **Rotate keys periodically**, and immediately if `git log` ever shows
  one was committed, even briefly -- assume anything pushed to a remote,
  even for one commit, is compromised.
- **Monitor usage** on the provider's dashboard for anomalous spend,
  which is often the first sign of a leak nothing else caught.

## Design philosophy (from the product doc)

- Protein is the one exact number shown. Fuel and variety are always
  directional words ("fueled", "growing"), never bare percentages --
  see `DailyStatusRow.tsx`.
- A user can opt into seeing exact numbers everywhere via
  Settings > Advanced. Off by default.
- No red, no green, no stoplight food morality anywhere in the UI.
