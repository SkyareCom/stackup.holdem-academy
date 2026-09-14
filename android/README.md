# StackUp Hold'em Academy Android

Android packaging for the StackUp Hold'em Academy web app.

- Application ID: `com.skyare.stackupacademy`
- Version: `1.0.0` (`versionCode 1`)
- `compileSdk`: 36
- `targetSdk`: 36
- Minimum Android: API 24
- Architecture: Trusted Web Activity (TWA)
- Start URL: `https://skyarecom.github.io/stackup.holdem-academy/`
- Android Browser Helper: 2.7.3
- Java: 17
- Android Gradle Plugin: 9.4.0

## Build

CI runs release lint, builds the release Android App Bundle and builds an installable debug APK for emulator smoke testing.

Local release build:

`gradle -p android :app:bundleRelease`

Output:

`android/app/build/outputs/bundle/release/app-release.aab`

## Production signing

The release build supports an upload keystore supplied only through environment variables / CI secrets. Keys and passwords must never be committed.

When signing credentials are available, the CI-generated AAB is signed with the upload key and verified with `jarsigner`. The artifact also contains `RELEASE-INFO.txt` and a SHA-256 checksum.

## Digital Asset Links blocker

A verified TWA requires Digital Asset Links at the web origin root:

`https://skyarecom.github.io/.well-known/assetlinks.json`

The Academy is hosted at the project path `https://skyarecom.github.io/stackup.holdem-academy/`, so this repository alone cannot publish that root-level file. Before production, publish the final `assetlinks.json` at the origin root or move the Academy to a custom domain. Use the SHA-256 fingerprint of the final Play App Signing certificate.

Until verification is configured, Android Browser Helper can fall back to a Custom Tab.

## Play Store metadata

Initial Play Store title and short description live under `android/store-listing/pt-BR/`.
