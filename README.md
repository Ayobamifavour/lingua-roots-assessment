# Lingua Roots — Lesson Flow (Technical Assessment)

A mobile language-learning app built in React Native (Expo) — a Yoruba-to-English lesson flow with a home screen, an illustrated jungle lesson path, multiple-choice questions, and XP tracking.

## Running the project

- Press `w` to open in a browser, or scan the QR code with the **Expo Go** app to run on a physical device.
- Phone and computer must be on the same network (or use your computer's mobile hotspot if your network isolates devices from each other).

## App flow

1. **Home screen** — greets the user with a talking-drum mascot card (tap the drum to cycle through Yoruba greetings), a streak counter, learning stats, and a "Continue Lesson" button.
2. **Jungle lesson path** — an illustrated scene (hand-built with `react-native-svg`: layered foliage, a winding trail, a wooden bridge, scrolls, and a glowing talking drum) showing the current lesson as a locked signpost. Tapping it opens that lesson.
3. **Lesson screen** — five multiple-choice questions, each with:
   - A progress bar and question counter
   - Four answer options with selected/correct/incorrect states
   - A "Check" step that reveals feedback, then "Continue" to advance
   - An XP badge that updates on correct answers
4. **Completion screen** — shows total XP earned, with a button back to the home screen.

## Technical decisions

- **State management:** local `useState`, kept at the screen level. `index.tsx` owns which screen is active (home / path / lesson) and which level was picked; `LessonScreen` owns its own question progress, selection, and XP; `HomeScreen` owns which greeting is currently showing. The flow is small and linear, so no external state library was needed.
- **Component structure:** each UI piece is a small, reusable, presentational component that receives props and calls back up to its parent screen — screens own logic and navigation, components own rendering.
- **Mock data:** lesson content lives in `src/data/lessonData.ts` as typed arrays (`levels`, each with its own `questions`), standing in for a future API response.
- **Illustration:** both the jungle lesson path and the level system are rendered with `react-native-svg` rather than static images, so they scale cleanly across screen sizes and stay crisp on any device. The lesson path uses a "cover" scale calculation so it fills the screen edge-to-edge on both web and mobile.
- **Styling:** shared colors are centralized in `src/theme/colors.ts` (forest greens, warm browns, cream cards, gold accents); the home screen and jungle path use a few additional colors matched to their specific illustrations.
- **Check vs. Continue:** answering is a two-step interaction — select an option, then "Check" to lock it in and reveal feedback, then "Continue" to move on — mirroring common lesson-app UX and making correctness visible before advancing.

## Project structure

Screens (`app/`) own navigation and state; components (`components/`) are presentational, receiving data and callbacks as props.
