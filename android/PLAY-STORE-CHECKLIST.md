# Google Play release checklist

## Completed in repository

- Web 1.0.0 frozen at commit `7d5bf459712492291b812db7b188f16dbf29935f`.
- Android project added under `/android`.
- Application ID: `com.skyare.stackupacademy`.
- `compileSdk` / `targetSdk`: 36.
- Version: 1.0.0 / versionCode 1.
- TWA start URL configured.
- Privacy policy already available in the web app.
- CI configured to build an unsigned release AAB.

## Required before production upload

1. Create the Play Console app record.
2. Create and securely store the Android upload keystore.
3. Enable Play App Signing.
4. Obtain the final Play signing certificate SHA-256 fingerprint.
5. Replace the placeholder in `android/digital-asset-links/assetlinks.json.template`.
6. Publish that file at `https://skyarecom.github.io/.well-known/assetlinks.json` or move the Academy to a custom domain and publish it at that domain root.
7. Verify TWA Digital Asset Links on a release-signed build.
8. Complete Data Safety, privacy policy URL, target audience, content rating and app access declarations.
9. Prepare Store Listing assets: icon, feature graphic, phone screenshots, short description and full description.
10. Run internal/closed testing before production.

## Product positioning

StackUp Hold'em Academy is an educational poker learning and training application. It does not offer real-money wagering, deposits, withdrawals, prizes, gambling services, or gambling transactions.
