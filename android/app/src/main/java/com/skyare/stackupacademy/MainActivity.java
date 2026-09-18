package com.skyare.stackupacademy;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.view.Gravity;
import android.view.ViewGroup;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;
import android.widget.TextView;

public class MainActivity extends Activity {
    private static final String APP_URL = "https://skyarecom.github.io/stackup.holdem-academy/";
    private static final String APP_HOST = "skyarecom.github.io";
    private static final String APP_PATH = "/stackup.holdem-academy/";

    private WebView webView;
    private FrameLayout root;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        getWindow().setStatusBarColor(Color.rgb(5, 72, 37));
        getWindow().setNavigationBarColor(Color.rgb(44, 32, 20));

        root = new FrameLayout(this);
        root.setBackgroundColor(Color.rgb(7, 20, 13));
        setContentView(root);
        showLoadingMessage();

        try {
            createAndLoadWebView(savedInstanceState);
        } catch (Throwable error) {
            showPermanentError();
        }
    }

    private void showLoadingMessage() {
        root.removeAllViews();
        TextView loading = new TextView(this);
        loading.setText("STACKUP HOLD'EM ACADEMY\n\nCarregando...");
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
        WebView.setWebContentsDebuggingEnabled(BuildConfig.DEBUG);

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

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            settings.setSafeBrowsingEnabled(true);
        }

        webView.setWebChromeClient(new WebChromeClient());
        webView.setWebViewClient(new WebViewClient() {
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
                if (request != null && request.isForMainFrame()) {
                    showPermanentError();
                }
            }

            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                if (root != null && webView != null && webView.getParent() == null) {
                    root.removeAllViews();
                    root.addView(webView, new FrameLayout.LayoutParams(
                            ViewGroup.LayoutParams.MATCH_PARENT,
                            ViewGroup.LayoutParams.MATCH_PARENT));
                }
            }
        });

        if (savedInstanceState != null && webView.restoreState(savedInstanceState) != null) {
            if (webView.getParent() == null) {
                root.removeAllViews();
                root.addView(webView, new FrameLayout.LayoutParams(
                        ViewGroup.LayoutParams.MATCH_PARENT,
                        ViewGroup.LayoutParams.MATCH_PARENT));
            }
            return;
        }

        webView.loadUrl(APP_URL);
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
        error.setText("STACKUP HOLD'EM ACADEMY\n\nNao foi possivel abrir o aplicativo.\nVerifique sua conexao com a internet e abra novamente.");
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

    @Override
    @SuppressWarnings("deprecation")
    public void onBackPressed() {
        if (webView != null && webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }

    @Override
    protected void onDestroy() {
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
