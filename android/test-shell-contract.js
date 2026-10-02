const fs=require('fs');
const assert=require('node:assert/strict');

const gradle=fs.readFileSync('android/app/build.gradle.kts','utf8');
const manifest=fs.readFileSync('android/app/src/main/AndroidManifest.xml','utf8');
const main=fs.readFileSync('android/app/src/main/java/com/skyare/stackupacademy/MainActivity.java','utf8');
const index=fs.readFileSync('index.html','utf8');
const sw=fs.readFileSync('sw.js','utf8');
const workflow=fs.readFileSync('.github/workflows/android-build.yml','utf8');

assert(gradle.includes('versionCode = 218'),'release versionCode must be 218');
assert(gradle.includes('versionName = "2.1.6"'),'release versionName must be 2.1.6');
assert(gradle.includes('applicationIdSuffix = ".test218"'),'debug package must be test218');
assert(main.includes('APP_URL = "https://skyarecom.github.io/stackup.holdem-academy.pub/"'),'native shell must preserve the Academy origin');
assert(main.includes('APP_PATH = "/stackup.holdem-academy.pub/"'),'native shell path restriction must match the Academy path');
assert(main.includes('APP_ENTRY_URL'),'native shell must use an explicit bundled entry document');
assert(main.includes('index.html?android_build=218'),'bundled entry must identify build 218');
assert(main.includes('WebViewAssetLoader'),'native shell must serve bundled web assets');
assert(main.includes('LOCAL_ASSET_MAIN_FRAME=true'),'native shell must log bundled main-frame delivery');
assert(main.includes('onReceivedHttpError'),'native shell must handle main-frame HTTP failures');
assert(gradle.includes('androidx.webkit:webkit:1.14.0'),'WebViewAssetLoader dependency must be pinned');
assert(gradle.includes('syncAcademyWebAssets'),'Android build must package the Academy web release');
assert(gradle.includes('assets.srcDir(academyWebAssetsDir)'),'generated Academy web assets must be part of the APK/AAB');

assert(manifest.includes('android:name="com.skyare.stackupacademy.MainActivity"'),'production launcher must be native MainActivity');
assert(!manifest.includes('com.google.androidbrowserhelper.trusted'),'production manifest must not use old TWA launcher');
assert(!gradle.includes('com.google.androidbrowserhelper'),'old Android Browser Helper dependency must remain removed');
assert(gradle.includes('com.android.billingclient:billing:9.1.0'),'Play Billing 9.1.0 must be included');
assert(main.includes('billing-production.js?v=218'),'native shell must load the billing bridge');
const billing=fs.readFileSync('android/app/src/main/java/com/skyare/stackupacademy/BillingManager.java','utf8');
assert(billing.includes('PRODUCT_ID = "academy_access"'),'subscription product ID must be academy_access');
assert(billing.includes('BASE_MONTHLY = "monthly"'),'monthly base plan must be wired');
assert(billing.includes('BASE_SIX_MONTH = "six-month"'),'six-month base plan must be wired');
assert(billing.includes('BASE_ANNUAL = "annual"'),'annual base plan must be wired');
assert(billing.includes('acknowledgePurchase'),'subscription purchases must be acknowledged');
assert(billing.includes('queryPurchasesAsync'),'active subscriptions must be restored');

assert(main.includes('CACHE_SCHEMA = 218'),'native cache schema must match build 218');
assert(main.includes('index.html?android_build=218&cache_reset=1'),'recovery URL must use the bundled entry for build 218');
assert(main.includes('SHELL_CREATE version=218'),'startup diagnostics must identify build 218');
assert(main.includes('migrated=1'),'cache cleanup reload must return to the bundled build 218 entry');
assert(main.includes('auth-production.js?v=218'),'native auth loader must be cache-busted for build 218');

assert(main.includes('webView = new WebView(this);'),'native WebView launcher must remain present');
assert(main.includes('onRenderProcessGone'),'renderer loss must be handled');
assert(main.includes('rendererRecoveryAttempted'),'renderer recovery must be bounded');
assert(main.includes('WEB_RENDERER_GONE'),'renderer failure must be observable');
assert(main.includes('showPermanentError()'),'startup failure must degrade to in-app error');

assert(index.includes('<meta name="stackup-release" content="2.1.6">'),'hosted web release must be 2.1.6');
assert(index.includes('const APP_VERSION="2.1.6";'),'visible app version must be 2.1.6');
assert(sw.includes('academy-v2.1.6-ui-balance-r2-20261001'),'service worker hotfix cache must be active');

assert(workflow.includes('Smoke test APK on Android 14 emulator'),'CI must include Android 14 smoke test');
assert(workflow.includes('api-level: 34'),'CI must exercise API 34');
assert(workflow.includes('api-level: 36'),'CI must retain API 36 coverage');

console.log('Android shell contract OK: 2.1.6/218, bundled native shell, HTTP recovery, API 34 + API 36.');
