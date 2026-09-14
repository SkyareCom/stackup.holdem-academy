# Google Play release checklist

## Completed in repository

- Android project under `/android`.
- Application ID: `com.skyare.stackupacademy`.
- `compileSdk` / `targetSdk`: 36.
- Version: 1.0.0 / versionCode 1.
- TWA start URL configured.
- Android Browser Helper updated to 2.7.3.
- Main manifest hardened for production: no cleartext traffic and no Android backup.
- Privacy policy available in the web app.
- CI runs Android release lint.
- CI builds release AAB and installable debug APK.
- CI supports release signing without storing keys in Git.
- CI validates AAB integrity and generates SHA-256 checksum.
- CI smoke-tests the debug APK on an Android emulator.
- Initial Play Store title and short description stored under `android/store-listing/pt-BR/`.
- Academy UI uses the Love Ya Like A Sister Google font globally, with card/suit glyph exceptions only where required.
- Academy palette is locked to dark green, emerald, gold, parchment/beige and dark brown.
- Main and content cards share centralized border, radius, shadow, padding and spacing tokens.
- Mobile layout has global horizontal-overflow protection and responsive typography.
- Topic titles and descriptions are allowed to wrap instead of being cut with ellipsis.
- Card navigation, Back and Main Menu force the next page to start with the full Academy header visible.
- Pages deployment now runs a dedicated Play release UI consistency guard before publishing.

## Required outside the repository before production upload

1. Create the Play Console app record using package `com.skyare.stackupacademy`.
2. Enable Play App Signing.
3. Create and securely back up the Android upload key.
4. Configure the signing credentials in the CI secrets and confirm `signed=true` in the generated `RELEASE-INFO.txt`.
5. Upload the signed AAB to Internal Testing first.
6. Obtain the final Play App Signing certificate SHA-256 fingerprint.
7. Replace the placeholder in `android/digital-asset-links/assetlinks.json.template`.
8. Publish the final asset links file at `https://skyarecom.github.io/.well-known/assetlinks.json` or migrate the Academy to a custom domain and publish it at that domain root.
9. Verify the release-installed app opens as a validated TWA, not a Custom Tab.
10. Complete Data Safety, privacy policy URL, target audience, content rating and app access declarations in Play Console.
11. Prepare final Store Listing media: 512x512 store icon, 1024x500 feature graphic and phone screenshots.
12. Complete the testing track required by the developer account before requesting production access.

## Product positioning

StackUp Hold'em Academy is an educational poker learning and training application. It does not offer real-money wagering, deposits, withdrawals, prizes, gambling services or gambling transactions.
