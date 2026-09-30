# StackUp Academy — Production Authentication Setup

This release uses Supabase Auth as the account backend.

## Architecture

- Google: Android Credential Manager -> Google ID token -> Supabase Auth.
- WhatsApp: Supabase Phone Auth -> Twilio/Twilio Verify WhatsApp OTP -> Supabase session.
- Biometrics: Android BiometricPrompt unlocks an already authenticated Supabase session. No biometric template or raw biometric data is stored by StackUp or Supabase.
- The existing Academy visual login screen is preserved.

## 1. Supabase project

Create or select the production Supabase project.

Collect:

- Project URL, for example: `https://YOUR_PROJECT.supabase.co`
- Publishable/anon key intended for client applications

Do not use the Supabase service-role key in the Android app.

The Android build reads:

- `STACKUP_SUPABASE_URL`
- `STACKUP_SUPABASE_ANON_KEY`

For GitHub Actions, configure these as repository/environment secrets or variables used by the release workflow.

## 2. Google provider in Supabase

In Supabase Dashboard:

Authentication -> Providers -> Google

Enable Google and configure the Google OAuth client used by this app.

Android currently uses this Web OAuth Client ID for ID-token audience validation:

`900430977321-mf76iecc9im76c53mh863shj9b29jk9p.apps.googleusercontent.com`

The Android package remains:

`com.skyare.stackupacademy`

Make sure the Google Cloud project includes the production Android OAuth client with the correct package name and the SHA-1/SHA-256 fingerprints for the signing configuration required by Google.

The native Android client sends the Google ID token to Supabase using the ID-token sign-in flow. OAuth is not performed inside the WebView.

## 3. WhatsApp OTP

Supabase phone sign-in supports WhatsApp through Twilio/Twilio Verify.

In Supabase Dashboard:

Authentication -> Providers -> Phone

Enable Phone authentication.

Configure Twilio or Twilio Verify credentials and a WhatsApp-capable sender according to the Supabase/Twilio setup.

The app requests OTP with:

- `channel: "whatsapp"`
- E.164 phone number, e.g. `+5511999999999`

The verification request uses the Supabase phone OTP verification flow.

Before production:

- configure rate limits;
- configure CAPTCHA/abuse controls where appropriate;
- verify the WhatsApp sender/business account;
- test Brazilian numbers and every market you plan to support;
- confirm message templates and provider compliance.

## 4. Biometrics

Biometrics are intentionally not a standalone remote identity provider.

Flow:

1. User first authenticates with Google or WhatsApp.
2. Supabase creates the authenticated session.
3. On a later entry, the user may select biometrics.
4. Android BiometricPrompt validates the local user.
5. The app resumes/refreses the existing Supabase session.

The app never receives or stores fingerprint/face templates.

## 5. Required build environment

A production/release build must receive:

```
STACKUP_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
STACKUP_SUPABASE_ANON_KEY=YOUR_CLIENT_ANON_OR_PUBLISHABLE_KEY
```

Release signing still uses the existing upload-key variables.

## 6. Release verification

Before Play upload verify all three paths on a physical Android device:

### Google

- account picker opens natively;
- Google token is accepted by Supabase;
- new/existing user appears under Supabase Auth users;
- returning login restores a valid session.

### WhatsApp

- valid international number receives the WhatsApp OTP;
- wrong OTP is rejected;
- correct OTP creates/restores the Supabase user;
- rate limiting prevents repeated abuse.

### Biometrics

- unavailable biometrics show a controlled message;
- failed/cancelled biometrics do not open the app;
- biometrics cannot be used before a valid Google/WhatsApp Supabase session exists;
- successful biometrics resumes a valid Supabase session.

## 7. Play Data Safety

When this auth configuration is enabled in the release candidate, update the Play Console Data Safety answers to match actual production behavior.

At minimum review:

- email address/profile data from Google;
- phone number from WhatsApp login;
- account identifiers;
- authentication data;
- deletion and retention behavior;
- Twilio and Supabase as processors/subprocessors where applicable.

If users can create accounts, the production app must also provide the required account-deletion path and external deletion URL before production rollout.
