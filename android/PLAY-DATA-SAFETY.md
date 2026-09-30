# Google Play Data Safety — release preparation

This file is a release checklist, not a substitute for the declarations made in Play Console.

## Current Android shell

The Android package itself requests only:

- `android.permission.INTERNET`

The shell does not request contacts, location, microphone, camera, storage, SMS, phone, advertising ID, or background location permissions.

Android backup is disabled and Android 12+ data extraction rules exclude application data from cloud backup and device-to-device transfer.

## Current web application

Before each Play submission, verify the production web build actually shipped at:

`https://skyarecom.github.io/stackup.holdem-academy/`

The Data Safety form must reflect the behavior of that production build and every SDK/service it uses.

## Supabase authentication — before enabling in production

Supabase is planned for authentication/account data but must not be declared as active until the production build actually uses it.

When enabled, document at minimum:

- account identifiers collected (for example email address, phone number, provider user ID);
- purpose: account management/authentication;
- whether data is encrypted in transit;
- whether account data can be deleted;
- retention/deletion rules;
- any analytics, crash reporting, marketing or profiling services added later;
- all third-party processors/subprocessors that receive user data.

If Google Sign-In is enabled, include the Google identity data actually requested by the app. Request only the scopes needed for authentication.

If WhatsApp/phone OTP is enabled, document phone-number processing and the provider used to deliver/verify the OTP.

Biometric authentication should use the Android biometric APIs so biometric templates remain on the device. Do not store raw biometric data in the app or Supabase.

## Account deletion

If the released app allows users to create an account, provide:

1. an in-app way to request account deletion; and
2. the external account-deletion URL required by the Play Console account-deletion declaration.

Deletion must remove the user's account and associated user data according to the published retention policy, except data that must legally be retained.

## Release gate

Do not submit the Data Safety form from assumptions. Complete it from the exact production release candidate after checking:

- Android permissions;
- Java/Kotlin dependencies;
- WebView-loaded scripts and services;
- authentication providers;
- Supabase tables/functions;
- analytics/crash SDKs;
- payment/subscription SDKs;
- privacy policy and deletion flow.

