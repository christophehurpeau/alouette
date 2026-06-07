# alouette — Skill Spec

alouette is a multi-platform (web + React Native iOS/Android) React design system built on NativeWind v5 and Tailwind CSS v4. Components are styled entirely via `className` using semantic theme tokens that cascade through light/dark modes and accents; animations are pure CSS keyframes that run on native via Reanimated. These skills are for app developers **consuming** alouette components (not authoring new ones, and not the internal `build-css` token workflow).

## Domains

| Domain       | Description                                                          | Skills                                                   |
| ------------ | ------------------------------------------------------------------- | -------------------------------------------------------- |
| setup        | Wiring alouette into an app (metro, global.css, provider, fonts)    | alouette-setup                                           |
| theming      | Modes + accents, ScopedTheme/AccentScope, base tokens      | alouette-theming                                         |
| typography   | Text/Paragraph styling via font + size + color utilities            | alouette-typography                                      |
| layout       | Box, Surface, stacks, separators, gradients, token scale, icons     | alouette-layout, alouette-icons                          |
| actions      | Buttons, icon buttons, pressables, external links                   | alouette-actions, alouette-external-links                |
| forms        | Text inputs, text areas, switches                                   | alouette-forms                                           |
| feedback     | Semantic message banners                                            | alouette-feedback                                        |
| animation    | PresenceOne/PresenceList, CSS keyframe enter/exit                   | alouette-animation                                       |
| responsive   | Breakpoint switching helpers                                        | alouette-responsive                                      |

## Skill Inventory

| Skill                    | Type        | Domain     | What it covers                                                                 | Failure modes |
| ------------------------ | ----------- | ---------- | ----------------------------------------------------------------------------- | ------------- |
| alouette-setup           | lifecycle   | setup      | withAlouetteConfig, global.css + @source, AlouetteProvider, fonts, safe area  | 4             |
| alouette-theming         | core        | theming    | accent, AccentScope/ScopedTheme, base tokens, useThemeToken           | 5             |
| alouette-typography      | core        | typography | Text/Paragraph, font-{family}-{weight}, text-* sizes, color tokens            | 4             |
| alouette-layout          | core        | layout     | Box/Surface/stacks/Separator, gradients, spacing/radius/shadow scale          | 4             |
| alouette-actions         | core        | actions    | Button/IconButton/link buttons, PressableBox, variants, accent          | 3             |
| alouette-forms           | core        | forms      | InputText (mode), TextArea, Switch (controlled/uncontrolled)                  | 3             |
| alouette-feedback        | core        | feedback   | Message + Info/Confirmation/Warning presets, dismiss pair                     | 3             |
| alouette-animation       | core        | animation  | PresenceOne/PresenceList, animationDurationsMs, animate-* classes, reanimated | 4             |
| alouette-responsive      | core        | responsive | Responsive classes (sm:/md:/lg:/xl:) preferred; SwitchBreakpoints* fallback   | 4             |
| alouette-icons           | composition | layout     | alouette-icons/phosphor-icons import, Icon tint/size                          | 3             |
| alouette-external-links  | composition | actions    | ExternalLink/ExternalLinkButton, openLinkBehavior (expo-web-browser)          | 2             |

## Failure Mode Inventory

### alouette-setup (4)

| #   | Mistake                                | Priority | Source                                  | Cross-skill? |
| --- | -------------------------------------- | -------- | --------------------------------------- | ------------ |
| 1   | global.css missing @source for alouette| CRITICAL | storybook-native-app/src/global.css     | —            |
| 2   | Metro omits withAlouetteConfig         | CRITICAL | storybook-native-app/metro.config.cjs   | —            |
| 3   | App not wrapped in AlouetteProvider    | CRITICAL | core/AlouetteProvider.tsx               | —            |
| 4   | Bold/extrabold fonts not loaded        | HIGH     | storybook-native-app/src/App.tsx        | —            |

### alouette-theming (5)

