// Debug-only snapshot of the native launcher; release MainActivity remains unchanged.
package com.skyare.stackupacademy;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.ApplicationInfo;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.view.Gravity;
import android.view.KeyEvent;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowInsets;
import android.view.WindowInsetsController;
import android.window.OnBackInvokedCallback;
import android.window.OnBackInvokedDispatcher;
import android.webkit.ConsoleMessage;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.WebResourceResponse;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.Collections;
import android.widget.FrameLayout;
import android.widget.TextView;

public class TestActivity extends Activity {
    private static final String APP_URL = "https://appassets.androidplatform.net/academy/";
    private static final String APP_HOST = "appassets.androidplatform.net";
    private static final String APP_PATH = "/academy/";
    private static final String TAG = "StackUpAcademy";
    private static final String PREFS = "stackup_android_shell";
    private static final String CACHE_SCHEMA_KEY = "cache_schema";
    private static final int CACHE_SCHEMA = 5;
    private static final String RECOVERY_URL =
            "https://appassets.androidplatform.net/academy/?android_build=5&cache_reset=1";

    private WebView webView;
    private FrameLayout root;
    private OnBackInvokedCallback backCallback;
    private boolean webRecoveryPending;
    private boolean nativeRetryAttempted;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        root = new FrameLayout(this);
        root.setBackgroundColor(Color.rgb(7, 20, 13));
        setContentView(root);
        showLoadingMessage();
        root.post(this::applyImmersiveFullscreen);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            backCallback = this::handleBackNavigation;
            getOnBackInvokedDispatcher().registerOnBackInvokedCallback(
                    OnBackInvokedDispatcher.PRIORITY_DEFAULT,
                    backCallback);
        }

        try {
            Log.i(TAG, "SHELL_CREATE");
            createAndLoadWebView(savedInstanceState);
        } catch (Throwable error) {
            showPermanentError();
        }
    }

    @SuppressWarnings("deprecation")
    private void applyImmersiveFullscreen() {
        View decor = getWindow().getDecorView();
        if (decor == null || !decor.isAttachedToWindow()) {
            return;
        }

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            WindowInsetsController controller = decor.getWindowInsetsController();
            if (controller == null) {
                return;
            }
            controller.hide(WindowInsets.Type.statusBars() | WindowInsets.Type.navigationBars());
            controller.setSystemBarsBehavior(
                    WindowInsetsController.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE);
            return;
        }

        decor.setSystemUiVisibility(
                View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
                        | View.SYSTEM_UI_FLAG_FULLSCREEN
                        | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                        | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                        | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                        | View.SYSTEM_UI_FLAG_LAYOUT_STABLE);
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (root != null) {
            root.post(this::applyImmersiveFullscreen);
        }
    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        if (hasFocus) {
            applyImmersiveFullscreen();
        }
    }

    private void showLoadingMessage() {
        root.removeAllViews();
        TextView loading = new TextView(this);
        loading.setText("StackUp Academy TEST\n\nCarregando...");
        loading.setTextColor(Color.WHITE);
        loading.setTextSize(18f);
        loading.setGravity(Gravity.CENTER);
        loading.setPadding(32, 32, 32, 32);
        root.addView(loading, new FrameLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT));
    }

    @SuppressLint("SetJavaScriptEnabled")
    private void createAndLoadWebView(Bundle savedInstanceState) {
        webView = new WebView(this);
        webView.setBackgroundColor(Color.rgb(7, 20, 13));

        boolean isDebuggable =
                (getApplicationInfo().flags & ApplicationInfo.FLAG_DEBUGGABLE) != 0;
        WebView.setWebContentsDebuggingEnabled(isDebuggable);

        SharedPreferences prefs = getSharedPreferences(PREFS, MODE_PRIVATE);
        webRecoveryPending = prefs.getInt(CACHE_SCHEMA_KEY, 0) < CACHE_SCHEMA;
        if (webRecoveryPending) {
            webView.clearCache(true);
        }

        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setLoadWithOverviewMode(false);
        settings.setUseWideViewPort(false);
        settings.setSupportZoom(false);
        settings.setBuiltInZoomControls(false);
        settings.setDisplayZoomControls(false);
        settings.setAllowFileAccess(false);
        settings.setAllowContentAccess(false);
        settings.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);
        if (webRecoveryPending) {
            settings.setCacheMode(WebSettings.LOAD_NO_CACHE);
        }

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            settings.setSafeBrowsingEnabled(true);
        }

        root.removeAllViews();
        root.addView(webView, new FrameLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT));
        Log.i(TAG, "WEBVIEW_ATTACHED recovery=" + webRecoveryPending);

        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public boolean onConsoleMessage(ConsoleMessage consoleMessage) {
                Log.d(TAG, "CONSOLE " + consoleMessage.messageLevel() + ": " + consoleMessage.message());
                return true;
            }
        });
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
                Uri uri = request.getUrl();
                if (!APP_HOST.equals(uri.getHost())) return null;
                String path = uri.getPath();
                if (!"https".equals(uri.getScheme()) || path == null || !path.startsWith(APP_PATH)
                        || path.contains("..") || path.contains("\\")) return missingAsset();
                if (path.endsWith("/")) path += "index.html";
                String mime = "application/octet-stream";
                if (path.endsWith(".html")) mime = "text/html";
                else if (path.endsWith(".js")) mime = "application/javascript";
                else if (path.endsWith(".css")) mime = "text/css";
                else if (path.endsWith(".ttf")) mime = "font/ttf";
                else if (path.endsWith(".png")) mime = "image/png";
                else if (path.endsWith(".webp")) mime = "image/webp";
                else if (path.endsWith(".webmanifest")) mime = "application/manifest+json";
                try {
                    return new WebResourceResponse(mime, "UTF-8", 200, "OK",
                            Collections.singletonMap("Cache-Control", "no-store"),
                            getAssets().open(path.substring(1)));
                } catch (IOException error) {
                    Log.e(TAG, "TEST_ASSET_MISSING=" + path);
                    return missingAsset();
                }
            }

            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                return handleNavigation(request.getUrl());
            }

            @Override
            @SuppressWarnings("deprecation")
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                return handleNavigation(Uri.parse(url));
            }

            @Override
            public void onReceivedError(WebView view, WebResourceRequest request, WebResourceError error) {
                if (request == null || !request.isForMainFrame()) {
                    return;
                }

                Log.e(TAG, "MAIN_FRAME_ERROR code=" + error.getErrorCode()
                        + " description=" + error.getDescription()
                        + " url=" + request.getUrl());

                if (!nativeRetryAttempted) {
                    nativeRetryAttempted = true;
                    view.stopLoading();
                    view.clearCache(true);
                    view.getSettings().setCacheMode(WebSettings.LOAD_NO_CACHE);
                    Log.w(TAG, "MAIN_FRAME_RETRY");
                    view.loadUrl(RECOVERY_URL + "&retry=1");
                    return;
                }

                showPermanentError();
            }

            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                Log.i(TAG, "PAGE_FINISHED url=" + url + " recovery=" + webRecoveryPending);

                if (webRecoveryPending && url != null && url.startsWith(APP_URL)) {
                    webRecoveryPending = false;
                    getSharedPreferences(PREFS, MODE_PRIVATE)
                            .edit()
                            .putInt(CACHE_SCHEMA_KEY, CACHE_SCHEMA)
                            .apply();

                    String cleanupScript =
                            "(async()=>{try{" +
                            "if('caches' in window){const ks=await caches.keys();await Promise.all(ks.map(k=>caches.delete(k)));}" +
                            "if('serviceWorker' in navigator){const rs=await navigator.serviceWorker.getRegistrations();await Promise.all(rs.map(r=>r.unregister()));}" +
                            "return 'ok';}catch(e){return 'cleanup-error';}})();";
                    view.evaluateJavascript(
                            cleanupScript,
                            value -> Log.i(TAG, "WEB_CACHE_CLEANUP=" + value));
                }

                view.getSettings().setCacheMode(WebSettings.LOAD_DEFAULT);
                view.postDelayed(
                        () -> view.evaluateJavascript(
                                "(function(){return !!(document.querySelector('.app')&&document.querySelector('#root .screen'));})();",
                                value -> Log.i(TAG, "WEB_CONTENT_READY=" + value)),
                        1200);
            }
        });

        if (!webRecoveryPending
                && savedInstanceState != null
                && webView.restoreState(savedInstanceState) != null) {
            Log.i(TAG, "WEBVIEW_STATE_RESTORED");
            return;
        }

        String initialUrl = webRecoveryPending ? RECOVERY_URL + "&bootstrap=1" : APP_URL;
        Log.i(TAG, "LOAD_URL=" + initialUrl);
        webView.loadUrl(initialUrl);
    }

    private static WebResourceResponse missingAsset() {
        return new WebResourceResponse("text/plain", "UTF-8", 404, "Not Found",
                Collections.emptyMap(), new ByteArrayInputStream(new byte[0]));
    }

    private boolean handleNavigation(Uri uri) {
        if (uri != null
                && "https".equalsIgnoreCase(uri.getScheme())
                && APP_HOST.equalsIgnoreCase(uri.getHost())
                && uri.getPath() != null
                && uri.getPath().startsWith(APP_PATH)) {
            return false;
        }

        if (uri != null) {
            try {
                Intent intent = new Intent(Intent.ACTION_VIEW, uri);
                intent.addCategory(Intent.CATEGORY_BROWSABLE);
                startActivity(intent);
                return true;
            } catch (ActivityNotFoundException ignored) {
                return true;
            }
        }
        return true;
    }

    private void showPermanentError() {
        Log.e(TAG, "PERMANENT_ERROR_SCREEN");
        if (root == null) {
            return;
        }
        if (webView != null) {
            try {
                webView.stopLoading();
            } catch (Throwable ignored) {
                // Keep the error screen stable even if WebView is already unavailable.
            }
        }

        root.removeAllViews();
        TextView error = new TextView(this);
        error.setText("StackUp Academy TEST\n\nNao foi possivel abrir o aplicativo.\nVerifique sua conexao com a internet e abra novamente.");
        error.setTextColor(Color.WHITE);
        error.setTextSize(17f);
        error.setGravity(Gravity.CENTER);
        error.setPadding(40, 40, 40, 40);
        root.addView(error, new FrameLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT));
    }

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        if (webView != null) {
            webView.saveState(outState);
        }
        super.onSaveInstanceState(outState);
    }

    private void handleBackNavigation() {
        if (webView == null) {
            finish();
            return;
        }

        webView.evaluateJavascript(
                "(function(){try{return window.StackUpNativeBack?String(window.StackUpNativeBack()):'false';}catch(e){return 'false';}})();",
                value -> {
                    if (!"\"true\"".equals(value)) {
                        finish();
                    }
                });
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.TIRAMISU
                && keyCode == KeyEvent.KEYCODE_BACK
                && event.getRepeatCount() == 0) {
            handleBackNavigation();
            return true;
        }
        return super.onKeyDown(keyCode, event);
    }

    @Override
    protected void onDestroy() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU && backCallback != null) {
            getOnBackInvokedDispatcher().unregisterOnBackInvokedCallback(backCallback);
            backCallback = null;
        }
        if (webView != null) {
            try {
                webView.stopLoading();
                webView.loadUrl("about:blank");
                webView.removeAllViews();
                webView.destroy();
            } catch (Throwable ignored) {
                // Cleanup must never crash the launcher.
            }
            webView = null;
        }
        super.onDestroy();
    }
}
