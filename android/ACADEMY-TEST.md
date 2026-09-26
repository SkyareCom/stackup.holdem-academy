# StackUp Academy TEST

This debug variant installs as `com.skyare.stackupacademy.test` with the visible
name **StackUp Academy TEST**, alongside the official `com.skyare.stackupacademy`.
It uses the supplied `ProtestRiot-Regular.ttf` throughout the web interface.
Only font family is overridden; the existing sizing and layout rules remain.

Build with Node.js, Java 17, Android SDK 36 and Gradle 9.6.0:

```sh
node scripts/test-test-assets.js
gradle -p android :app:assembleDebug :app:lintDebug
```

Output: `android/app/build/outputs/apk/debug/app-debug.apk`.
The **Academy TEST APK** workflow builds and verifies this debug APK without
release signing secrets, AAB generation, Pages deployment or Play publication.

The debug APK bundles the repository's web files plus the same HTML enhancements
normally supplied by `sw.js`. It serves them under an app-private HTTPS origin
through `TestActivity`, so the experiment works offline and never changes the
hosted Academy. Debug assets are generated under `build/` and excluded from git.
The official `MainActivity`, main resources and root web assets are unchanged.
The debug launcher is a separate snapshot of MainActivity: future native fixes
should be reviewed for both launchers.

The TEST app has separate local progress/storage. It does not import or overwrite
official app data. Android's regular debug key signs this build. Subsequent APKs
must use the same debug key to update in place; a new CI runner can use a different
key and require uninstalling the previous TEST app (which clears TEST progress).

## Existing audit failures at the source baseline

At source commit `425c53361a0e1d6cc35e97400b1c8f764f818a6a`:

- `test-i18n.js`: two checks fail for incomplete English translations.
- `test-quiz-quality.js`: 123 duplicate-question checks fail.
- `test-table-layout.js`: the existing geometry assertion fails.
- `test-ui-release.js`: expects 1.0.4/build 100, while the source is 1.0.5/build 101.

These audits run and their logs are retained as diagnostics. They are separate
from the blocking TEST font, snapshot, browser, Android lint, signature and
offline-launch checks. No official content has been rewritten to silence them.