| #   | Mistake                                   | Priority | Source                            | Cross-skill?                          |
| --- | ----------------------------------------- | -------- | --------------------------------- | ------------------------------------- |
| 1   | Hardcoding raw Tailwind colors            | HIGH     | CLAUDE.md; AccentScope.tsx      | alouette-typography, alouette-layout  |
| 2   | Setting color manually not accent   | MEDIUM   | Box.tsx, AccentScope.tsx        | —                                     |
| 3   | Wrapping accent-capable component in AccentScope | MEDIUM | Text.tsx, AccentScope.tsx    | —                                     |
| 4   | nativewind useUnstableNativeVariable      | MEDIUM   | core/useThemeToken.ts             | —                                     |
| 5   | var() chains on native                    | MEDIUM   | CLAUDE.md (native constraint)     | —                                     |

### alouette-typography (4)

| #   | Mistake                            | Priority | Source                      | Cross-skill?         |
| --- | ---------------------------------- | -------- | --------------------------- | -------------------- |
| 1   | font-bold instead of font-body-bold| HIGH     | CLAUDE.md; Text.stories.tsx | —                    |
| 2   | react-native Text instead of alouette | HIGH  | primitives/Text.tsx         | —                    |
| 3   | Heading font below text-xl         | MEDIUM   | build-css.ts; Text.stories.tsx | —                 |
| 4   | Raw Tailwind text color            | MEDIUM   | CLAUDE.md                   | alouette-theming     |

### alouette-layout (4)

| #   | Mistake                              | Priority | Source                       | Cross-skill?      |
| --- | ------------------------------------ | -------- | ---------------------------- | ----------------- |
| 1   | Surface lowered/shadow wrong prop    | HIGH     | containers/Surface.tsx       | —                 |
| 2   | Raw numeric spacing not tokens       | MEDIUM   | tokens.stories.tsx           | alouette-theming  |
| 3   | expo-linear-gradient for backgrounds | MEDIUM   | layout/GradientBackground.tsx| —                 |
| 4   | Stack semantics / wrong import       | MEDIUM   | stacks/stacks.tsx            | —                 |

### alouette-actions (3)

| #   | Mistake                                | Priority | Source                       | Cross-skill? |
| --- | -------------------------------------- | -------- | ---------------------------- | ------------ |
| 1   | Button label as children not text      | HIGH     | actions/Button.tsx           | —            |
| 2   | Stale variant names (ghost-contained)  | HIGH     | PressableBox.tsx, Button.tsx | —            |
| 3   | IconButton without aria-label          | MEDIUM   | actions/IconButton.tsx       | —            |

### alouette-forms (3)

| #   | Mistake                              | Priority | Source                  | Cross-skill? |
| --- | ------------------------------------ | -------- | ----------------------- | ------------ |
| 1   | editable={false} instead of disabled | MEDIUM   | inputs/InputText.tsx    | —            |
| 2   | Manual keyboardType/secureTextEntry  | MEDIUM   | inputs/InputText.tsx    | —            |
| 3   | Switch onChange not onValueChange    | MEDIUM   | inputs/Switch.tsx       | —            |

### alouette-feedback (3)

| #   | Mistake                              | Priority | Source                | Cross-skill?     |
| --- | ------------------------------------ | -------- | --------------------- | ---------------- |
| 1   | onDismiss without dismissIconAriaLabel | MEDIUM | feedback/Message.tsx  | —                |
| 2   | Raw Message without accent/icon| MEDIUM   | feedback/Message.tsx  | —                |
| 3   | Hand-built banner instead of Message | MEDIUM   | feedback/Message.tsx  | alouette-theming |

### alouette-animation (4)

| #   | Mistake                                  | Priority | Source                          | Cross-skill? |
| --- | ---------------------------------------- | -------- | ------------------------------- | ------------ |
| 1   | Hardcoded exitDurationMs                 | HIGH     | animationDurationsMs.ts         | —            |
| 2   | PresenceList children without keys       | HIGH     | containers/Presence.tsx         | —            |
| 3   | PresenceOne child drops className        | MEDIUM   | containers/Presence.tsx         | —            |
| 4   | Animations without reanimated on native  | HIGH     | babel.config.js; peerDeps       | —            |

### alouette-responsive (4)

| #   | Mistake                                  | Priority | Source                       | Cross-skill? |
| --- | ---------------------------------------- | -------- | ---------------------------- | ------------ |
| 1   | SwitchBreakpoints where a class would do | HIGH     | windowSize/SwitchBreakpoints.tsx | —        |
| 2   | Assuming Tailwind default breakpoint widths | MEDIUM | config/Breakpoints.ts        | —            |
| 3   | Dynamic responsive class names           | MEDIUM   | windowSize/SwitchBreakpoints.tsx | —        |
| 4   | SwitchBreakpoints without base slot      | MEDIUM   | windowSize/SwitchBreakpoints.tsx | —        |

