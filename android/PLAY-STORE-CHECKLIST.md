# Google Play release checklist

## Completed in repository

- Android project under `/android`.
- Application ID: `com.skyare.stackupacademy`.
- Version: `2.1.0` / `versionCode 210`.
- `compileSdk` / `targetSdk`: 36.
- Native Android launcher with a restricted WebView; no TWA/Custom Tab dependency.
- Official content URL restricted to `https://skyarecom.github.io/stackup.holdem-academy/`.
- Main manifest hardened for production: INTERNET only, no cleartext traffic, Education app category and no Android backup.
- Android 12+ data extraction rules explicitly exclude application data from cloud backup and device transfer.
- WebView file/content access disabled and mixed content blocked.
- Safe Browsing enabled when supported.
- External links leave the app and open in the browser.
- Android system Back navigates WebView history before closing the app.
- Renderer recovery and first-run cache/service-worker migration included.
- Privacy policy available in the web app.
- CI runs Android release lint.
- CI builds release AAB and release/debug APKs.
- CI supports release signing without storing keys in Git.
- CI validates AAB integrity and generates SHA-256 checksum.
- CI verifies package and launcher metadata.
- CI smoke-tests the release APK on an Android emulator.
- Play Store copy provided in Portuguese (Brazil) and English (United States).
- Data Safety release checklist added at `android/PLAY-DATA-SAFETY.md`.
- Academy UI, content, palette, fonts and navigation remain unchanged by the Android packaging layer.

## Required in Play Console before production

1. Confirm the Play Console app record uses package `com.skyare.stackupacademy`.
2. Enable Play App Signing.
3. Create and securely back up the Android upload key.
4. Configure the four signing secrets used by GitHub Actions and confirm `signed=true` in `RELEASE-INFO.txt`.
5. Upload the signed AAB to Internal Testing first and complete the required test track for the developer account.
6. Complete App content declarations: privacy policy, target audience, content rating, app access and ads declaration.
7. Complete Data Safety according to the production build actually shipped, using `android/PLAY-DATA-SAFETY.md` as the release audit checklist.
8. Use Education as the primary category unless the Play Console classification flow requires another category.
9. Make clear in the listing and policy declarations that the app is poker education/training only and does not provide real-money gambling, deposits, withdrawals, cash prizes or wagering transactions.
10. Upload final Store Listing media: 512x512 store icon, 1024x500 feature graphic and required phone screenshots.
11. If account creation is enabled (Google, WhatsApp/phone or another provider), provide both in-app account deletion and the external deletion URL required by Play Console.
12. Review the pre-launch report after the Internal Testing upload and resolve any device-specific crashes or layout issues before production.

## Release artifact

Expected production bundle:

`android/app/build/outputs/bundle/release/app-release.aab`

Expected identity:

- package: `com.skyare.stackupacademy`
- versionName: `2.1.0`
- versionCode: `210`
- targetSdk: `36`
- shell: native WebView

## Product positioning

StackUp Hold'em Academy is an educational poker learning and training application. It does not offer real-money wagering, deposits, withdrawals, prizes, gambling services or gambling transactions.
