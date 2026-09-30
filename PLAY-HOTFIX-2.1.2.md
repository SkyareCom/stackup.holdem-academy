# StackUp Hold'em Academy — Android 14 crash hotfix 2.1.2 (212)

Tester report on 2026-09-30:
- Samsung SM-A526B
- Android 14 / SDK 34
- installed client 1.0.10 (build 106)
- app closed during initialization and Android suggested clearing the app cache.

Build 106 is an obsolete production architecture: it used the TWA launcher via Android Browser Helper. The current release uses the native MainActivity WebView shell instead.

Hotfix 2.1.2 / 212 keeps the native launcher, renderer-loss recovery, one controlled main-frame retry, synchronized cache/recovery markers, and adds explicit CI smoke coverage on Android 14 (API 34) while retaining Android 16 (API 36).
