# Google Play release checklist — StackUp Hold'em Academy 2.1.0

## Repository release state

- Production repository: `SkyareCom/stackup.holdem-academy`.
- Android application ID: `com.skyare.stackupacademy` (preserved so this release updates the existing Play app).
- Version: `2.1.0` / `versionCode 210`.
- `compileSdk = 36` and `targetSdk = 36` (Android 16).
- `minSdk = 24`.
- Native Android WebView launcher; no Trusted Web Activity dependency and no Digital Asset Links requirement.
- Production content URL: `https://skyarecom.github.io/stackup.holdem-academy/`.
- HTTPS only; cleartext traffic disabled.
- Only Android permission requested: `INTERNET`.
- Android backup disabled.
- WebView Safe Browsing enabled where supported.
- External URLs leave the app through a browsable Android intent.
- WebView renderer-process loss is recovered once instead of crashing the Activity.
- Android back navigation is integrated with the WebView history.
- Cache/service-worker migration is versioned for release 210.
- Release WebView debugging is disabled; it is enabled only for debuggable builds.
- GitHub Actions builds the AAB with Java 17 / Android API 36.
- Release signing is supplied only from GitHub environment secrets.
- CI validates release lint, package name, launcher Activity, AAB integrity, signature and a real Android 16 emulator launch.
- Store web app is deployed separately from the Android shell, keeping future Android/iOS wrappers replaceable without rewriting Academy content.

## Google Play requirement alignment — September 2026

For phone/tablet app updates submitted after 31 August 2026, Google Play requires Android 16 / API 36 or higher as the target API. This release targets API 36.

## Before uploading to Play Console

1. Generate the final `stackup-academy-play-aab` artifact from a successful **Build Android Packages** workflow.
2. Confirm `RELEASE-INFO.txt` contains:
   - `package=com.skyare.stackupacademy`
   - `versionName=2.1.0`
   - `versionCode=210`
   - `targetSdk=36`
   - `signed=true`
3. Upload the AAB as a new release of the existing Play Console app, not as a new app.
4. Keep Google Play App Signing enabled and use the same upload-key identity already accepted by the existing app.
5. Submit first to the current testing track, then promote according to the Play Console testing/production-access status.
6. In Play Console complete or re-check privacy policy, Data safety, App access, target audience/content, content rating, ads declaration and store listing.
7. Position the product as poker education/training. Do not expose real-money betting, deposits, withdrawals, prizes or gambling transactions unless the product and Play declarations are intentionally changed later.

## Future iOS/App Store path

The Academy business/UI layer remains a hosted web application and the Android native wrapper stays isolated under `/android`. A future iOS wrapper can use the same HTTPS content through a dedicated WKWebView/Capacitor shell while implementing Apple-specific navigation, StoreKit, privacy manifests and App Store requirements independently. Android-specific code should stay out of the Academy web layer.
