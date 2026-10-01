# StackUp Hold'em Academy Android

Android production packaging for the StackUp Hold'em Academy web application.

- Application ID: `com.skyare.stackupacademy`
- Version: `2.1.6` (`versionCode 216`)
- `compileSdk`: 36
- `targetSdk`: 36
- Minimum Android: API 24
- Architecture: native Android shell + restricted WebView
- Content URL: `https://skyarecom.github.io/stackup.holdem-academy/`
- Java: 17
- Android Gradle Plugin: 9.4.0

## Why WebView instead of TWA

The production package intentionally uses a native WebView shell instead of a Trusted Web Activity. This removes the browser/Custom Tab fallback and the dependency on Digital Asset Links at the GitHub Pages origin root.

The WebView is restricted to the official Academy path. External links are opened in the device browser.

## Production safeguards

- INTERNET is the only requested permission.
- Cleartext HTTP traffic is disabled.
- File and content access are disabled inside the WebView.
- Mixed content is blocked.
- Safe Browsing is enabled when supported.
- Web contents debugging is enabled only for debuggable builds.
- Android Back uses WebView history before closing the Activity.
- WebView renderer failure has one controlled recovery attempt.
- Legacy cache/service-worker state is migrated for release 2.1.6.

## Build

CI runs release lint, builds the release Android App Bundle and release/debug APKs, verifies package/launcher metadata, and smoke-tests the app on an Android emulator.

Local release build:

`gradle -p android :app:bundleRelease`

Output:

`android/app/build/outputs/bundle/release/app-release.aab`

## Production signing

The release build supports an upload keystore supplied only through environment variables / GitHub Actions secrets. Keys and passwords must never be committed.

When signing credentials are present, CI signs the AAB with the upload key and verifies the artifact. The generated bundle folder also contains `RELEASE-INFO.txt` and a SHA-256 checksum.

## Play Store metadata

Store text is kept under:

- `android/store-listing/pt-BR/`
- `android/store-listing/en-US/`

The product is positioned as poker education and training. It does not provide real-money wagering, deposits, withdrawals, prizes, or gambling transactions.


## Current Play build

Build source: Academy UI R3 + Google Play subscriptions, prepared for Play AAB `2.1.6` / `versionCode 216`.

## Google Play subscriptions

- Play Billing Library: `9.1.0`
- Subscription product ID: `academy_access`
- Base plan IDs: `monthly`, `six-month`, `annual`
- The native shell restores active subscriptions at startup and acknowledges new purchases.
- The hosted UI delegates paid-plan buttons to the native Play Billing flow when running inside the Android app.