### alouette-icons (3)

| #   | Mistake                          | Priority | Source                  | Cross-skill? |
| --- | -------------------------------- | -------- | ----------------------- | ------------ |
| 1   | Barrel import of icon set        | MEDIUM   | Button.stories.tsx; CLAUDE.md | —      |
| 2   | Tint icon via color prop         | MEDIUM   | primitives/Icon.tsx     | —            |
| 3   | Size icon via className w/h       | MEDIUM   | primitives/Icon.tsx     | —            |

### alouette-external-links (2)

| #   | Mistake                       | Priority | Source                | Cross-skill? |
| --- | ----------------------------- | -------- | --------------------- | ------------ |
| 1   | Calling Linking.openURL direct| MEDIUM   | expo/ExternalLink.tsx | —            |
| 2   | Omitting openLinkBehavior     | MEDIUM   | expo/ExternalLink.tsx | —            |

## Tensions

| Tension                              | Skills                                                          | Agent implication                                                        |
| ------------------------------------ | -------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Web works, native silently fails     | typography ↔ theming ↔ animation ↔ setup                       | Browser-only testing ships code that no-ops/falls back on iOS/Android    |
| Familiar Tailwind vs alouette tokens | theming ↔ typography ↔ layout                                  | Defaults to bg-blue-500/p-4/text-gray-600, breaking dark mode + roles    |
| Animation class vs unmount timer     | animation                                                      | Hardcoded duration drifts from animationDurationsMs                      |
| Re-theme subtree vs color element    | theming ↔ actions ↔ feedback                                   | Hardcodes accent per element instead of setting accent once        |

## Cross-References

| From                    | To                      | Reason                                                              |
| ----------------------- | ----------------------- | ------------------------------------------------------------------ |
| alouette-setup          | alouette-theming        | After provider wiring, need the token/role model to style anything |
| alouette-theming        | alouette-typography     | Color tokens are applied through Text                              |
| alouette-actions        | alouette-icons          | Buttons take an icon prop                                          |
| alouette-feedback       | alouette-animation      | Messages render inside PresenceList for animated add/remove        |
| alouette-animation      | alouette-setup          | Native animations require reanimated + worklets from setup         |
| alouette-layout         | alouette-responsive     | Breakpoint switching chooses between layout variants               |
| alouette-actions        | alouette-external-links | Outbound URLs from action elements                                 |

## Subsystems & Reference Candidates

| Skill              | Subsystems | Reference candidates                                                   |
| ------------------ | ---------- | --------------------------------------------------------------------- |
| alouette-theming   | —          | Token catalog (color/spacing/radius/shadow names) + theme name matrix |
| alouette-layout    | —          | Spacing (xxs..4xl) / radius (xs..lg) / shadow (s/m/l/lowered) tables   |
| alouette-actions   | —          | Interactive token states per variant (contained/outlined × state)     |

## Recommended Skill File Structure

- **Lifecycle skills:** alouette-setup
- **Core skills:** alouette-theming, alouette-typography, alouette-layout, alouette-actions, alouette-forms, alouette-feedback, alouette-animation, alouette-responsive
- **Composition skills:** alouette-icons (alouette-icons), alouette-external-links (expo-web-browser)
- **Reference files:** alouette-theming (token catalog), alouette-layout (spacing/radius/shadow tables) — optional, only if the skill bodies approach the line limit.

All skills ship inside `packages/alouette/skills/`. Flat structure is recommended: 11 task-focused skills mapping ~1:1 to developer intents, discoverable via `npx @tanstack/intent list` without a router skill.

## Composition Opportunities

| Library                  | Integration points                          | Composition skill needed?            |
| ------------------------ | ------------------------------------------- | ------------------------------------ |
| alouette-icons           | Icon, Button/IconButton/Message icon prop   | yes — alouette-icons                 |
| expo-web-browser         | ExternalLink / ExternalLinkButton           | yes — alouette-external-links        |
| react-native-reanimated  | CSS animations on native (Presence)         | no — covered in alouette-animation   |
| react-native-safe-area-context | SafeAreaProvider / SafeAreaBox        | no — covered in alouette-setup/layout|
