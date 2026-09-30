(() => {
  "use strict";

  const SESSION_KEY = "stackup.supabase.session.v1";
  const native = window.StackUpNative;
  const api = window.StackUpProductionAuth = window.StackUpProductionAuth || {};

  const q = (s) => document.querySelector(s);
  const say = (message) => {
    try {
      if (typeof toast === "function") toast(message, 4000);
      else console.warn("[StackUp Auth]", message);
    } catch (_) {
      console.warn("[StackUp Auth]", message);
    }
  };

  function config() {
    const url = native && native.getSupabaseUrl ? String(native.getSupabaseUrl() || "").replace(/\/$/, "") : "";
    const anonKey = native && native.getSupabaseAnonKey ? String(native.getSupabaseAnonKey() || "") : "";
    return { url, anonKey };
  }

  function configured() {
    const c = config();
    return /^https:\/\/.+\.supabase\.co$/i.test(c.url) && c.anonKey.length > 20;
  }

  function headers() {
    const { anonKey } = config();
    return {
      "Content-Type": "application/json",
      "apikey": anonKey,
      "Authorization": "Bearer " + anonKey
    };
  }

  async function request(path, body) {
    if (!configured()) throw new Error("Supabase ainda não foi configurado neste build.");
    const { url } = config();
    const response = await fetch(url + "/auth/v1" + path, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(body || {})
    });
    let data = {};
    try { data = await response.json(); } catch (_) {}
    if (!response.ok) {
      const message = data.msg || data.message || data.error_description || data.error || ("Erro de autenticação (" + response.status + ")");
      throw new Error(String(message));
    }
    return data;
  }

  function saveSession(data) {
    const now = Math.floor(Date.now() / 1000);
    const session = {
      access_token: data.access_token || "",
      refresh_token: data.refresh_token || "",
      token_type: data.token_type || "bearer",
      expires_at: data.expires_at || (now + Number(data.expires_in || 3600)),
      user: data.user || null
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return session;
  }

  function loadSession() {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (_) {
      return null;
    }
  }

  async function activeSession() {
    let session = loadSession();
    if (!session || !session.refresh_token) return null;
    const now = Math.floor(Date.now() / 1000);
    if (Number(session.expires_at || 0) > now + 60 && session.access_token) return session;
    try {
      const refreshed = await request("/token?grant_type=refresh_token", {
        refresh_token: session.refresh_token
      });
      return saveSession(refreshed);
    } catch (_) {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }
  }

  api.saveWhatsAppTrainingPreference = async (preference) => {
    const session = await activeSession();
    if (!session || !session.access_token || !session.user || !session.user.id) {
      return { synced: false, reason: "no_session" };
    }
    const { url, anonKey } = config();
    const now = new Date().toISOString();
    const optIn = preference && preference.optIn === true;
    const number = String((preference && preference.number) || "").trim();
    if (number && !/^\+[1-9][0-9]{7,14}$/.test(number)) {
      throw new Error("Número de WhatsApp inválido.");
    }
    const payload = {
      user_id: session.user.id,
      whatsapp_number: number || null,
      whatsapp_training_opt_in: optIn,
      whatsapp_training_opt_in_at: optIn ? ((preference && preference.optInAt) || now) : null,
      whatsapp_training_updated_at: now,
      updated_at: now
    };
    const response = await fetch(url + "/rest/v1/profiles?on_conflict=user_id", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": anonKey,
        "Authorization": "Bearer " + session.access_token,
        "Prefer": "resolution=merge-duplicates,return=minimal"
      },
      body: JSON.stringify(payload)
    });
    if (!response.ok) {
      let data = {};
      try { data = await response.json(); } catch (_) {}
      throw new Error(data.message || data.error || "Não foi possível salvar a preferência do WhatsApp.");
    }
    return { synced: true };
  };

  function displayName(user, fallback) {
    const meta = (user && user.user_metadata) || {};
    return meta.full_name || meta.name || fallback || (user && user.email ? user.email.split("@")[0] : "") || "Jogador";
  }

  function finishLogin(session, method, fallbackName) {
    const user = session && session.user ? session.user : {};
    const name = displayName(user, fallbackName);
    const extra = {
      userId: user.id || "",
      email: user.email || "",
      phone: user.phone || "",
      authProvider: method
    };
    if (typeof login === "function") login(name, method, extra);
  }

  api.onGoogleToken = async (idToken, email, name) => {
    try {
      const data = await request("/token?grant_type=id_token", {
        provider: "google",
        id_token: idToken
      });
      const session = saveSession(data);
      finishLogin(session, "google", name || (email ? email.split("@")[0] : ""));
    } catch (error) {
      say(error.message || "Não foi possível entrar com o Google.");
    }
  };

  api.onNativeError = (method, message) => {
    const bio = q("#bioBtn");
    if (bio) bio.classList.remove("on", "ok");
    const bioTxt = q("#bioTxt");
    if (method === "biometric" && bioTxt && typeof t === "function") bioTxt.textContent = t("bTap");
    say(message || "Não foi possível autenticar.");
  };

  api.onBiometricResult = async (success) => {
    const bio = q("#bioBtn");
    const bioTxt = q("#bioTxt");
    if (!success) {
      if (bio) bio.classList.remove("on", "ok");
      if (bioTxt && typeof t === "function") bioTxt.textContent = t("bTap");
      return;
    }
    try {
      const session = await activeSession();
      if (!session) throw new Error("Entre primeiro com Google ou StackUp ID para ativar o acesso biométrico.");
      if (bio) {
        bio.classList.remove("on");
        bio.classList.add("ok");
      }
      if (bioTxt && typeof t === "function") bioTxt.textContent = t("bOk");
      setTimeout(() => finishLogin(session, "biometric"), 350);
    } catch (error) {
      if (bio) bio.classList.remove("on", "ok");
      if (bioTxt && typeof t === "function") bioTxt.textContent = t("bTap");
      say(error.message);
    }
  };

  function startGoogle() {
    if (!configured()) {
      say("Configure o projeto Supabase antes de usar o login.");
      return;
    }
    if (!native || !native.requestGoogleSignIn) {
      say("Login Google nativo indisponível.");
      return;
    }
    native.requestGoogleSignIn();
  }

  document.addEventListener("click", (event) => {
    const google = event.target.closest('[data-go="google"]');
    if (!google) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    startGoogle();
  }, true);

  const bioBtn = q("#bioBtn");
  if (bioBtn) {
    bioBtn.onclick = async () => {
      if (bioBtn.classList.contains("on")) return;
      const session = await activeSession();
      if (!session) {
        say("Entre primeiro com Google ou StackUp ID. Depois a biometria poderá desbloquear sua sessão.");
        return;
      }
      if (!native || !native.requestBiometricUnlock) {
        say("Biometria nativa indisponível.");
        return;
      }
      bioBtn.classList.add("on");
      const bioTxt = q("#bioTxt");
      if (bioTxt && typeof t === "function") bioTxt.textContent = t("bScan");
      native.requestBiometricUnlock();
    };
  }

  let currentPhone = "";
  let resendTimer = null;

  function normalizedPhone() {
    const ddi = q("#ddi");
    const phoneInput = q("#phone");
    const digits = phoneInput ? phoneInput.value.replace(/\D/g, "") : "";
    return "+" + (ddi ? ddi.value : "55") + digits;
  }

  function beginResendTimer() {
    let seconds = 60;
    clearInterval(resendTimer);
    const host = q("#resend");
    const tick = () => {
      if (!host) return;
      if (seconds <= 0) {
        clearInterval(resendTimer);
        host.innerHTML = '<button id="rs">' + (typeof t === "function" ? t("resend") : "Reenviar código") + "</button>";
        const resend = q("#rs");
        if (resend) resend.onclick = async () => {
          resend.disabled = true;
          try {
            await sendWhatsAppOtp();
          } catch (error) {
            say(error.message);
            resend.disabled = false;
          }
        };
        return;
      }
      host.textContent = (typeof t === "function" ? t("resendIn") : "Reenviar código em") + " 0:" + String(seconds).padStart(2, "0");
      seconds -= 1;
    };
    tick();
    resendTimer = setInterval(tick, 1000);
  }

  async function sendWhatsAppOtp() {
    currentPhone = normalizedPhone();
    await request("/otp", {
      phone: currentPhone,
      channel: "whatsapp",
      create_user: true
    });
    beginResendTimer();
  }

  const wBtn = q("#wBtn");
  if (wBtn) {
    wBtn.onclick = async () => {
      const phoneInput = q("#phone");
      const ddi = q("#ddi");
      const digits = phoneInput ? phoneInput.value.replace(/\D/g, "") : "";
      const min = ddi && ddi.value === "55" ? 10 : 7;
      if (digits.length < min) {
        const err = q("#wErr");
        if (err && typeof t === "function") err.textContent = t("phoneErr");
        return;
      }
      try {
        if (typeof busy === "function") busy(wBtn, true);
        await sendWhatsAppOtp();
        const label = q("#otpPhone");
        if (label) label.textContent = currentPhone;
        if (typeof buildOtp === "function") buildOtp();
        if (typeof go === "function") go("otp");
        setTimeout(() => {
          const first = q("#otpBox input");
          if (first) first.focus();
        }, 400);
      } catch (error) {
        const err = q("#wErr");
        if (err) err.textContent = error.message || "Não foi possível enviar o código.";
      } finally {
        if (typeof busy === "function") busy(wBtn, false);
      }
    };
  }

  const oBtn = q("#oBtn");
  if (oBtn) {
    oBtn.onclick = async () => {
      const inputs = Array.from(document.querySelectorAll("#otpBox input"));
      const token = inputs.map((input) => input.value).join("");
      if (token.length !== 6) return;
      try {
        if (typeof busy === "function") busy(oBtn, true);
        const data = await request("/verify", {
          phone: currentPhone || normalizedPhone(),
          token,
          type: "sms"
        });
        clearInterval(resendTimer);
        const session = saveSession(data);
        finishLogin(session, "whatsapp", (currentPhone || normalizedPhone()).replace(/.(?=.{4})/g, "•"));
      } catch (error) {
        const err = q("#oErr");
        if (err) err.textContent = error.message || (typeof t === "function" ? t("codeErr") : "Código inválido.");
        inputs.forEach((input) => input.value = "");
        if (inputs[0]) inputs[0].focus();
        oBtn.disabled = true;
      } finally {
        if (typeof busy === "function") busy(oBtn, false);
      }
    };
  }

  (async () => {
    try {
      const session = await activeSession();
      const legacy = localStorage.getItem("wraps.session");
      if (session && legacy) {
        const current = JSON.parse(legacy);
        if (current && ["google", "whatsapp", "biometric"].includes(current.method)) {
          // Existing authenticated UI session remains valid; token refresh is handled above.
        }
      }
    } catch (_) {}
  })();
})();
