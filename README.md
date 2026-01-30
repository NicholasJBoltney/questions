# Offline Mobile App: Random Questions

This is a Next.js application designed to run 100% offline as a mobile app using Capacitor.

## Features
- ✅ **Offline First:** No network calls, all data local.
- ✅ **Single-Session Memory:** Remembers which strings have been shown to prevent duplicates.
- ✅ **Premium UI:** Modern dark mode with glassmorphism and smooth animations.
- ✅ **Mobile Optimized:** Designed for mobile screen ratios and touch interactions.

## How to Build for Mobile

### 1. Requirements
- **Android:** [Android Studio](https://developer.android.com/studio) installed.
- **iOS:** [Xcode](https://developer.apple.com/xcode/) installed (macOS only).

### 2. Build the Web App
Before syncing to mobile, you must build the static version of the Next.js app:
```bash
npm run static
```
This command runs `next build` (generating the `out` folder) and then `npx cap sync` to copy those files into the native platforms.

### 3. Open in IDE
#### For Android:
```bash
npm run open-android
```
This will open the project in Android Studio. From there, you can:
1.  Connect your phone or start an emulator.
2.  Click the **Run** button (Green Arrow).
3.  To build an APK: `Build > Build Bundle(s) / APK(s) > Build APK(s)`.

#### For iOS:
```bash
npm run open-ios
```
This will open the project in Xcode. From there:
1.  Select your device or simulator at the top.
2.  Click the **Play** button to run.

### 4. Making Changes
If you modify the code in `src/`:
1.  Run `npm run static` again to update the mobile builds.
2.  Re-run/re-build from Android Studio or Xcode.

## Project Structure
- `src/app/page.tsx`: Core logic (Randomization, State).
- `src/app/globals.css`: Premium styling.
- `next.config.ts`: Configured for `output: 'export'`.
- `capacitor.config.ts`: Capacitor configuration.
