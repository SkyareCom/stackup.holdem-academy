const fs=require('fs');
const assert=require('node:assert/strict');

const gradle=fs.readFileSync('android/app/build.gradle.kts','utf8');
const manifest=fs.readFileSync('android/app/src/main/AndroidManifest.xml','utf8');
const main=fs.readFileSync('android/app/src/main/java/com/skyare/stackupacademy/MainActivity.java','utf8');
const index=fs.readFileSync('index.html','utf8');
const sw=fs.readFileSync('sw.js','utf8');
const workflow=fs.readFileSync('.github/workflows/android-build.yml','utf8');

assert(gradle.includes('versionCode = 215'),'release versionCode must be 215');
assert(gradle.includes('versionName = "2.1.5"'),'release versionName must be 2.1.5');
assert(gradle.includes('applicationIdSuffix = ".test215"'),'debug package must be test215');

assert(manifest.includes('android:name="com.skyare.stackupacademy.MainActivity"'),'production launcher must be native MainActivity');
assert(!manifest.includes('com.google.androidbrowserhelper.trusted'),'production manifest must not use old TWA launcher');
assert(!gradle.includes('com.google.androidbrowserhelper'),'old Android Browser Helper dependency must remain removed');
assert(gradle.includes('com.android.billingclient:billing:9.1.0'),'Play Billing 9.1.0 must be included');
assert(main.includes('billing-production.js?v=215'),'native shell must load the billing bridge');
const billing=fs.readFileSync('android/app/src/main/java/com/skyare/stackupacademy/BillingManager.java','utf8');
assert(billing.includes('PRODUCT_ID = "academy_access"'),'subscription product ID must be academy_access');
assert(billing.includes('BASE_MONTHLY = "monthly"'),'monthly base plan must be wired');
assert(billing.includes('BASE_SIX_MONTH = "six-month"'),'six-month base plan must be wired');
assert(billing.includes('BASE_ANNUAL = "annual"'),'annual base plan must be wired');
assert(billing.includes('acknowledgePurchase'),'subscription purchases must be acknowledged');
assert(billing.includes('queryPurchasesAsync'),'active subscriptions must be restored');

assert(main.includes('CACHE_SCHEMA = 215'),'native cache schema must match build 215');
assert(main.includes('?android_build=215&cache_reset=1'),'recovery URL must identify build 215');
assert(main.includes('SHELL_CREATE version=215'),'startup diagnostics must identify build 215');
assert(main.includes('?android_build=215&migrated=1'),'cache cleanup reload must identify build 215');
assert(main.includes('auth-production.js?v=215'),'native auth loader must be cache-busted for build 215');

assert(main.includes('webView = new WebView(this);'),'native WebView launcher must remain present');
assert(main.includes('onRenderProcessGone'),'renderer loss must be handled');
assert(main.includes('rendererRecoveryAttempted'),'renderer recovery must be bounded');
assert(main.includes('WEB_RENDERER_GONE'),'renderer failure must be observable');
assert(main.includes('showPermanentError()'),'startup failure must degrade to in-app error');

assert(index.includes('<meta name="stackup-release" content="2.1.5">'),'hosted web release must be 2.1.5');
assert(index.includes('const APP_VERSION="2.1.5";'),'visible app version must be 2.1.5');
assert(sw.includes('academy-v2.1.5-play-update-20261001'),'service worker hotfix cache must be active');

assert(workflow.includes('Smoke test APK on Android 14 emulator'),'CI must include Android 14 smoke test');
assert(workflow.includes('api-level: 34'),'CI must exercise API 34');
assert(workflow.includes('api-level: 36'),'CI must retain API 36 coverage');

console.log('Android shell contract OK: 2.1.5/215, native launcher, renderer recovery, API 34 + API 36.');
