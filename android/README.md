# StackUp Hold'em Academy Android

This directory contains the Android packaging for the frozen Academy Web 1.0.0 release.

- Application ID: `com.skyare.stackupacademy`
- Version: `1.0.0` (`versionCode 1`)
- `compileSdk`: 36
- `targetSdk`: 36
- Minimum Android: API 24
- Architecture: Trusted Web Activity (TWA)
- Start URL: `https://skyarecom.github.io/stackup.holdem-academy/`
- Android Browser Helper: 2.7.2
- Java: 17
- Android Gradle Plugin: 9.4.0

## Build

The repository CI builds an unsigned release Android App Bundle with Gradle 9.6.0:

`gradle -p android :app:bundleRelease`

The resulting bundle is located under `android/app/build/outputs/bundle/release/`.

## Signing

Do not commit the upload keystore or passwords. Google Play signing credentials must be configured separately before the production upload.

## Digital Asset Links blocker

A verified TWA requires Digital Asset Links at the web origin root:

`https://skyarecom.github.io/.well-known/assetlinks.json`

The Academy is currently hosted at the project path `https://skyarecom.github.io/stackup.holdem-academy/`, so the project repository alone cannot publish that root-level file. Before production, deploy the generated `assetlinks.json` at the origin root (or move the Academy to a custom domain) using the SHA-256 fingerprint of the final Play signing certificate.

Until verification is configured, Android Browser Helper can fall back to a Custom Tab for development/testing.
