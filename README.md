# Lingua Roots — Lesson Flow (Technical Assessment)

A mobile language-learning lesson flow built in React Native (Expo), covering a splash screen, an illustrated level map, and a multi-question lesson flow with XP tracking.

## Running the project

- Press w to open in a browser, or scan the QR code with the **Expo Go** app to run on a physical device.
- Phone and computer must be on the same network (or use your computer's mobile hotspot if your network isolates devices from each other).

## App flow

1. **Splash screen** — app name and a Start button.
2. **Level map** — an illustrated jungle path (built with react-native-svg) showing three selectable levels: Greetings, Numbers, Food.
3. **Lesson screen** — five multiple-choice questions per level, each with:
   - A progress bar and question counter
   - Four answer options with selected/correct/incorrect states
   - A "Check" step that reveals feedback, then "Continue" to advance
   - An XP badge that updates on correct answers
4. **Completion screen** — shows total XP earned, with a button back to the level map.

## Technical decisions

- **State management:** local useState, kept at the screen level (index.tsx owns which screen is active and which level was picked; LessonScreen owns question progress, selection, and XP). The flow is small and linear, so no external state library was needed.
- **Component structure:** each UI piece (progress bar, XP badge, answer option, feedback banner, continue button) is a small, reusable, presentational component that receives props and calls back up — screens own logic, components own rendering.
- **Mock data:** lesson content lives in src/data/lessonData.ts as typed arrays (levels, each with its own questions), standing in for a future API response.
- **Illustration:** the level map is rendered with react-native-svg rather than a static image, so it scales cleanly across screen sizes and stays crisp on any device.
- **Styling:** colors are centralized in src/theme/colors.ts, matching a jungle/nature palette (forest greens, warm browns, cream cards, gold accents).
- **Check vs. Continue:** answering is a two-step interaction — select an option, then "Check" to lock it in and reveal feedback, then "Continue" to move on — mirroring common lesson-app UX and making correctness visible before advancing.

## Project structure
