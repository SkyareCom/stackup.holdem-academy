const fs=require('fs');
const assert=require('node:assert/strict');

const gradle=fs.readFileSync('android/app/build.gradle.kts','utf8');
const manifest=fs.readFileSync('android/app/src/main/AndroidManifest.xml','utf8');
const main=fs.readFileSync('android/app/src/main/java/com/skyare/stackupacademy/MainActivity.java','utf8');
const index=fs.readFileSync('index.html','utf8');
const sw=fs.readFileSync('sw.js','utf8');
const workflow=fs.readFileSync('.github/workflows/android-build.yml','utf8');

assert(gradle.includes('versionCode = 212'),'release versionCode must be 212');
assert(gradle.includes('versionName = "2.1.2"'),'release versionName must be 2.1.2');
assert(gradle.includes('applicationIdSuffix = ".test212"'),'debug package must be test212');

assert(manifest.includes('android:name="com.skyare.stackupacademy.MainActivity"'),'production launcher must be native MainActivity');
assert(!manifest.includes('com.google.androidbrowserhelper.trusted'),'production manifest must not use old TWA launcher');
assert(!gradle.includes('com.google.androidbrowserhelper'),'old Android Browser Helper dependency must remain removed');

assert(main.includes('CACHE_SCHEMA = 212'),'native cache schema must match build 212');
assert(main.includes('?android_build=212&cache_reset=1'),'recovery URL must identify build 212');
assert(main.includes('SHELL_CREATE version=212'),'startup diagnostics must identify build 212');
assert(main.includes('?android_build=212&migrated=1'),'cache cleanup reload must identify build 212');
assert(main.includes('auth-production.js?v=212'),'native auth loader must be cache-busted for build 212');

assert(main.includes('webView = new WebView(this);'),'native WebView launcher must remain present');
assert(main.includes('onRenderProcessGone'),'renderer loss must be handled');
assert(main.includes('rendererRecoveryAttempted'),'renderer recovery must be bounded');
assert(main.includes('WEB_RENDERER_GONE'),'renderer failure must be observable');
assert(main.includes('showPermanentError()'),'startup failure must degrade to in-app error');

assert(index.includes('<meta name="stackup-release" content="2.1.2">'),'hosted web release must be 2.1.2');
assert(index.includes('const APP_VERSION="2.1.2";'),'visible app version must be 2.1.2');
assert(sw.includes('academy-v2.1.2-android14-hotfix-20260930'),'service worker hotfix cache must be active');

assert(workflow.includes('Smoke test APK on Android 14 emulator'),'CI must include Android 14 smoke test');
assert(workflow.includes('api-level: 34'),'CI must exercise API 34');
assert(workflow.includes('api-level: 36'),'CI must retain API 36 coverage');

console.log('Android shell contract OK: 2.1.2/212, native launcher, renderer recovery, API 34 + API 36.');
